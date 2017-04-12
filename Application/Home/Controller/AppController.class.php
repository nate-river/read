<?php
/*--------------------------------------------------
 * 加载首页
 *--------------------------------------------------
 *@liyuan   646066459@qq.com
 *---------------------------------------------------
 *2016.12.06
 */
namespace Home\Controller;
use Think\Controller;
class AppController extends BooksController 
{
    /**
     * 版本信息，版权信息
     */
    
    public  function  servermessage(){
        $message = $this->showserver();
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * app 图书广告显示
     * 
     */
    
    public function appad()
    {
        $message    =   $this->ad();
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * app 评论点赞
     * 传入书籍，评论 对应的id
     */
    
    public  function appprise()
    {
        $data       =   I('get.');
        $datas['books_id']  =   $data['shuid'];
        $datas['comment_id']=   $data['ids'];
        $message    =   $this->addapprise($datas);
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * app 加入书架       
     * 传入书籍对应的id
     */
    
    public function addmybooks()
    {
        $data       =   I('get.');
        $datas['books_id']   =   $data["id"];
        $message    =   $this->addbooksMy($datas);
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * app爱好显示
     * 爱好页面加载固定数据
     */
    
    public function  applike()
    {
        $message = $this->showlike();
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * app 搜索
     * 显示搜索页面的固定书籍
     */
    
    public function apporderse()
    {
        $message    =   $this->seach();
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * app意见反馈
     * 传入意见内容
     */
    
    public function appback()
    {
        $this->_method;
        $data       =   json_decode(file_get_contents("php://input"),true);
        $message = $this->feedback($data);
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * 加载版本信息
     * @return unknown
     */
    
    public function showserver(){
        $file   =   __MYHOST__."./Public/servertxt/server.txt";
        $message = parent::auto_read($file);
        return $message;
    }
    
    /**
     * 首页图书广告
     */
    
    public function ad()
    {
        $sql    =   "select * from uek_book_advert where status = 1";
        $result =   parent::sql_cache($sql,360000);
        foreach ($result as $key=>$va)
        {
            $result[$key]['img']    =   __MYHOST__.$va['img'];
        }
        return $result;
    }
    
    /**
     * 添加书架
     * 书籍id  books_id    
     */
    
    public function addbooksMy($data)
    {
        $table  =   M('book_user');
        $id     =   session("id");
        if ($id)
        {
            $sql    =   "select addmy,id from uek_book_book_user where user_id = {$id} and books_id = {$data['books_id']}";
            $result =   $table
                    ->where("user_id = {$id} and books_id = {$data['books_id']}")
                    ->select();
            if ($result[0]['addmy'] == 1)
            {
                $message['status']  =   1;
                $message['data']    =   "已加入书架！";
            }
            else if ($result[0]['addmy'] == 2) 
            {
                $addmy['addmy']     =   1;
                $num    =   $table->where("id = {$result['id']}")->save($addmy);
                if ($num)
                {
                    $message['status']  =   1;
                    $message['data']    =   "加入书架成功！";
                }
                else 
                {
                    $message['status']  =   0;
                    $message['data']    =   "加入书架失败，可能是网络原因";
                }
            }
            else 
            {
                $myadd['addmy']  =     1;
                $myadd['user_id']=      $id;
                $myadd['books_id']=     $data['books_id'];
                date_default_timezone_set("PRC");
                $myadd['newtime'] =     date("Y-m-d H:i:s");
                $num    =   $table->add($myadd);
                if ($num)
                {
                    $message['status']  =   1;
                    $message['data']    =   "加入书架成功！";
                }
                else
                {
                    $message['status']  =   0;
                    $message['data']    =   "加入书架失败，可能是网络原因";
                }
            }
        }
        else
        {
            $message['status']    =   0;
            $message['data']      =   "未登录，请登录";
        }
        return $message;
    }
    
    /**
     * 添加点赞信息
     * @param unknown $data
     * 书的id books_id   评论  id comment_id
     */
    
    public function addapprise($data)
    {
        $table  =   M('praise');
        $id     =   session("id");
        if ($id)
        {
            $find   =   $table->field("status,id")
                    ->where("books_id = {$data['books_id']} and comment_id = {$data['comment_id']} and user_id = {$id}")            
                    ->find();
            if ($find['status'] == 2)//点赞
            {
                $status['status'] =   1;
                $num    =   $table->where("id = {$find['id']}")->save($status);
                if ($num){
                    $message['status']  =   1;
                    $message['data']    =   "点赞成功";
                }else {
                    $message['status']  =   0;
                    $message['data']    =   "点赞失败";
                }
            }
            else if ($find['status'] == 1)//取消点赞
            {
                $status['status'] =   2;
                $num    =   $table->where("id = {$find['id']}")->save($status);
                if ($num){
                    $message['status']  =   1;
                    $message['data']    =   "取消成功";
                }else {
                    $message['status']  =   0;
                    $message['data']    =   "取消失败";
                }
            }
            else //没有点过赞
            {
                $praise['status']   =   1;
                $praise['user_id']  =   $id;
                $praise['books_id'] =   $data['books_id'];
                $praise['comment_id']   =   $data['comment_id'];
                if ($table->create($praise))
                {
                    $num    =   $table->add($praise);
                    if ($num){
                        $message['status']  =   1;
                        $message['data']    =   "点赞成功";
                    }else {
                        $message['status']  =   0;
                        $message['data']    =   "点赞失败";
                    }
                }
                else 
                {
                    $message['status']  =   0;
                    $message['data']    =   "点赞失败";
                }
            }
        }
        else
        {
            $message['status']    =   0;
            $message['data']      =   "未登录！请前往登录。";
        }
        return $message;
    }
    
    /**
     *  app我的爱好
     */
    
    public function appmylike()
    {
        $method  = $this->_method;
        $data    = json_decode(file_get_contents("php://input"),true);
        $message = $this->mylikeshow($data);
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     *  app我的搜索
     */
    
    public function appsearch()
    {
        $data = I('get.name');
        $message    =   $this->mysearch($data);
        foreach ($message as $key=>$value)
        {
            $message[$key]['img']   =   __MYHOST__.$value['img'];
        }
        if (empty($message)) 
            {
                $message = array("name"=>"没有搜到你想要的内容哦！！！","status"=>0);
            }
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
    *
    *点击搜索框显示 
    */
    
    public function seach()
    {
        $data   =   array(readernum);
        $message=   parent::rulelist($data,"desc");
        foreach ($message as $key=>$value)
        {
            $message[$key]['img']   =   __MYHOST__.$value['img'];
        }
        return $message;
    }
    
    /**
    *搜索格式 内容
    ********带详细处理
    */
    
    public function mysearch($data)
    {
        $table      =   M('books');
        $categ      =   M('category');
        $arrs       =   explode(" ",$data);
        $selectname =   array("name","keyword","username","english","title","year","zh");
        if ($arrs[1])
        {
            $books1   =   $table
                        ->field("id")
                        ->where("name like '%".$arrs[0]."%' or name like '%".$arrs[1]."%'")
                        ->select();
            $books2   =   $table
                        ->field("id")
                        ->where("keyword like '%".$arrs[0]."%' or name like '%".$arrs[1]."%'")
                        ->select();
            $books3   =   $table
                        ->field("id")
                        ->where("username like '%".$arrs[0]."%' or name like '%".$arrs[1]."%'")
                        ->select();
            $books4   =   $table
                        ->field("id")
                        ->where("english like '%".$arrs[0]."%' or name like '%".$arrs[1]."%'")
                        ->select();
            $books5   =   $table
                        ->field("id")
                        ->where("title like '%".$arrs[0]."%' or name like '%".$arrs[1]."%'")
                        ->select();
            $books6   =   $table
                        ->field("id")
                        ->where("year like '%".$arrs[0]."%' or year like '%".$arrs[1]."%'")
                        ->select();
            $books7   =   $table
                        ->field("id")
                        ->where("zh like '%".$arrs[0]."%' or zh like '%".$arrs[1]."%'")
                        ->select();
            $catebok    =   $categ
                        ->field("id,name")
                        ->where("name like '%".$arrs[0]."%' or name like '%".$arrs[1]."%'")
                        ->select();
            foreach ($catebok as $key=>$value)
            {
                $pid[$key]  =   $categ
                            ->field("name,id")
                            ->where("pid = {$value['id']}")
                            ->select();
                if ($pid[$key][0]['id'])
                {
                    foreach ($pid[$key] as $k=>$v)
                    {
                        $gid[]  =   $categ
                                ->field("name,id")
                                ->where("pid = {$v['id']}")
                                ->select();
                    }
                }
            }
            if ($gid[0][0]['id'])
            {
                foreach ($gid as $g)
                {
                    foreach ($g as $gs)
                    {
                        $categoryid[] = $gs['id'];
                    }
                }
            }
            else 
            {
                if ($pid[0][0]['id'])
                {
                    foreach ($pid as $p)
                    {
                        foreach ($p as $ps)
                        {
                            $categoryid[] = $ps['id'];
                        }
                    }
                }
                else 
                {
                    foreach ($catebok as $c)
                    {
                        $categoryid[] = $c['id'];
                    }
                }
            }
            $categoryname   =   array_unique($categoryid);
            $booksall       =   $table->field("id,category_id")->select();
            foreach ($booksall as $k=>$v)
            {
                foreach ($categoryname as $c=>$cn)
                {
                    if ($v['category_id'] == $cn['id'])
                    {
                        $books8[] = $v['id'];
                    }
                }
            }
        }
        else 
        {
            $books1   =   $table
                        ->field("id")
                        ->where("name like '%".$arrs[0]."%'")
                        ->select();
            $books2   =   $table
                        ->field("id")
                        ->where("keyword like '%".$arrs[0]."%'")
                        ->select();
            $books3   =   $table
                        ->field("id")
                        ->where("username like '%".$arrs[0]."%'")
                        ->select();
            $books4   =   $table
                        ->field("id")
                        ->where("english like '%".$arrs[0]."%'")
                        ->select();
            $books5   =   $table
                        ->field("id")
                        ->where("title like '%".$arrs[0]."%'")
                        ->select();
            $books6   =   $table
                        ->field("id")
                        ->where("year like '%".$arrs[0]."%'")
                        ->select();
            $books7   =   $table
                        ->field("id")
                        ->where("zh like '%".$arrs[0]."%'")
                        ->select();
            $catebok    =   $categ
                        ->field("id")
                        ->where("name like '%".$arrs[0]."%'")
                        ->select();
            foreach ($catebok as $key=>$value)
            {
                $pid[$key]  =   $categ
                        ->field("name,id")
                        ->where("pid = {$value['id']}")
                        ->select();
                if (!empty($pid[$key][0]))
                {
                    foreach ($pid[$key] as $k=>$v)
                    {
                        $gid[]  =   $categ
                        ->field("name,id")
                        ->where("pid = {$v['id']}")
                        ->select();
                    }
                }
            }
            if (!empty($gid[0][0]))
            {
                foreach ($gid as $g)
                {
                    foreach ($g as $gs)
                    {
                        $categoryid[] = $gs['id'];
                    }
                }
            }
            else
            {
                if (!empty($pid[0][0]))
                {
                    foreach ($pid as $p)
                    {
                        foreach ($p as $ps)
                        {
                            $categoryid[] = $ps['id'];
                        }
                    }
                }
                else
                {
                    foreach ($catebok as $c)
                    {
                        $categoryid[] = $c['id'];
                    }
                }
            }
            $categoryname   =   array_unique($categoryid);
            $booksall       =   $table->field("id,category_id")->select();
            foreach ($booksall as $k=>$v)
            {
                foreach ($categoryname as $c=>$cn)
                {
                    if ($v['category_id'] == $cn)
                    {
                        $books8[]['id'] = $v['id'];
                    }
                }
            }
        }
        if ($books8)
        {
            $allbook    =   array_merge($books1,$books2,$books3,$books4,$books5,$books6,$books7,$books8);            
        }
        else 
        {
            $allbook    =   array_merge($books1,$books2,$books3,$books4,$books5,$books6,$books7);
        }
        foreach ($allbook as $ab)
        {
            $abs[] = $ab['id'];
        }
        $book       =   array_unique($abs);
        $num        =   count($book);
        $select     =   parent::reader();
        foreach ($select as $sid)
        {
            foreach ($book as $bid)
            {
                if ($bid == $sid['id'])
                {
                    $last[] = $sid;
                }
            }
        }
        return $last;
    }
    
    /**
     * 意见反馈
     * 接收人id为  0是为接收意见
     */
    
    public function feedback($data) 
    {
        $table = M('message');
        $data['user_id']   = session("id");
        $data['unuser_id'] = 0;
        date_default_timezone_set("PRC");
        $data['addtime']   = date("Y-m-d H:i:s");
        if ($table->create($data))
            {
                $num  = $table->add($data);
                if ($num)
                    {
                        $message = "感谢您的反馈，我们会尽快完善";
                    }
                else 
                    {
                        $message = "服务器出了一点小问题，程序员正在加紧处理中";
                    }
            }
        else 
            {
                $message = "创建信息失败！请与客服联系！";
            }
        return $message;
    }
    
    /**
     * 喜好编辑
     * @return \Home\Controller\unknown
     * 我的喜好数据整理过程
     */
    
    public function showlike()
    {
        $message  = $this->like();
        $message = array_unique($message);
        $data[0]['id'] = 1;
        $data[1]['id'] = 2;
        $data[2]['id'] = 3;
        $data[3]['id'] = 4;
        $data[0]['type'][] = $message[0];
        $data[0]['type'][] = $message[1];
        $data[1]['type'][] = $message[2];
        $data[1]['type'][] = $message[3];
        $data[1]['type'][] = $message[4];
        $data[2]['type'][] = $message[5];
        $data[3]['type'][] = $message[6];
        return $data;
    }
    
    /**
     * 喜好显示
     * @return unknown
     * 获取书籍信息
     */
    
    public function like()
    {
        $table  = M('books');
        $title  = $table->field("keyword")->select();
        foreach ($title as $key=>$value)
            {
                $arr = explode(",", $value['keyword']);
                foreach ($arr as $list)
                    {
                        $like[] = $list;
                    }
            }
        return $like;
    }
    
    /**
     * 加载喜好书籍
     * @param unknown $odata
     * @return unknown
     * 传入参数      选择的标签
     */
    public function mylikeshow($odata)
    {
        $arr     = $this->mylike($odata);
        foreach ($arr as $key=>$value)
            {
                $data[$key]["type"] = $value['type'];
                foreach ($value['books'] as $k=>$lis)
                    {
                        $data[$key]['books'][$k]['img'] = __MYHOST__.$lis['img'];
                        $data[$key]['books'][$k]['title'] = $lis['name'];
                        $data[$key]['books'][$k]['en'] = $lis['english'];
                        $data[$key]['books'][$k]['description'] = $lis['about'];
                        $data[$key]['books'][$k]['author'] = $lis['username'];
                        $data[$key]['books'][$k]['zishu'] = $this->booknumber($lis['txt']);
                        $data[$key]['books'][$k]['xin'] = $lis['readernum'];
                    }
            }
        return $data;
    }
    
    /**
     * 我的喜好
     */
    
    public function mylike($postdata)
    {
        /*$table  = M('books');
        $title  = $table->field("keyword,id")->select();//查询图书关键词，搜索内容*/
        $sql    =   "select keyword,id from uek_book_books";
        $title  =   parent::sql_cache($sql,99999999);
        foreach ($title as $key=>$value)
            {
                $arr[$value['id']] = explode(",", $value['keyword']);
            }
        foreach ($arr as $key=>$value)
            {
                foreach ($postdata as $v)
                    {
                        $str    .=   $v.",";
                        if (in_array($v,$value))
                            {
                                $mydata[] = $key;
                            }
                    }
            }
        $myuser =   M('detail');
        $id     =   session("id");
        if ($id)
        {
            $like['like']   =   $str;
            $myuser->where("user_id = {$id}")->add($like);        
        }
        $mylike = array_unique($mydata);
        $books  = parent::reader();
        foreach ($books as $value)
            {
                if (in_array($value['id'], $mylike))
                    {
                        $mml[]  = $value;
                    }
            }
        $new         = parent::rulelist("addtime", "desc", $mml);//根据添加时间倒叙排序
        $recommend   = parent::rulelist("praise", "desc", $mml);//根据点赞量倒叙排序
        $reader      = parent::rulelist("readernum","desc", $mml);//根据浏览人数倒叙排序
        $category[0] = array("type"=>"tuijian");//推荐榜单
        $category[1] = array("type"=>"redu");//热度榜单
        $category[2] = array("type"=>"shangjia");//最新上架榜单
        $category[0]['books']  = $recommend;
        $category[1]['books']  = $reader;
        $category[2]['books']  = $new;
        return $category;
    }
}