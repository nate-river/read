<?php
/* -----------------------------------------------------
 * 数据的查询   一些封装方法      使用方法获取数据  上传、下载、邮件验证码、等
 * -----------------------------------------------------
 * 作者 ：：liyuan   @646066459@qq.com
 * ------------------------------------------------------
 * 2016.12.02
 * */
namespace Admin\Controller;
use Think\Controller\RestController;
class BaseController extends RestController {
    public $cname;
    /**
     * 加载父类构造方法实现继承
     * */
    public function __construct() {
        parent::__construct();
    }
    /**
     *初始化控制器名称 作为表名，供做调用 
     */
    public function _initialize(){
        $this->cname = substr(strrchr(__CONTROLLER__,'/'),1);
    }
    /**
     * 数据显示 获取数据
     */
    public function listall() {
        $table  = M($this->cname);
        $result = $table->select();
        if ($this->cname == 'Category'){
            $result = $this->three($result);
        }
        $this->response($result,"json");
    }
    /**
     * 删除数据，批量删除
     * @return boolean   有返回则删除失败
     */
    public function delnum(){
        $data   = I("get.");
        $table  = M($this->cname);
        if ($this->cname == "Category"){
            $parent = $table->field("id")->where("pid = {$data['id']}")->select();
            if (!empty($parent)){
                foreach ($parent as $value){
                    $grand = $table->field("id")->where("pid = {$value['id']}")->select();
                        if (!empty($grand)){
                            foreach ($grand as $value2){
                                $table->where("id = {$value2['id']}")->delete();
                            }                            
                        }
                    $table->where("id = ".$value['id'])->delete();
                }                
            }
        }
        $table->delete($data['id']);
        $result = $table->select();
        if ($this->cname == "Category"){
            $result = $this->three($result);
        }
        $this->response($result,"json");
    }
    /**
     * 修改状态 ，批量修改状态
     * @return boolean   返回修改影响行数行数
     */
    public function statusup(){
        $data   = I('get.');
        $table  = M($this->cname);
        $where  = "id = ".$data['id'];
        $save   = "status = ".$data['status'];
        $num    = $table
                    ->where($where)
                    ->save($data);
        $this->response($num);
    }
    /**
     * 添加数据
     * @return string 返回成功或失败
     */
    public function addnum(){
        $table = M($this->cname);
        $data  = I("get.");
        $data['addtime'] = date("Y-m-d H:i:s");
        $data['time'] = date("Y-m-d H:i:s");
        //$data['time'] = date("Y-m-d");
        if($table->create($data)){
            $fid = $table->field("id")->where($data)->find();
            if ($fid){
                $this->error("信息已存在");
            }else{
                $num = $table->add($data);                
            }
        }
        if ($num){
            if ($this->cname == "Category"){
                $message = $table->select();
                $message = $this->three($message);
            }else {
                $message = $table->where("id = {$num}")->find();              
            }
        }else {
            $this->error("添加失败");
        }
        $this->response($message,"json");
    }
    /**
     * 修改
     */
    public function updatenum(){
        $table = M($this->cname);
        $data  = I("get.");
        $num = $table->save($data);
        if ($num){
            if ($this->cname == "Category"){
                $result = $table->select();
                $result = $this->three($result);
            }else {
                $result = $table->where("id = {$data['id']}")->find();                
            }
        }else {
            $result=array(
                "message"=>"错误"
            );
        }
        $this->response($result,"json");
    }
    /**
     * 精确查询
     */
    public function sereach(){
        $tbname = I('get.tbname');
        $table  = M($tbname);
        $data   = array_udiff(I('get.'), "tbname");
        $result = $table->where($data)->select();
        $this->response($result);
    }
    /**
     * 模糊查询，传递两个参数
     */
    public function  sereachlike(){
        $tbname = I('get.tbname');
        $table  = M($tbname);
        $data   = array_udiff(I('get.'), "tbname");
        foreach ($data as $key=>$value){
            $where = $key."like '%".$value."%'"; 
        }
        $result = $table->where($where)->select();
        $this->response($result);
    }
    /**
     * 无限极分类封装
     * @param unknown   $arr    传递过来的分类数组
     * @param number    $pid    初始化父id 
     * @param number    $level  分类等级
     * @return multitype:number 返回分类后数据
     */
    public function tree($arr,$pid=0, $level=0){
        static $arr_tree = array();
        foreach($arr as $v){
            if($v['pid'] == $pid){
                $v['level'] = $level++;
                $arr_tree[] = $v;
                $this->tree($arr,$v['id'], $level);
                $level--;
            }
        }
        return $arr_tree;
    }
    /**
     * 加载分类
     */
    public function testthree(){
        $table = M($this->cname);
        $arr   = $table->select();
        $type  = I('get.type');
        $arr   = $this->$type;
        $this->response($arr,"json");
    }
    public function testst(){
        $table  = M('category');
        $result = $table->select();
        $arr = $this->three($result);
        $this->response($arr,"json");
    }
    /**
     * 三级分类方法处理数据
     * @param unknown $result  要获取的数组
     * @param number $pid      初始化父id
     * @return multitype:unknown 数组 
     */
    public function three($result,$pid=0) {
        $outside=array();
        foreach ($result as $v1){
            if($v1['pid']==$pid){
                $out=array();
                $out['id']=$v1['id'];
                $out['parentid'] = $v1['pid'];
                $out['name']=$v1['name'];
                $i = 0;
                foreach ($result as $v2){
                    if($v2['pid']==$v1['id']){
                        $out["erji"][$i]['id']=$v2['id'];
                        $out["erji"][$i]['parentid']=$v2['pid'];
                        $out["erji"][$i]['name']=$v2['name'];
                        $k=0;
                        foreach ($result as $v3){
                            if ($v3['pid']==$v2['id']) {
                                $out["erji"][$i]["sanji"][$k]['id']=$v3['id'];
                                $out["erji"][$i]["sanji"][$k]['parentid']=$v3['pid'];
                                $out["erji"][$i]["sanji"][$k]['name']=$v3['name'];
                                $out["erji"][$i]["sanji"][$k]['grandid']=$v1['id'];
                                $k++;
                            }
                        }
                        $i++;
                    }
                }
                $outside[]=$out;
            }
    
        }
        return $outside;
    }
    //
    public function two($result,$pid=0){
        $outside=array();
        foreach ($result as $v1){
            if($v1['pid']==$pid){
                $out=array();
                $out['id']=$v1['id'];
                $out['parentid'] = $v1['pid'];
                $out['name']=$v1['name'];
                $i = 0;
                foreach ($result as $v2){
                    if($v2['pid']==$v1['id']){
                        $out["erji"][$i]['id']=$v2['id'];
                        $out["erji"][$i]['parentid']=$v2['pid'];
                        $out["erji"][$i]['name']=$v2['name'];
                        $i++;
                        }
                    }
                $outside[]=$out;
            }
        }
        return $outside;
    }
    /**
     * 上传数据封装
     * @param number  $id   修改、添加 数据的id主键
     * @param         $name 表中对应字段
     * @param         $db   修改对应表名
     * @param array   $exts 设置附件类型
     * @param number  $size 设置上传附件大小
     * @param string  $path 设置上传后文件保存目录
     * @return        $num  返回类型数据
     */
    public function dataupload($id,$name,$db,$exts,$path,$subscript){
        $table = M($db);
        $upload = new \Think\Upload();
        $upload->maxSize   =     3145728 ;
        $upload->exts      =     $exts;
        $upload->saveName =  time().'_'.mt_rand(100000,999999);
        $upload->rootPath  =      './Public/Upload/';
        $info   =   $upload->uploadOne($_FILES[$subscript]);
        if(!$info) {
            $num = $upload->getError();
        }else{
            $list_name =  "/Public/Upload/".$info['savepath'].$info['savename'];
            $img[$name] = $list_name;
            $num = $table->where("id = {$id}")->save($img);
        }
        return $num;
    }
    /**
     * 数据库查询数据获取情况
     * ajax 验证方法请求字段对应的数据是否存在
     */
    public function ajaxverify(){
        $table = M($this->cname);
        $data = I('get.');
        $num  = $table->field("id")->where($data)->find();
        if ($num){
            echo "1";
        }else{
            echo "0";
        }
    }
    /**
     *文件下载封装 
     *文件路径    ，文件名   
     */
    public function downfile(){
        $path = I('get.path');
        $filename = I('get.filename');
        $file = __ROOT__.$path;
        $info = getimagesize($file);
        header("content-type:".$info['mime']);//是用来保证head头对图片的完整性
        header("content-disposition:attachment;filename=".$filename);
        header("content-length:".filesize($file));
        readfile($file);
    }
    /**
     * 邮件验证码？？？？？
     * @param unknown $to        接收邮件的邮箱
     * @param unknown $subject   邮件主题，本项不能包含任何换行符，否则邮件可能无法正确发送
     * @param unknown $message   邮件信息内容
     * @return boolean
     */
    public function mailcode($to,$subject,$message){
        $num = mail($to, $subject, $message);
        return $num;
    }
    /**
     * 加载验证码数据
     * @param unknown $imgbg   是否启用背景图片   true  or false
     * @param unknown $usezh   是否启用中文验证码  true  or false 
     * @param array   $config  是否自定义验证码配置
     */
    public function codenum(){
        $config = array(
            'fontSize' => 25, // 验证码字体大小
            'length' => 4, // 验证码位数
            'useNoise' => false, // 关闭验证码杂点
        ); 
        $code = new \Think\Verify($config);
        $code->useImgBg = true;            
        return $code->entry();
    }
}