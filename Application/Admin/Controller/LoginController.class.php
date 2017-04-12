<?php
/*--------------------------------------------------
 * 验证登录信息，判断登录成功
 *--------------------------------------------------
 *@liyuan   646066459@qq.com
 *---------------------------------------------------
 *2016.12.06
 */
namespace Admin\Controller;
use Think\Controller;
class LoginController extends BaseController {
    public function dologin(){
        $num = I("get.");
        if (!empty($num)){
            $table = M('user');
            $result  = $table->field("id")->where("accout = '".$num['accout']."' and password = '".$num['password']."' and status = 2")->find();
            if ($result['id']) {
                $message['state']   =   1;
                $message['message'] =   "登录成功";
            }
            else
            {
                $message['state']   =   0;
                $message['message'] =   "用户名密码错误";
            }
        }else {
            $message['state']   =   0;
            $message['message'] =   "用户密码为空";
        }
        $this->ajaxReturn($message,__RETURN__);
    }
	public function exitlogin()
	{
		session('id',null);
		$message['data'] = 1;
		$this->success("退出成功",U('Admin/index/index'));
	}
}