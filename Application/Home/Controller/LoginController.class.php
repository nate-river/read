<?php
/*--------------------------------------------------
 * 加载首页
 *--------------------------------------------------
 *@liyuan   646066459@qq.com
 *---------------------------------------------------
 *2016.12.08
 */
namespace Home\Controller;

use Think\Controller;
use Home\Controller\BooksController;

class LoginController extends BooksController
{
    /**
     * app登录
     */
    public function applogin()
    {
        $data = $this->_method;
        $data = json_decode(file_get_contents('php://input'), true);
        $ip   = $_SERVER['REMOTE_ADDR'];
        $host = $_SERVER['REMOTE_HOST'];
        $port = $_SERVER['REMOTE_PORT'];
        $ipad = $ip.md5($host).$port;
        $message = $this->login($data,$ipad);
        $this->ajaxReturn($message,"json");
    }

    /**
     * app注册
     */
    public function appregister()
    {
        $data = $this->_method;
        $data = json_decode(file_get_contents('php://input'), true);
        $message = $this->register($data);
        $this->ajaxReturn($message,"json");
    }
    
    /**
     *  退出登录
     */
    
    public function appexit(){
        session_destroy();
        $message = array("status"=>1,"data"=>"退出成功！");
        $this->ajaxReturn($message,__RETURN__);
    }

    /**
     * app忘记密码
     */
    public function apprest()
    {
        $data = $this->_method;
        $data = json_decode(file_get_contents('php://input'), true);
        $message = $this->apppwd($data);
        $this->ajaxReturn($message,"json");
    }

    /**
     * app重置密码
     */
    public function appuppwd()
    {
        $data = $this->_method;
        $data = json_decode(file_get_contents('php://input'), true);
        $message = $this->uppwd($data);
        $this->ajaxReturn($message,"json");
    }

    /**
     * 登录验证
     */
    public function login($data,$ip)
    {
        $table = M('user');
        if ($data['accout']) 
            {
                if ($data['password'])
                    {
                        $data['password']   = md5($data['password']);
                        $num = $table->field("id,nickname,tel")->where($data)->find();
                        if ($num['id'])
                            {
                                date_default_timezone_set("PRC");
                                $login  =   M('login');
                                $lme['ipaddr']    =   $ip;
                                $lme['user_id']   =   $num['id'];
                                $lme['addtime']   =   date("Y-m-d H:i:s");
                                $seip     =   $login
                                    ->field("id,addtime")
                                    ->where("user_id = {$num['id']}")
                                    ->find();
                                if($seip['id'])
                                {
                                    $login->where("id = {$seip['id']}")->delete();
                                }
                                $lonum    =   $login->add($lme);
                                session('ipid',$lonum);
                                session("id", $num['id']);
                                session("name", $num['nickname']);
                                session("tel", $num['tel']);
                                $message['state'] = 1;
                                $message['id']    = $num['id'];
                                $message['nickname'] = $num['nickname'];
                                $message['name'] = "登录成功，欢迎{$num['nickname']}登录,{$ip}";
                            } 
                        else 
                            {
                                $message['id']    = 0;
                                $message['name'] = "用户名或密码错误!请重试";
                            }
                    } 
                else 
                    {
                        $message['name'] = "请输入密码";
                        $message['id']    = 0;
                    }
            }
        else 
            {
                $message['name'] = "请输入账号";
                $message['id']    = 0;
            }
        return $message;
    }

    /**
     * 注册验证
     */
    
    public function register($data)
    {
        $table = M('user');
        if ($data['zhanghao']) 
            {
                $num = $table->field("id")->where("accout = '" . $data['zhanghao'] . "'")->find();
                if ($num) 
                    {
                        $message['message'] = "账号已存在！！！";
                    } 
                else 
                    {
                        if (strlen($data['zhanghao']) < 6) 
                        {
                            $message['message'] = "账号长度不够！！！长度为6-8";
                        } 
                        elseif (strlen($data['zhanghao']) > 9) 
                        {
                            $message['message'] = "账号长度超了哦！！！长度为6-8";
                        } else 
                        {
                            if ($data['psw1'] == $data['psw2'])
                            {
                                if (strlen($data['psw1']) < 6) 
                                {
                                    $message['message'] = "密码长度不够啊！！";
                                } 
                                elseif (strlen($data['psw1']) > 12) 
                                {
                                    $message['message'] = "密码长度太长！！！";
                                } else
                                {
                                    if ($data['name']) 
                                    {
        //                                if (strlen($data['phone']) == 11){
                                        $user['password'] = md5($data['psw1']);
                                        $user['nickname'] = $data['name'];
        //                                $user['tel'] = $data['phone'];
                                        $user['tel'] = '123131';
        
                                        $user['accout'] = $data['zhanghao'];
                                        date_default_timezone_set("PRC");
                                        $user['addtime'] = date("Y-m-d H:i:s");
                                        if ($table->create($user)) 
                                        {
                                            $num = $table->add($user);
                                            session("id", $num);
                                            session("nicknam", $data['name']);
                                            session("tel", $data['tel']);
                                            if ($num) 
                                            {
                                                $table  =   M('detail');
                                                $add['user_id'] =   session("id");
                                                $add['header']  =   "/Public/Upload/Header/2016-12-17/123.jpg";
                                                $result =   $table->add($add);
                                                $message['state'] = 1;
                                                $message['name'] = $user['nickname'];
                                                $message['message'] = "注册成功！正在跳转登录页";
                                            }
                                        } 
                                        else 
                                        {
                                            $message['message'] = "注册失败！请联系客服咨询";
                                        }
        //                                }else {
        //                                    $message['message'] = "请输入11位正确的手机号";
        //                                }
                                    } 
                                    else 
                                    {
                                        $message['message'] = "名字不可以为空哦";
                                    }
                                }
                            } 
                            else 
                            {
                                $message['message'] = "两次密码不相同";
                            }
                        }
                    }
            } 
        else 
            {
                $message['message'] = "没有输入账号";
            }
        return $message;
    }

    /**
     * @param unknown $data
     * @return string
     */
    public function apppwd($data)
    {
        $table = M('user');
        if ($data['zhanghao']) 
        {
            $result = $table->field("id,nickname,tel,password")->where("accout = '" . $data['zhanghao'] . "'")->find();
            if ($result['id']) 
            {
                if ($data['username'] == $result['nickname']) 
                {
//                    if ($data['phone'] == $result['tel']) {
                    $message['state'] = 1;
                    $message['id'] = $result['id'];
                    session('pwd',$result['password']);
                    session('id', $result['id']);
                    $message['message'] = "信息正确，正在跳转至重置密码页面";
//                    } else {
//                        $message['message'] = "手机号错误";
//                    }
                } 
                else 
                {
                    $message['message'] = "用户名错误！";
                }
            } 
            else 
            {
                $message['message'] = "没有该账号！！";
            }
        }
        else 
        {
            $message['message'] = "没有输入账号！！";
        }
        return $message;
    }

    /**
     * 重置密码
     * @param unknown $data
     * @return string
     */
    public function uppwd($data)
    {
        $table = M('user');
        if ($data['psw1'] != $data['psw2'])
        {
            $message['message'] = "两次密码输入不相同";
        } 
        else 
        {
            if (strlen($data['psw1']) < 6) 
            {
                $message['message'] = "密码长度不够啊！！";
            } 
            elseif (strlen($data['psw1']) > 12) 
            {
                $message['message'] = "密码长度太长！！！";
            } 
            else 
            {
                $pwd    =   session("pwd");
                if (md5($data['psw1']) == $pwd)
                {
                    $message['message'] = "和原密码相同了";
                }
                else 
                {
                    $user['password'] = md5($data['psw1']);
                    $tmp = session('id');
                    $num = $table->where("id = {$tmp}")->save($user);
                    if ($num)
                    {
                        $message['state'] = 1;
                        $message['id']    = session('id');
                        $message['message'] = "修改成功，请使用新密码登录";
                    } 
                    else 
                    {
                        $message['message'] = "修改失败，可能是网络繁忙";
                    }
                }
            }
        }
        return $message;
    }
    
    public function islogin()
    {
        $table  =   M('login');
        date_default_timezone_set("PRC");
        $time   =   date("Y-m-d H:i:s");
        $data['addtime'] = $time;
        $ip     =   $_SERVER['REMOTE_ADDR'];
        $host   =   $_SERVER['REMOTE_HOST'];
        $port   =   $_SERVER['REMOTE_PORT'];
        $ipad   =   $ip.md5($host).$port;
        $id     =   session("ipid");
        $user_id=   session('id');
        $resukt =   $table
                ->field("user_id,ipaddr")
                ->where("id = {$id}")
                ->find();
        if($id)
        {
            $table->where("id = {$id}")->save($data);
            if ($resukt['ipaddr'] == $ipad and $resukt['user_id'] == $user_id) {
                $message['state'] = 1;
                $message['id']    = $id;
            }
            else
            {
                $message['state'] = 2;
                $message['id']    = 0;
                $message['ip']    = $ipad;
            }
        }
        else
        {
            $message['state']   =   0;
            $message['id']      =   0;
        }
        $this->ajaxReturn($message,__RETURN__);
    }
}