<?php
/*--------------------------------------------------
 * 榜单
 *--------------------------------------------------
 *@liyuan   646066459@qq.com
 *---------------------------------------------------
 *2016.12.07
 */
namespace Home\Controller;
use Home\Controller\BooksController;
class CategoryController extends BooksController 
{
    /**
     * app榜单显示
     */
    
    public function appexamplelist()
    {
        $result  = $this->example();
        $this->ajaxReturn($result,__RETURN__);
    }
    
    /**
     * app最新上架
     */
    
    public function appnewadd()
    {
        $result  = $this->newbooks();
        foreach ($result as $key=>$value)
        {
            $result[$key]['img']    =   __MYHOST__.$value['img'];
        }
        $this->ajaxReturn($result,__RETURN__);
    }
    
    /**
     * app分类显示
     */
    
    public function appshowcategory()
    {
        $table   = M('category');
        $result  = $table->select();
        $num     = $this->three($result);
        $this->ajaxReturn($num,__RETURN__);
    }
    
    /**
     * app点击榜单进入
     * id 为榜单的序号
     */
    
    public function appexample()
    {
        $id      = I('get.id');
        $result  = $this->exampleshow($id);
        $this->ajaxReturn($result,__RETURN__);
    }
    
    /**
     * app分类点击进入
     * id 为分类中类别的id
     */
    
    public function appcategory()
    {
        $id      = I('get.id');
        $result  = $this->exampleonelist($id);
        $this->ajaxReturn($result,__RETURN__);
    }
    /**
     * 分类点击后获取到数据
     * @param unknown $id
     * @return Ambigous <unknown, \Home\Controller\unknown>
     */
    public function exampleonelist($id)
    {
        $arr    = $this->exampleone($id);
        foreach ($arr as $key=>$value)
        {
            $data[$key]["type"] = $value['type'];
            foreach ($value['books'] as $k=>$lis)
            {
                $data[$key]['books'][$k]['img']         = __MYHOST__.$lis['img'];
                $data[$key]['books'][$k]['id']          = $lis['id'];
                $data[$key]['books'][$k]['title']       = $lis['name'];
                $data[$key]['books'][$k]['en']          = $lis['english'];
                $data[$key]['books'][$k]['description'] = $lis['about'];
                $data[$key]['books'][$k]['author']      = $lis['username'];
                $data[$key]['books'][$k]['zishu']       = $this->booknumber($lis['txt']);
                $data[$key]['books'][$k]['xin']         = $lis['readernum'];
            }
        }
        //var_dump($data);
        return $data;
    }
    
    /**
     * 分类显示数据
     * @param unknown $id
     * @return unknown
     */
    
    public function exampleone($id)
    {
        $categoryid  = $id;
        $allbook     = parent::reader();
        $date        =  array();
        foreach ($allbook as $value)
        {
            if ($value['category_id'] == $id)
            {
                $data[] = $value;
            }
        }
        $newadd      = parent::rulelist("addtime", "desc", $data);
        foreach ($data as $ad)
        {
            if ($ad['recommend'] == 1)
            {
                $rec[]  = $value;
            }
        }
        $recommend   = parent::rulelist("praise", "desc", $rec);
        $reader      = parent::rulelist("readernum","desc", $data);
        $category[0] = array("type"=>"tuijian");
        $category[1] = array("type"=>"redu");
        $category[2] = array("type"=>"shangjia");
        $category[0]['books']  = $recommend;
        $category[1]['books']  = $reader;
        $category[2]['books']  = $newadd;
        return $category;
    }
    
    /**
     * 前台页面榜单显示数据 
     */
    
    public function example()
    {
        /*$table  = M("example");
        $result = $table->select();*/
        $sql    =   "select * from uek_book_example";
        $result =   parent::sql_cache($sql,100000);
        foreach ($result as $value)
        {
            $arr     =array();
            $rule    = $value['rule'];
            $rulearr = array("addtime","uptime","collect","praise","share");
            $person  = array("praise");
            $arr     = $this->ruleorder($rule, $value['name'], $rulearr, $person);
            $data['id']          = $value['id'];
            $data['name']        = $value['name'];
            $data['description'] = $value['detail'];
            $data['words']       = $value['brief'];
            $data['top1']        = $arr[0]['name'];
            $data['top2']        = $arr[1]['name'];
            $data['top3']        = $arr[2]['name'];
            $arrlast[]  = $data;
        }
        return $arrlast;
    }
    /**
     * 榜单内数据获取
     * @param number $id
     * @return Ambigous <unknown, \Home\Controller\unknown>
     */
    public function exampleshow($id)
    {
        $arr   = $this->showexample($id);
        foreach ($arr as $key=>$value)
        {
                $data[$key]["type"] = $value['type'];
            foreach ($value['book'] as $k=>$lis)
            {
                $data[$key]['book'][$k]['img']          = __MYHOST__.$lis['img'];
                $data[$key]['book'][$k]['id']           = $lis['id'];
                $data[$key]['book'][$k]['title']        = $lis['name'];
                $data[$key]['book'][$k]['en']           = $lis['english'];
                $data[$key]['book'][$k]['description']  = $lis['about'];
                $data[$key]['book'][$k]['author']       = $lis['username'];
                $data[$key]['book'][$k]['zishu']        = $this->booknumber($lis['txt']);
                $data[$key]['book'][$k]['xin']          = $lis['allreader'];
            }
        }
        return $data;
    }
    
    /**
     * 图书字数查询
     * @param unknown $txt
     * @return number
     */
    
    public function booknumber($txt)
    {
        $number   = mb_strwidth(file_get_contents(".".$txt),"UTF-8");
        return $number;
    }
    
    /**
     * 点击榜单加载分类
     */
    
    public function showexample($id,$type="ri")
    {
        $arr        = $this->example();
        $exam       = $arr[$id]['id'];
        /*$table      = M('example');
        $result     = $table->where("id = {$exam}")->find();*/
        $sql        =   "select * from uek_book_example where id = {$exam}";
        $result     =   parent::sql_cache($sql,99999);
        $arr        = array();
        $rule       = $result[0]['rule'];
        $rulearr    = array("addtime","uptime","collect","praise","share");
        $person     = array("praise");
        $arr        = $this->ruleorder($rule, $result[0]['name'], $rulearr, $person);
        $arr        = $this->ordertime($arr,$type);
        $example[0] = array("type"=>"ri"); 
        $example[1] = array("type"=>"zhou"); 
        $example[2] = array("type"=>"zong");
        $arrayreader= array("dayreader");
        array_multisort($arrayreader,SORT_DESC,SORT_STRING,$arr);
        $example[0]["book"]  =  $arr;
        $arrayreader= array("weekreader");
        array_multisort($arrayreader,SORT_DESC,SORT_STRING,$arr);
        $example[1]["book"]  =  $arr;
        $arrayreader= array("allreader");
        array_multisort($arrayreader,SORT_DESC,SORT_STRING,$arr);
        $example[2]["book"]  =  $arr;
        return $example;
    }
    
    /**
     * 排名
     * @param unknown $arr
     * @return unknown
     */
    
    public function ordertime($arr) 
    {
        date_default_timezone_set("PRC");
        $table  = M('book_user');
        foreach ($arr as $key=>$value)
        {
            $daytime    = date("Y-m-d");
            $weektime   = date("Y-m");
            $sqlday     =   "select COUNT('id') from uek_book_book_user where books_id = {$value['id']} and addtime like '".$daytime."%'";
            $daynum     =   parent::sql_cache($sqlday,60*60*24);
            $sqlweek    =   "select COUNT('id') from uek_book_book_user where books_id = {$value['id']} and addtime like '".$weektime."%'";
            $weeknum    =   parent::sql_cache($sqlweek,60*60*24*7);
            $sqlall     =   "select COUNT('id') from uek_book_book_user where books_id = {$value['id']}";
            $allnum     =   parent::sql_cache($sqlall,3600);
            $arr[$key]['allreader']     = $allnum;
            $arr[$key]['dayreader']     = $daynum;
            $arr[$key]['weekreader']    = $weeknum;
        }
        return $arr;
    }
    
    /**
     * 点击单个榜单进入详情页面，显示书籍信息；
     */
    
    public function examplemessage()
    {
        $data   = I('get.');
        $table  = M('example');
        //$result = $table->where("id = {$data['id']}")->find();
        $sql    =   "select * from uek_book_example where id = {$data['id']}";
        $result =   parent::sql_cache($sql,60*60*13);
        if (!$result[0]['id'])
        {
            $arr    = array("没有该书籍！请联系客服");
        }
        else 
        {
            $rule   = $result[0]['rule'];
            $value  = $result[0]['name'];
            $rularr = array("addtime","uptime","collect","praise","share");
            $person = array("collect");
            $arr    = $this->ruleorder($rule, $value, $rularr, $person);            
        }
        $this->ajaxReturn($arr,__RETURN__);
    }
    
    /**
     * 封装数据排序
     * @param unknown $rule    你的规则数组
     * @param unknown $value   你的字段名称
     * @param unknown $rularr  你的规则数组
     * @param unknown $person  你定义的二次排序规则
     */
    
    public function ruleorder($rule,$value,$rularr,$person)
    {
        if (in_array($rule,$rularr))
        {
            $arr = parent::rulelist($rule, $order="desc");
        }
        else 
        {
            $rarr  = parent::rulelist($person, "desc");
            foreach ($rarr as $v)
            {
                if ($v['title'] == $value)
                {
                $arr[] = $v;
                }
            }
        }
        return $arr;
    }
    /**
     * 书城最新上架
     */
    public function newbooks() 
    {
        $data   = array("addtime");
        $order  = 'desc';
        $arr    = parent::rulelist($data, $order);
        foreach ($arr as $key=>$value)
        {
            $data['leiid']  = $key;
            $data['id']     = $value['id'];
            $data['title']  = $value['name'];
            $data['img']    = $value['img'];
            $data['author'] = $value['username'];
            $data['year']   = $value['year'];
            $title          = explode(",",$value['keyword']);
            $data['leibie1']= $title[0];
            $data['leibie2']= $title[1];
            $data['leibie3']= $title[2];
            $last[]         = $data;
        }
        return $last;
    }
    
    /**
     * 三级分类方法处理数据
     * @param unknown $result  要获取的数组
     * @param number $pid      初始化父id
     * @return multitype:unknown 数组
     */
    
    public function three($result,$pid=0) 
    {
        $outside=array();
        foreach ($result as $v1)
        {
            if($v1['pid']==$pid)
            {
                $out=array();
                $out['id']=$v1['id'];
                $out['parentid'] = $v1['pid'];
                $out['name']=$v1['name'];
                $i = 0;
                foreach ($result as $v2)
                {
                    if($v2['pid']==$v1['id'])
                    {
                        $out["erji"][$i]['id']=$v2['id'];
                        $out["erji"][$i]['parentid']=$v2['pid'];
                        $out["erji"][$i]['name']=$v2['name'];
                        $k=0;
                        foreach ($result as $v3)
                        {
                            if ($v3['pid']==$v2['id']) 
                            {
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
}