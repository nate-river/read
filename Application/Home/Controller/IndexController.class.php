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
class IndexController extends Controller {
    public function index(){
        $this->display("app");
    }
    public function book3()
    {
    	$this->display("home");
    }
}