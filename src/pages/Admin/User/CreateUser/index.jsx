import React, {forwardRef, useImperativeHandle} from 'react';
import {Form, Input, Select} from "antd";

const CreateUser = forwardRef((props,ref) => {
    const [form] = Form.useForm()
    // 拥有的角色
    const {roles} = props
    // 布局
    const layout = {
        labelCol: { span: 5 }, //左侧label的宽度
        wrapperCol: { span: 18 }, //右侧input的宽度
    };

    useImperativeHandle(ref, () => ({
        // hello 就是暴露给父组件的方法
        setUpdateFrom:() => {
            return form
        }
    }))

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <Form
            {...layout}
            form={form}
        >
            <Form.Item name='username'
                       label="用户名:"
                       rules={[
                           {required: true, message: '请输入用户名' },
                           {
                               pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                               message: '请勿输入非法字符'
                           },
                           {
                               pattern: /^.{3,8}$/,
                               message: '用户名长度为3-8'
                           }
                       ]}>
                <Input placeholder='请输入用户名'/>
            </Form.Item>
            <Form.Item name='password'
                       label="密码:"
                       rules={[
                           {required: true, message: '请输入密码' },
                           {
                               pattern: /^.{6,12}$/,
                               message: '密码长度为6-12'
                           }
                       ]}>
                <Input placeholder='请输入密码' type='password'/>
            </Form.Item>
            <Form.Item name='phone'
                       label="手机号:"
                       rules={[
                           {required: true, message: '请输入手机号' },
                           {
                               pattern: /^1[3-9]\d{9}$/,
                               message: '请输入正确的手机号'
                           }
                       ]}>
                <Input placeholder='请输入手机号'/>
            </Form.Item>
            <Form.Item name='email'
                       label="邮箱:"
                       rules={[
                           {required: true, message: '请输入邮箱' },
                           {
                               pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                               message: '请输入正确的邮箱'
                           }
                       ]}>
                <Input placeholder='请输入邮箱'/>
            </Form.Item>
            <Form.Item name='role_id'
                       label="角色:"
                       rules={[
                           {required: true, message: '请选择角色' },
                       ]}>
                <Select onChange={handleChange}>
                    {
                        roles.map((role) => {
                            return <Select.Option key={role._id} value={role._id}>{role.name}</Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    );
})

export default CreateUser;