<?php
/* -----------------------------------------------------
 * 数据的查询   一些封装方法      使用方法获取数据  上传、下载、邮件验证码、等
 * -----------------------------------------------------
 * 作者 ：：liyuan   @646066459@qq.com
 * ------------------------------------------------------
 * 2016.12.02
 * */
namespace Admin\Controller;

use Think\Controller;

class BooksController extends BaseController
{
    /**
     * 图书列表显示数据      图书类别，作者，上架时间，书名，缩略图
     *              书本描述，关键词，标签，图书地址（供下载，阅读使用）
     */
    public function showbooks()
    {
        $table = M('books');
        //书籍信息
        $books = $table
            ->alias("ubb")
            ->field("ubb.*,ubu.nickname usersname,ubc.name categoryname")
            ->join("left join uek_book_user ubu on ubb.user_id = ubu.id")
            ->join("left join uek_book_category ubc on ubb.category_id = ubc.id")
            ->select();
        //查询浏览量量
        foreach ($books as $key => $value) {
            $books[$key]["reader"] = $table
                ->alias("ubb")
                ->where("ubb.id = {$value['id']}")
                ->join("left join uek_book_book_user ubbu on ubb.id = ubbu.books_id")
                ->count("ubbu.id");
        }
        foreach ($books as $key=>$value)
        {
            $books[$key]['img'] = __MYHOST__.$value['img'];
        }
        $this->response($books, "json");
    }

    /**
     * 这是书籍删除方法
     *          包括删除   缩略图    书籍
     */
    public function delbook()
    {
        $table = M('books');
        $data = I("get.");
        $url = $table->field("img,txt")->where($data['id'])->select();
        foreach ($url as $value) {
            $img = __MYHOST__.$value['img'];
            $txt = __MYHOST__.$value['txt'];
            $num1 = unlink("." . $img);
            $num2 = unlink("." . $txt);
        }
        $table->where("id = " . $data['id'])->delete();
        $this->showbooks();
    }

    /**
     * 显示图书内容11111
     * @param unknown $path 图书路径
     * @param unknown $list 排序方式
     * @param unknown $vid 章节id
     * @return multitype:      返回json格式数据
     */
    public function bookshow()
    {
        $table = M('books');
        $id = I('get.id');
        $data = $table->where("id = {$id}")->find();
        $path = __MYHOST__.$data['txt'];
        if (is_readable($path)) {
            $contents = htmlspecialchars(file_get_contents("." . $data['txt']));
            $arr_content = explode($data['vrole'], $contents);
            $arr_items = array();
            foreach ($arr_content as $value) {
                $arr_items[] = explode($data['trole'], $value);
            }
            if ($data['list'] == "up") {
                $arr_items = array_reverse($arr_items);
            }
        } else {
            $arr_items = array(
                "reason" => "由于版权原因占时无法阅读！！"
            );
        }
        return json_encode($arr_items);
    }

    /**
     * 显示图书内容22222222
     * @param unknown $path
     */
    public function bookshow2($path)
    {
        $str = file_get_contents($path);
        $str = mb_convert_encoding($str, "UTF-8", "GBK");
        preg_match_all("/第[^章]+章[\s\S]*?(?:(?=第[^章]+章)|$)/i", $str, $data);
        foreach ($data as $key => $value) {
            foreach ($value as $k => $v) {
                preg_match_all("/第[^章]+章[\s\S]*?/i", $v, $shu[]);
                $books[] = $v;
            }
        }
        $xiaoshuo = array();
        for ($i = 0; $i < count($books); $i++) {
            $arr[$i] = explode($shu[$i][0][0], $data[0][$i]);
            $arr[$i][0] = $shu[$i][0][0];
            $xiaoshuo[$i]['title'] = $arr[$i][0];
            $xiaoshuo[$i]['content'] = $arr[$i][1];
        }
        $this->response($xiaoshuo, "json");
    }

    /**
     * 给书本添加图书内容
     * @param unknown $path 图书存放路径
     * @param unknown $books 图书内容数组
     * @param unknown $name 图书名
     * @return boolean return  返回布尔值
     */
    public function addbook($path, $books, $name)
    {
        date_default_timezone_set("PRC");
        $info_time = date('Y-m-d H:i:s');
        $contents = file_get_contents("." . $path);
        $arr_content = explode('%%|%%', $contents);
        $arr_content = array_reverse($arr_content);
        $arr_last = explode('@||@', $arr_content['0']);
        $info_max = $arr_last[0];
        $newinfo[] = $info_max + 1;
        $newinfo = array_merge($newinfo, $books);
        $newinfo[] = $info_time;
        $newcontent = '%%|%%' . implode('@||@', $newinfo);
        if ($name) {
            $filename = $name . ".txt";
        } else {
            $filename = time() . session('id') . ".txt";
        }
        $fs = fopen($filename, "a+");
        if (fwrite($fs, $newcontent) > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除章节为vid文章章节
     * @param unknown $path 文件路径
     * @param unknown $vid 文件章节名
     * @param unknown $name 文件名
     * @return boolean return 返回true  or false
     */
    public function delbookv($path, $vid, $name)
    {
        $method = $this->_method;
        $arrbook = $this->bookshow($path, '', $vid);
        unset($arrbook["{$vid}"]);
        $num = unlink(__ROOT__ . $path);
        $num = touch(__ROOT__ . $path);
        if ($num) {
            $data = $this->addbook($path, $arrbook, $name);
        }
        return $data;
    }

    /**
     * 添加图书新书上架
     */
    public function updata()
    {
        $data = I('post.');
        $table = M('books');
        $db = "books";
        $data['addtime'] = date("Y-m-d H:i:s");
        if (!$data['category_id']) {
            $this->error("没有选择类型");
        } else {
            if ($table->create($data)) {
                $id = $table->add($data);
            }
            foreach ($_FILES as $key => $value) {
                if ($key == "txt") {
                    $exts = array("txt", "doc", "docx", "pdf");
                } elseif ($key == "img") {
                    $exts = array("jpg", "png", "jpeg", "gif");
                }
                $path   =   1;
                $num = parent::dataupload($id, $key, $db, $exts, $path, $key);
            }
        }
        if($num)
        {
            $this->success("添加成功！");
        }
        else 
        {
            $this->error("添加失败");
        }
    }

    /**
     * 这是更新书籍     @在修改
     */
    public function upadtebooks()
    {
        $table = M('books');
        $data = I('post');
        
    }
}