<?php
/*--------------------------------------------------
 * 个人相关信息控制器
 *--------------------------------------------------
 *@liyuan   646066459@qq.com
 *---------------------------------------------------
 *2016.12.06
 */
namespace Admin\Controller;
use Think\Controller;
class UserController extends BaseController {
    public function userlist() {
        $table = M('user');
        $users =$table
            ->alias("ubu")
            ->field("ubu.*,ubg.name gradename")
            ->join("left join uek_book_grade ubg on ubu.grade_id = ubg.id")
            ->select();
        $this->response($users,"json");
    }
}