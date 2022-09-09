import React, {useEffect} from 'react';
import {reqLogin} from "../../api";
import {Button, Form, Input, message} from "antd";
import logo from "./images/login-logo.png";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import './index.less'

function Login(props) {

    const navigate = useNavigate()
    const user = memoryUtils.user

    const onFinish = (values) => {
        const {username, password} = values
        reqLogin(username, password).then((response) => {
            const result = response.data
            if (result.status === 0) {
                message.success('登录成功')
                console.log(result)
                const user = result.data
                memoryUtils.user = user //user存在内存中
                storageUtils.saveUser(user) //user存在local中
                /*跳转到home页面*/
                navigate('/home')
            } else {
                message.error(result.msg)
            }

        }).catch((error) => {
            message.error('请求出错' + error.message)
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (user && user._id){
            navigate("/home")
        }
    },[navigate,user])

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <p>React项目：后台管理系统</p>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 12}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        scrollToFirstError={true}
                        autoComplete="off"
                    >
                        <Form.Item wrapperCol={{offset: 2, span: 20}}
                                   name="username"
                                   rules={[
                                       {required: true, message: '请输入账号'},
                                       {min: 3, message: '用户名至少3位'},
                                       {max: 8, message: '用户名最长8位'},
                                       {
                                           pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                                           message: '请勿输入非法字符'
                                       }
                                   ]}>
                            <Input size="large" placeholder="用户名" prefix={<UserOutlined/>}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 2, span: 20}}
                                   name="password"
                                   rules={[
                                       {required: true, message: '请输入密码'},
                                       {min: 4, message: '密码至少4位'},
                                       {max: 12, message: '密码最长12位'},
                                       {pattern: /^[0-9a-zA-Z_]{1,}$/, message: '请勿输入非法字符'}
                                   ]}>
                            <Input.Password size="large" placeholder="密码" prefix={<LockOutlined/>}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 2, span: 20}}>
                            <Button size="large" block={true} type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );

}

export default Login;