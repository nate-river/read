<?php
/*--------------------------------------------------
 * 个人相关信息控制器,涵盖个人在app中的各类信息
 *--------------------------------------------------
 *@liyuan   646066459@qq.com
 *---------------------------------------------------
 *2016.12.06
 */
namespace Home\Controller;
use Think\Controller;
class UserController extends BooksController 
{
    /**
     * app我的书签
     */
    
    public function mymark()
    {
        $data   =   I('get.');
        $message=   $this->showmymark($data);
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * 显示书签
     */
    
    public function showmymark($data)
    {
        $table  =   M('mark');
        $id     = session('id');
        $result =   $table->field("id,content,vidname")->where("user_id = {$id} and books_id = {$data['id']}")->select();
        return $result;
    }
     /**
    * 添加笔记
    */
    public function addmynote()
    {
        $data   =   json_decode(file_get_contents("php://input"),true);
        $table  =   M('note');
        $data['addtime']  =     date("Y-m-d H:i:s");
        $data['user_id']  =   session('id');
        if($data['user_id'])
        {
            $num['state']    =   $table->create($data)?$table->add($data):0;
         }
         else
         {
            $num['state']   = 0;
         }
        $this->ajaxReturn($num,__RETURN__);
    }

    /**
     * 删除笔记
     */
     
    public function delmynote()
    {
        $data   =   I('get.');
        $message    =   $this->delnote($data);
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * 删除笔记
     */
    
    public function delnote($data)
    {
        $table  =   M('note');
        $table->where("id  = {$data['id']}")->delete();
        $message['data']=   "删除成功";
        return $message;
    }
    
    /**
     * 
     * app 删除书签
     */
    
    public function delmymark()
    {
        $data   =   I('get.');
        $message=   $this->delmark($data);
        $this->ajaxReturn($message);
    }
    
    /**
     * 删除书签
     */
    
    public function delmark($data)
    {
        $table  =   M('mark');
        $table->where("id = {$data['id']}")->delete();
        $message['data']    =   "删除成功";
        return $message;
    }

    /**
     * app添加书签
     */
    
    public function appmymark()
    {
        $data    =   json_decode(file_get_contents("php://input"),true);
        $message = $this->addmymark($data);
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     *   添加书签
     * @param unknown $data
     * @return number
     */
    
    public function addmymark($data)
    {
        $table  =   M('mark');
        $id     =   session("id");
        $num    =   $table
                    ->field("id,status")
                    ->where("user_id = {$id} and books_id = {$data['id']} and vidname = '".$data['vidname']."' and content like '%".$data['content']."%'")
                    ->find();
        if ($num['status'] == 1)
        {
            $ur['status'] = 2;
            $onum  = $table->where("id = {$num['id']}")->save($ur);
            if ($onum)
            {
                $message['data']    =   "取消书签成功";
                $message['status']  =   1;                
            }
            else 
            {
                $message['data']    =   "取消书签失败";
                $message['status']  =   0;
            }
        }
        else if ($num['status'] == 2)
        {
            $ur['status'] = 1;
            $onum   =   $table->where("id = {$num['id']}")->save($ur);
            if ($onum)
            {                
                $message['data']    =   "添加书签成功";
                $message['status']  =   1;
            }
            else 
            {
                $message['data']    =   "添加书签失败";
                $message['status']  =   0;
            }
        }
        else
        {
            $user['user_id']    =   $id;
            date_default_timezone_set("PRC");
            $user['books_id']   =   $data['id'];
            $user['vidname']       =   $data['vidname'];
            $user['content']    =   $data['content'];
            $user['addtime']    =   date("Y-m-d H:i:s");
            $user['status']     =   1;
            $onum   =   $table->add($user);
            if ($onum)
            {                
                $message['data']    =   "添加书签成功";
                $message['status']  =   1;
            }
            else 
            {
                $message['data']    =   "添加书签失败";
                $message['status']  =   0;
            }
        }
        return $message;
    }
    
    /**
     * app头像上传
     */
    
    public function appheader()
    {
        $data    = $_FILES;
        $path    = __MYHOST__."/Public/Header/";
        $message = $this->dataupload($data['name'], $path);
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * app 修改性别
     */
    
    public function appsetgender()
    {
        $data   =   I('get.');
        $message=   $this->setgender($data);
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * app消息通知
     */
    
    public function appmessage()
    {
        $arr = $this->message();
        $this->ajaxReturn($arr,__RETURN__);
    }
    
    /**
     * app我的评论
     */
    
    public function appcomment()
    {
        $arr = $this->commentmessage();
        $this->ajaxReturn($arr,__RETURN__);
    }
    
    /**
     * app浏览历史记录
     */
    
    public function appold()
    {
        $arr = $this->booksmessage();
        $this->ajaxReturn($arr,__RETURN__);
    }
    
    /**
     * app个人详细信息
     */
    
    public function appperson()
    {
        $id     =   session("id");
        if ($id)
        {
            $arr  = $this->personmessage();            
        }else 
        {
            $arr  = array("message"=>"未登录，请登录","status"=>0);
        }
        $this->ajaxReturn($arr,__RETURN__);
    }
    
    /**
     * app个人个性化设置
     */
    
    public function appset()
    {
        $arr  = $this->setmessage();
        $this->ajaxReturn($arr,__RETURN__);
    }
    
    /**
     * app我的图书笔记记录
     */
    
    public function appnote()
    {
        $data   =   I('get.');
        $arr  = $this->notemessage($data);
        $this->ajaxReturn($arr,__RETURN__);
    }
    
    /**
     * app我的书架
     */
    
    public function appmybook()
    {
        if (session("id"))
        {
            $arr  = $this->mybooks();            
        }
        else 
        {
            $arr['status']  =   0;
            $arr['name']    =   "未登录，获取不到在线书架哦";
        }
        $this->ajaxReturn($arr,__RETURN__);
    }
    
    /**
     * 修改性别
     * @param unknown $data
     */
    
    public function setgender($data)
    {
        $table  =   M('detail');
        $id     =   session("id");
        $num    =   $table->where("user_id = {$id}")->save($data);
        if ($num)
        {
            $message['status'] = 1;
        }
        else
        {
            $message['status'] = 0;
        }
        return $message;
    }
    
    /**
     * 个人详细信息获取
     */
    
    public function personmessage() 
    {
        $table   = M('user');
        $id      = session('id');
        $sql    =   "select ubd.*,ubu.tel,ubu.nickname,ubu.password,ubu.accout from uek_book_user ubu 
         left join uek_book_detail ubd on ubu.id = ubd.user_id where ubu.id = {$id}";
        $result =   parent::sql_cache($sql,60);
        $message    =   $result[0];
        $message['header'] =   __MYHOST__.$message['header'];
        return $message;
    }
    
    /**
     * 个人客户端设置信息
     */
    
    public function setmessage() 
    {
        $table   = M('set');
        $id      = session('id');
        $message = $table->where("user_id = {$id}")->find();
        return $message;
    }
    
    /**
     * 个人笔记信息
     */
    
    public function notemessage($data) 
    {
        $table    = M('note');
        $id       = session("id");
        /*$message  = $table
                ->alias('ubn')
                ->field("ubn.*,ubb.name bookname")
                ->join("left join uek_book_books ubb on ubn.books_id = ubb.id")
                ->where("ubn.user_id = {$id} and ubn.books_id = {$data['id']}")
                ->select();*/
        $sql    =   "select ubn.*,ubb.name bookname from uek_book_note ubn left join uek_book_books ubb on ubn.books_id = ubb.id
          where ubn.user_id = {$id} and ubn.books_id = {$data['id']}";
        $message   =    parent::sql_cache($sql,40);
        return $message;
    }
    
    /**
     * 个人评论信息
     */
    
    public function commentmessage()
    {
        $table     = M('comment');
        $id        = session("id");
        /*$message   = $table
                 ->alias("ubc")
                 ->field("ubc.*,ubb.name bookname,ubu.name unusername")
                 ->join("left join uek_book_books ubb on ubc.books_id = ubb.is")
                 ->join("right join uek_book_user ubu on ubu.id = ubc.unuser_id")
                 ->where("ubc.user_id = {$id}")
                 ->select();*/
        $sql        =   "select ubc.*,ubb.name bookname,ubu.name unusername from uek_book_comment ubc left join uek_book_books ubb on ubc.books_id = ubb.is
                     right join uek_book_user ubu on ubu.id = ubc.unuser_id where ubc.user_id = {$id}";
        $message    =   parent::sql_cache($sql,50);
        return $message;
    }
    
    /**
     * 个人读书记录，浏览记录，点赞记录，分享记录，
     */
    
    public function booksmessage()
    {
        $table      = M('book_user');
        $id         = session('id');
        /*$message    = $table
                  ->alias("ubbu")
                  ->field("")
                  ->join("left join uek_book_books ubb on ubbu.books_id = ubb.id")
                  ->join("left join uek_book_category ubc on ubb.id = ubc.books_id")
                  ->where("ubbu.user_id = {$id}")
                  ->select();*/
        $sql        =   "select  from uek_book_boo_user ubbu left join uek_book_books ubb on ubbu.books_id = ubb.id
                        left join uek_book_category ubc on ubb.id = ubc.books_id where ubbu.user_id = {$id}";
        $message    =   parent::sql_cache($sql,100);
        return $message;
    }
    
    /**
     * 个人消息内容，发件人，发件时间
     */
    
    public function message()
    {
        $table      = M('message');
        $id         = session('id');
        $message    = $table
                   ->alias("ubm")
                   ->field("ubm.*,ubu1.name unusername")
                   ->join("left join uek_book_user ubu1 on ubb1.id = ubm.unuser_id")
                   ->where("ubm.user_id = {$id}")
                   ->select();
        return $message;
    }
    
    /**
     * 登录情况我的书架
     * @return string
     */
    
    public function mybooks() 
    {
        $jingdu       =   I('get.jingdu');
        $bookjingdu  =   explode(';',$jingdu);
        array_pop($bookjingdu);
        foreach($bookjingdu as $ke=>$va)
        {
            $jingdutiao[$ke]  =   explode(':',$va);
        }
        foreach ($jingdutiao as $h => $m) {
            $bookid[$h+1]   =   $m[0];
            $bookpage[$h+1]   =   $m[1];
        }
        $table       = M("book_user");
        $id          = session("id");
        /*$result      = $table
                    ->alias("ubbu")
                    ->field("ubb.*")
                    ->join("left join uek_book_books ubb on ubbu.books_id = ubb.id")
                    ->order("newtime desc")
                    ->where("ubbu.user_id = {$id} and addmy = 1")
                    ->select();*/
        $sql        =   "select ubb.* from uek_book_book_user ubbu left join uek_book_books ubb on ubbu.books_id = ubb.id
                         where ubbu.user_id = {$id} and addmy = 1 order by newtime desc";
        $result     =   parent::sql_cache($sql,20);
        foreach ($result as $key=>$value)
        {
            $showneed = array_flip($bookid);
            if ($showneed[$value['id']]) {
                $num    =   $bookpage[$showneed[$value['id']]];
            }
            else
            {
                $num    =   0;
            }
            $txt      = $value['txt'];
            $bookarr  = parent::bookshow2($txt);
            $book['id'] =   $value['id'];
            $book['num']= 500;
            $book['page']=0;
            $allpage    =   parent::bookspagenext($book);
            $jd        =    ceil(($num/$allpage['allpages'])*100)."%";
            $imgurl =   __MYHOST__.$value['img'];
            $data[$key]["picture"]   = $imgurl;
            $data[$key]["id"]        = $value['id'];
            $data[$key]["name"]      = $value['name'];
            $data[$key]["en"]        = $value['english'];
            $data[$key]["title1"]    = $value['keyword'];
            $data[$key]["title2"]    = $value['about'];
            $data[$key]["allpages"]     = $allpage['allpages'];
            $data[$key]["jingdu"]       =   $jd;
        }
        $newread["name"]  = "newRead";
        $newread['books'] = $data;
        $newread['status']= 1;
        $myapp = $newread;
        return $myapp;
    }
    
    /**
     * 头像上传
     * @param unknown $id
     * @param unknown $name
     */
    
    public function dataupload($filename,$path)
    {
        $table = M("detail");
        $id    = session("id");
        $upload = new \Think\Upload();
        $upload->maxSize   =     3145728 ;
        $upload->exts      =     array("jpg","jpeg","png","gif");
        $upload->saveName =  time().'_'.mt_rand(100000,999999);
        $upload->rootPath  =      './Public/header/';
        $info   =   $upload->uploadOne($_FILES[$filename]);
        if(!$info) 
            {
                $num = $upload->getError();
            }
        else
            {
                $list_name =  $path.$info['savepath'].$info['savename'];
                $img["header"] = $list_name;
                $num = $table->where("id = {$id}")->save($img);
            }
        return $num;
    }
}