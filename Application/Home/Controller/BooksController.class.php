<?php
/*-------------------------------------------------
 * 图书信息加载
 * ------------------------------------------------
 * @liyuan      646066459@qq.com
 * ------------------------------------------------
 * 2016.12.05
 * */
namespace Home\Controller;

use Think\Controller\RestController;
header('Access-Control-Allow-Origin: *');

class BooksController extends RestController
{
    public function __construct()
    {
        parent::__construct();
    }

    /*
    *   书籍翻页
    */
    public  function  bookpaging()
    {
        $data   =   I('get.');
        if ($data['vid']) {
            $vid    =   $data['vid'];
        }
        else
        {
            $vid    =   1;
        }
        $message    =   $this->bookspage($data['id'],$vid);
        if ($data['vid'] > $message['vnum']) {
            $vid    =   $message['vnum'];
            $message['content'] =  null;
        }
        $message    =   $message['content'];
        $this->ajaxReturn($message,__RETURN__);
    }
            
    /**
     * 书籍翻页下一页
     */
    
    
    public function bookpagingnext()
    {
        $data['id']   =   I('get.id');
        if (I('get.num'))
        {
            $data['num']    =   I('get.num');
        }
        else 
        {
                $data['num']    =   520;
        }
        if (I('get.page'))
        {
            $page          =   I('get.page');
            $data['page']   =   $page+1;
        }
        else 
        {
                $data['page']   =   0;
        }
        $result['num'] = $data['num'];
        $result['id']  = $data['id'];
        $result['page']= $data['page']+1;
        $message[0] = $this->bookspagenext($data);
        if (($message[0]['allpages']-2) <= $data['page'])
        {   
            $books[0]  = array("content"=>"读完一本书了哦！！","page"=>$data['page'],"allpages"=>$message[0]['allpages']);
        }
        else
        {
            $message[1] = $this->bookspagenext($result);
            $result['page']= $data['page']+2;
            $message[2] = $this->bookspagenext($result);
            $result['page']= $data['page']+3;
            $message[3] = $this->bookspagenext($result);
            foreach ($message as $value)
            {
                if($value['page'] <= $value['allpages'])
                {
                    $books[] = $value;
                }
            }
        }
        $this->ajaxReturn($books,__RETURN__);
    }
    
    /**
     * 书籍翻页上一页
     */
    
    public function bookpagingprev()
    {
        $data['id']   =   I('get.id');
        if (I('get.num'))
        {
            $data['num']    =   I('get.num');
        }
        else 
        {
                $data['num']    =   520;                
        }
        if (I('get.page'))
        {
            $page          =   I('get.page');
            $data['page']   =   $page-1;
        }
        else 
        {
                $data['page']   =   4;
        }
        if($data['page'] <= 0 )
        {
            $message[0] = array("content"=>"没有上一页了","page"=>$data['page'],"allpages"=>$message[3]['allpages']);
        }else {
            $result['num'] = $data['num'];
            $result['id']  = $data['id'];
            $result['page']= $data['page']-1;
            $message[3] = $this->bookspageprev($data);
            $message[2] = $this->bookspageprev($result);
            $result['page']= $data['page']-2;
            $message[1] = $this->bookspageprev($result);
            $result['page']= $data['page']-3;
            $message[0] = $this->bookspageprev($result);
        }
        $this->ajaxReturn($message,__RETURN__);
    }

    /**
     * app添加评论
     */
    public function appaddcomment()
    {
        $method = $this->_method;
        $data = json_decode(file_get_contents("php://input"), true);
        $message = $this->bookcomment($data);
        $this->ajaxReturn($message, __RETURN__);
    }

    /**
     * app 全部评论
     */
    
    public function appallcomment()
    {
        $id = I('get.id');
        $arr = $this->bookscomment($id);
        $this->ajaxReturn($arr,__RETURN__);
    }

    /**
     * app点击阅读
     */
    
    public function appread()
    {
        $id = I('get.id');
        $arr = $this->messagebook($id);
        $this->ajaxReturn($arr,__RETURN__);
    }
    
    /**
     * app阅读章节
     */
    
    public function appvidbook()
    {
        $data   =   I('get.');
        $message=   $this->appvid($data);
        $this->ajaxReturn($message,__RETURN__);
    }
    
    /**
     * app阅读章节
     * @param type $data
     */
    public function appvid($data)
    {
        $bookarr    = $this->showlist2($data['id']);
        foreach ($bookarr as $key=>$value)
        {
            if($data['vid'] > $key)
            {
                $evenum = mb_strwidth($value['content'],"UTF-8");//每一章的字数
                $evepage= ceil($evenum/(3*520));//每一章的页数
                $nowbook += $evepage;
            }
        }
        $newpage    =   $nowbook;
        $vid['page']=   $newpage;
        $vid['num'] =   520;
        $vid['id']  =   $data['id'];
        $show[0]    =    $this->bookspagenext($vid);
        $vid['page']=   $vid['page']+1;
        $show[1]    =   $this->bookspagenext($vid);
        $vid['page']=   $vid['page']+1;
        $show[2]    =   $this->bookspagenext($vid);
        $vid['page']=   $vid['page']+1;
        $show[3]    =   $this->bookspagenext($vid);
        return $show;
    }

    /*
    *   图书翻页显示
    */

    public function bookspage($id,$vid)
    {
        $bookarr    = $this->showlist2($id);
        $allv       = count($bookarr);
        $message['content']    =   $bookarr[$vid-1];
        $message['vnum']        =   $allv;
        return $message;
    }
    
    /**
     * 图书翻页 向下翻页
     * @param unknown $data
     */
    
    public function bookspagenext($data)
    {
        $bookarr    = $this->showlist2($data['id']);
        $allv       = count($bookarr[0]);
        foreach ($bookarr as $key=>$value)
        {
            $evenum = mb_strwidth($value['content'],"UTF-8");//每一章的字数
            $evepage= ceil($evenum/(3*$data['num']));//每一章的页数
            $bookarr[$key]['pages'] =   $evepage;
            $allpage+=$evepage;//总页数
        }
        foreach ($bookarr as $k=>$v)
        {
            $evenum = mb_strwidth($v['content'],"UTF-8");//每一章的字数
            $evepage= ceil($evenum/(3*$data['num']));//每一章的页数
            $bookarr[$k]['pages'] =   $evepage;
            $alpage+=$evepage;
            if ($alpage > $data['page'])
            {
                $read = $evepage-($alpage-$data['page']);
                $start = $read*$data['num'];
                $book  = mb_substr($v['content'], $start,$data['num'],"UTF-8");
                $v['content'] = $book;
                $v['pages']   = $read+($alpage-$evepage);
                $show  = $v;
                break;
            }
        }
        $show['allpages'] = $allpage;
        return $show;
    }
    
    /**
     * 图书翻页 向上翻页
     * @param unknown $data
     */
    
    public function bookspageprev($data)
    {
        $bookarr    = $this->showlist2($data['id']);
        $allv       = count($bookarr[0]);
        foreach ($bookarr as $key=>$value)
        {
            $evenum = mb_strwidth($value['content'],"UTF-8");//每一章的字数
            $evepage= ceil($evenum/(3*$data['num']));//每一章的页数
            $bookarr[$key]['pages'] =   $evepage;
            $allpage+=$evepage;//总页数
        }
        foreach ($bookarr as $k=>$v)
        {
            $evenum = mb_strwidth($v['content'],"UTF-8");//每一章的字数
            $evepage= ceil($evenum/(3*$data['num']));//每一章的页数
            $bookarr[$k]['pages'] =   $evepage;
            $alpage+=$evepage;
            if ($alpage > $data['page'])
            {
                $read = $evepage-($alpage-$data['page']);
                $start = $read*$data['num'];
                $book  = mb_substr($v['content'], $start,$data['num'],"UTF-8");
                $v['content'] = $book;
                $v['pages']   = $read+($alpage-$evepage);
                $show  = $v;
                break;
            }
        }
        $show['allpages'] = $allpage;
        return $show;
    }

    /**
     * app图书评论
     */
    
    public function bookscomment($booksid)
    {
        $table = M('comment');
        /*$result = $table->alias('ubc')
            ->field("ubc.*,ubu.nickname,ubd.header")
            ->join("left join uek_book_user ubu on ubu.id = ubc.user_id")
            ->join("left join uek_book_detail ubd on ubd.user_id = ubc.user_id")
            ->where("books_id = {$booksid}")
            ->order("addtime desc")
            ->select();*/
        $sql    =   "select ubc.*,ubu.nickname,ubd.header from uek_book_comment ubc left join uek_book_user ubu on ubu.id = ubc.user_id left join uek_book_detail ubd on ubd.user_id = ubc.user_id
         where books_id = {$booksid} order by addtime desc";
         $result  =  $this->sql_cache($sql,60);
        $res = $this->comment($result);
        foreach ($result as $key=>$value){
            $result[$key]['pnum'] = $res[$key][0]['sid'];
            $result[$key]['header']= __MYHOST__.$value['header'];
        }
        return $result;
    }
    
    /**
     * 书评点赞
     * @param unknown $data
     * @return unknown
     */
    
    public function comment($data)
    {
        $table  =   M('praise');
        $result =   $table->where("status = 1")->select();
        foreach ($data as $key=>$value)
        {
            $num[$key]  = $table
                    ->alias("ubp")
                    ->field("COUNT(id) sid")
                    ->where("comment_id =   {$value['id']} and status = 1")
                    ->select();
        }
        return $num;
    }

    /**
     * 书籍评论
     * @param unknown $data
     * @return string
     */
    
    public function bookcomment($data)
    {
        $comm['user_id'] = session('id');
        $comm['books_id'] = $data['bookid'];
        $comm['content'] = $data['content'];
        date_default_timezone_set('PRC');
        $comm['addtime'] = date('Y-m-d H:i:s');
        $message = $this->addcomment($comm);
        return $message;
    }

    /**
     * 添加评论
     * @param unknown $data
     * @return string
     */
    
    public function addcomment($data)
    {
        $table = M('comment');
        if ($table->create($data))
            {
                $num = $table->add($data);
                if ($num) 
                    {
                        $message = "success";
                    } 
                else 
                    {
                        $message = "error";
                    }
            }
        return $message;
    }

    /**
     * app图书笔记
     */
    
    public function booksnote($booksid)
    {
        $table = M('note');
        $id = session("id");
        if ($id)
            {
                $result = $table->where("books_id = {$booksid} and user_id = {$id}")
                    ->order("addtime desc")
                    ->select();
            }
        else 
            {
                $result =   null;
            }
        return $result;
    }

    /**
     * app图书书签
     */
    
    public function booksmark($booksid)
    {
        $table = M('mark');
        $id = session('id');
        if ($id)
            {
                $sql    =   "select id,page,books_id from uek_book_mark where books_id = {$booksid} and user_id = {$id}"
                . " order by addtime desc";
                $result =   $table
                        ->field("id,page,books_id")
                        ->where("books_id = {$booksid} and user_id = {$id}")
                        ->select();
                foreach ($result as $key=>$value)
                    {
                        $ids[$key]      =   $value['id'];
                        $data['page']   =   $value['page'];
                        $data['id']     =   $value['books_id'];
                        $data['num']    =   520;
                        $message[$key] = $this->bookspagenext($data);
                    }
                    foreach ($message as $k=>$value)
                    {
                        $result[$k]['content']   = mb_substr($value['content'],20,"UTF-8");
                        $result[$k]['title']      =   $value['title']."     ".$value['mulu'];
                        $result[$k]['id']         =   $ids[$k];
                    }
            }
        else 
            {
                $result =   null;
            }
        return $result;
    }

    /**
     * 阅读上一页
     */
    
    public function bookshowprev()
    {
        $id = I('get.id');
        if (I('get.v')) 
            {
                $vnum = I('get.v');
            } 
        else 
            {
                $vnum = 1;
            }
        if (I('get.zishu')) 
            {
                $vnnum = I('get.zishu');
            } 
        else 
            {
                $vnnum = 800;
            }
        if (I('get.num')) 
            {
                $vlnum = I('get.num');
            } 
        else 
            {
                $vlnum = 1;
            }
        if (I('get.allnum')) 
            {
                $allnum = I('get.allnum');
            } 
        else 
            {
                $allnum = 99999999;
            }
        if (session('id')) 
            {
                $this->newlist($id);
            }
        if ($vlnum > $allnum) 
            {
                $show['content'] = "没有更多内容了";
            } 
        elseif ($vlnum <= 0)
            {
                $show['content'] = "这已经是第一页了";
            } 
        else 
            {
                $show = $this->readbookprev($id, $vlnum, $vnnum, $vnum);
            }
        $this->ajaxReturn($show,__RETURN__);
    }

    /**
     * app图书目录
     */
    
    public function getCategories()
    {
        $id = I('get.id');
        $a = $this->showlist2($id);
        unset($a['content']);
        $this->ajaxReturn($a,__RETURN__);
    }

    /**
     * app图书阅读  向下翻页
     */
    
    public function bookshownext()
    {
        $id = I('get.id');
        if (I('get.v')) 
            {
                $vnum = I('get.v');
            } 
        else
            {
                $vnum = 1;
            }
        if (I('get.zishu')) 
            {
                $vnnum = I('get.zishu');
            } 
        else 
            {
                $vnnum = 800;
            }
        if (I('get.num'))
            {
                $vlnum = I('get.num');
            } 
        else 
            {
                $vlnum = 1;
            }
        if (I('get.allnum'))
            {
                $allnum = I('get.allnum');
            } 
        else 
            {
                $allnum = 99999999;
            }
        if (session('id'))
            {
                $this->newlist($id);
            }
        if ($vlnum <= 0)
            {
                $show['content'] = "这已经是第一页了";
            } 
        else 
            {
                $show = $this->readbooknext($id, $vlnum, $vnnum, $vnum);
            }
        $this->ajaxReturn($show,__RETURN__);
    }

    /**
     * 图书信息
     * @param unknown $id
     * @return \Home\Controller\unknown
     */
    
    public function messagebook($id)
    {
        $message = $this->book($id);
        $scomment = $this->bookscomment($id);
        $ssmark = $this->booksmark($id);
        $snote = $this->booksnote($id);
        if (empty($scomment)) 
            {
                $scomment = null;
            }
        else if (count($scomment) > 2)
            {
                $scomment = array_splice($scomment,0,2);
            }
        if (count($ssmark) > 2)
            {
                $ssmark =   array_splice($ssmark,0,2);
            }
        if (count($snote) > 2)
            {
                $snote =   array_splice($snote,0,2);
            }
        foreach ($scomment as $key=>$value)
            {
                $e = explode(' ',$value['addtime']);
                $scomment[$key]['addtime'] =   $e[0];
            }
        foreach ($snote as $key=>$value)
            {
                $e = explode(' ',$value['addtime']);
                $snote[$key]['addtime'] =   $e[0];
            }
        foreach ($ssmark as $key=>$value)
            {
                $e = explode(' ',$value['addtime']);
                $ssmark[$key]['addtime'] =   $e[0];
            }
        if (empty($scomment))
            {
                $scomment   =   null;
            }
        if (empty($snote))
            {
                $snote   =   null;
            }
        if (empty($ssmark))
            {
                $ssmark   =   null;
            }
        $like = $this->likebooks($id);
        $data['img']         = __MYHOST__.$message['img'];
        $data['title']       = $message['name'];
        $data['description'] = $message['about'];
        $data['author']      = $message['username'];
        $data['zishu']       = $this->booknumber($message['txt']);
        $data['year']        = $message['year'];
        $data['xin']         = $message['readernum'];
        $data['leibie1']     = $message['leibie1'];
        $data['leibie2']     = $message['leibie2'];
        $data['leibie3']     = $message['leibie3'];
        $data['shuping']     = $scomment;
        $data['shuqian']     = $ssmark;
        $data['biji']        = $snote;
        $data['xiangshishuji'] = $like;
        return $data;
    }

    /**
     * 相似书籍
     * @param unknown $id
     * @return unknown
     */
    public function likebooks($id)
    {
        $table = M('books');
        $sql    =   "select id,keyword,img from uek_book_books where id = {$id}";
        $books  =   $this->sql_cache($sql,36000);
        $member = $this->reader();
        foreach ($member as $key => $value)
            {
                if ($value['keyword'] == $books[0]['keyword'])
                    {
                        $data[$key] = $value;
                        $data[$key]['img']  =   __MYHOST__.$value['img'];
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
        $number = mb_strwidth(file_get_contents("." . $txt), "UTF-8");
        return $number;
    }

    /**
     * 图书详情
     * @param unknown $id
     * @return unknown
     */
    public function book($id)
    {
        $member = $this->reader();
        foreach ($member as $value)
            {
                if ($value['id'] == $id)
                    {
                        $data = $value;
                    }
            }
        $arr = explode(",", $data['keyword']);
        $data['leibie1'] = $arr[0];
        $data['leibie2'] = $arr[1];
        $data['leibie3'] = $arr[2];
        return $data;
    }

    /**
     * 图书详情        作者，上架时间addtime，所属类别categoryname， 标签 ，描述，缩略图
     *         关键词 ，书名，最近更新时间uptime
     *         上架人upusersname 是否有推荐
     */
    public function bookslist()
    {
        $table = M('books');
        $sql    =   "select ubb.*,ubc.name categoryname,ubu.nickname upusersname from uek_book_books ubb"
                . " left join uek_book_category ubc on ubb.category_id = ubc.id left join uek_book_user ubu on ubb.user_id = ubu.id"
                . " left join uek_book_chapter ubch on ubb.id = ubch.books_id";
        $result =   $this->sql_cache($sql,3600);
        return $result;
    }

    /**
     * 查询          收藏量collect ，分享量share ， 点赞量praise
     * 返回数据包括    图书详情
     * $this->bookslist();
     */
    public function reader()
    {
        $books = $this->bookslist();
        $table = M('book_user');
        foreach ($books as $key => $value) 
            {
                $sql    =   "select COUNT(collect) collect,COUNT(user_id) readernum,COUNT(share) share,COUNT(praise) praise"
                        . " from uek_book_book_user ubbu where ubbu.books_id = {$value['id']}";
                $reader = $this->sql_cache($sql,3600);
                $readernum[$key] = $reader[0];
            }
        foreach ($books as $key => $value) 
            {
                $result[$key] = array_merge($value, $readernum[$key]);
            }
        return $result;
    }

    /**
     *
     * 排序  $data 传递规则字段
     *     $order 升序将序
     * 有一下规则 ：：：：：：：：：：：：
     * @addtime    最新上架
     * @uptime     最新更新
     *     .................
     **/
    public function rulelist($data, $order, $arr)
    {
        if ($arr) 
            {
                $arr = $arr;
            } 
        else 
            {
                $arr = $this->reader();
            }
        if ($order == "desc")
            {
                $sort = SORT_DESC;
            } 
        elseif ($order == "asc") 
            {
                $sort = SORT_ASC;
            }
        foreach ($arr as $key => $value)
            {
                $array[$key] = $value[$data];
            }
        array_multisort($array, $sort, SORT_STRING, $arr);
        return $arr;
    }

    /**
     * @param unknown $id 图书书籍id
     * @param number $vlnum 本章阅读当前页数
     * @param number $vnnum 每页显示字数
     * @param number $vnum 章节号
     * @return unknown
     */
    public function readbookprev($id, $vlnum, $vnnum, $vnum)
    {
        $bookarr = $this->showlist2($id);
        $allv = count($bookarr);
        foreach ($bookarr as $key => $value) 
            {
                if ($vnum > $key) 
                    {
                        $tvnum = mb_strlen($value['content'], "UTF-8");//个章的内容长度
                        $evenum[$key] = ceil($tvnum / $vnnum);//个章页数
                    }
                $allnum += $evenum[$key];//总页数
            }
        for ($i = 0; $i <= $vnum; $i++) 
            {
                $throw += $evenum[$i];
            }
        if ($vlnum >= $throw)
            {
                $vnum--;
            }
        //获取上一页
        $vlnum = $vlnum - 1;
        $num = mb_strlen($bookarr[$vnum - 1]['content'], "UTF-8");
        $allnum = ceil($num / $vnnum);
        $read = ceil(($vlnum / $allnum) * 100) . "%";
        $now = ($vlnum - 1) * $vnnum;
        $show = mb_substr($bookarr[$vnum - 1]['content'], $now, $vnnum, "UTF-8");
        $data['name']           = $bookarr[$vnum - 1]['name'];
        $data['content']        = $show;
        $data['datev']          = $vnum;
        $data['tatle']          = $bookarr[$vnum - 1]['title'];
        $data['allnum']         = $allnum;
        $data['mulu']           = $bookarr[$vnum - 1]['mulu'];
        $data['nownum']         = $nowlnum;
        $data['txtnum']         = $vnnum;
        $data['next']           = ++$vlnum;
        $data['jindu']          = $read;
        return $data;
    }

    /**
     * @param unknown $id 图书书籍id
     * @param number $vlnum 本章阅读下一前页数
     * @param number $vnnum 每页显示字数
     * @param number $vnum 章节号
     * @return unknown
     */
    public function readbooknext($id, $vlnum, $vnnum, $vnum)
    {
        $bookarr = $this->showlist2($id);
        foreach ($bookarr as $key => $value) 
            {
                $tvnum = mb_strlen($value['content'], "UTF-8");
                $evenum[$key] = ceil($tvnum / $vnnum);
            }
        for ($i = 0; $i <= $vnum; $i++) 
            {
                $throw += $evenum[$i];
            }
        $books_show = count($bookarr);
        foreach ($evenum as $key => $dsds) 
            {
                if ($key < $vnum - 1) 
                    {
                        $nowlnum += $dsds;
                    }
                $booknum += $dsds;
            }
        $num                = mb_strlen($bookarr[$vnum - 1]['content'], "UTF-8");
        $allnum             = ceil($num / $vnnum);
        $page               = cookie('page');
        $read               = ceil(($vlnum / $allnum) * 100) . "%";
        $now                = ($vlnum - 1) * $vnnum;
        $show               = mb_substr($bookarr[$vnum - 1]['content'], $now, $vnnum, "UTF-8");
        $data['name']       = $bookarr[$vnum - 1]['name'];
        $data['content']    = $show;
        $data['datev']      = $vnum;
        $data['tatle']      = $bookarr[$vnum - 1]['title'];
        $data['allnum']     = $booknum;
        $data['mulu']       = $bookarr[$vnum - 1]['mulu'];
        $data['nownum']     = $vlnum + $nowlnum;
        $data['txtnum']     = $vnnum;
        $data['next']       = ++$vlnum;
        $data['jindu']      = $read;
        return $data;
    }
    /**
     * 图书一
     */
    public function showlist()
    {
        $song   = I('get.');
        $table  = M('books');
        $data   = $table->where("id = {$song['id']}")->find();
        $txt    = $data['txt'];
        $number = mb_strwidth(file_get_contents("." .$txt), "UTF-8");
        $book   = $this->showbooks($path, $data);
        $this->ajaxReturn($book,__RETURN__);
    }

    /**
     * 图书2
     */
    
    public function showlist2($id)
    {
        $sql    =   "select name,txt from uek_book_books where id = {$id}";
        $data   =   $this->sql_cache($sql,36000);
        $txt    = $data[0]['txt'];
        $number = mb_strwidth(file_get_contents("." . $txt), "UTF-8");
        $book   = $this->bookshow2($txt);
        foreach ($book as $key => $value) 
            {
                $arr       = mb_substr($value['content'],0,10,"UTF-8");
                $book[$key]['mulu']     = $arr;
                $book[$key]['name']     = $data[0]['name'];
                $book[$key]['allnum']   = $number;
            }
        return $book;
    }

    /**
     * 显示图书内容22222222
     * @param unknown $path 图书路径
     */
    public function bookshow2($path)
    {
        $file   = __MYHOST__ . $path;
        $str    = $this->auto_read($file);
        preg_match_all("/第[^章]+章[\s\S]*?(?:(?=第[^章]+章)|$)/i", $str, $data);
        foreach ($data as $key => $value) 
            {
                foreach ($value as $k => $v) 
                    {
                        preg_match_all("/第[^章]+章[\s\S]*?/i", $v, $shu[]);
                        $books[] = $v;
                    }
            }
        $xiaoshuo = array();
        for ($i = 0; $i < count($books); $i++) 
            {
                $arr[$i]                = explode($shu[$i][0][0], $data[0][$i]);
                $arr[$i][0]             = $shu[$i][0][0];
                $xiaoshuo[$i]['title']  = $arr[$i][0];
                $xiaoshuo[$i]['content']= $arr[$i][1];
            }
        return $xiaoshuo;
    }

    /**
     * 检测文件编码
     * @param string $file 文件路径
     * @return string|null 返回 编码名 或 null
     */
    function detect_encoding($file)
    {
        $list = array('GBK', 'UTF-8', 'UTF-16LE', 'UTF-16BE', 'ISO-8859-1');
        $str = file_get_contents($file);
        foreach ($list as $item)
            {
                $tmp = mb_convert_encoding($str, $item, $item);
                if (md5($tmp) == md5($str)) 
                    {
                        return $item;
                    }
            }
        return null;
    }

    /**
     * 自动解析编码读入文件
     * @param string $file 文件路径
     * @param string $charset 读取编码
     * @return string 返回读取内容
     */
    function auto_read($file, $charset = 'UTF-8')
    {
        $list = array('GBK', 'UTF-8', 'UTF-16LE', 'UTF-16BE', 'ISO-8859-1');
        $str = file_get_contents($file);
        foreach ($list as $item) 
            {
                $tmp = mb_convert_encoding($str, $item, $item);
                if (md5($tmp) == md5($str)) 
                    {
                        return $arr = mb_convert_encoding($str, $charset, $item);
                    }
            }
        return $arr;
    }

    /**
     * @param unknown $path 文件路径
     * @param unknown $data 数据 包括     章节分割符vrole 文章分割符  trole 排序方式list
     * @return Ambigous <multitype:string , multitype:multitype: >
     */
    public function showbooks($path, $data)
    {
        if (is_readable("." . $path)) 
            {
                $contents       = htmlspecialchars(file_get_contents("." . $path));
                $arr_content    = explode($data['vrole'], $contents);
                $arr_items      = array();
                foreach ($arr_content as $key => $value) 
                    {
                        $arr_items[++$key][] = explode($data['trole'], $value);
                    }
                if ($data['list'] == "up") 
                    {
                        $arr_items = array_reverse($arr_items);
                    }
            } 
        else 
            {
                $arr_items = array(
                    "reason" => "由于版权原因占时无法阅读！！"
                    );
            }
        return $arr_items;
    }

    /**
     * 添加浏览记录
     * @param unknown $data
     */
    public function newlist($data)
    {
        $table = M('book_user');
        $id = session("id");
        $num = $table->field("id")->where("user_id = {$id} and books_id = {$data}")->find();
        if (!$num['id']) 
            {
                date_default_timezone_set("PRC");
                $new['newtime']     = date("Y-m-d H:i:s");
                $new['user_id']     = $id;
                $new['books_id']    = $data;
                $table->add($new);
            }
    }
    
    public function sql_cache($sql,$date=3600,$type=0)
    {
        $cache  = md5($sql);
        if($type == 1)
        {
            S($cache,null);
        }
        if(S($cache))
        {
            $value  =   S($cache);
        }
        else 
        {
            $db     =   new \Think\Model;
            $value  =   $db->query($sql);
            S($cache,$value,$date);
        }
        return $value;
    }

    public  function ipaddr($data)
    {
        $ip     =   new \Org\Net\IpLocation("UTFWry.dat");
        $addr   =   $ip->getlocation($data);
        return $addr;
    }
}