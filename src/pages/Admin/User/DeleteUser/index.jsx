import React, {useEffect} from 'react';
import {Form, Input} from "antd";


function DeleteUser(props) {
    const [form] = Form.useForm()

    const {user} = props


    useEffect(() => {
        form.setFieldsValue(user)
    },[form, user])


    return (
        <Form form={form}>
            <p>确定要删除该用户吗？</p>
            <Form.Item
                       name='username'
            >
                <Input disabled={true}/>
            </Form.Item>
        </Form>
    );
}

export default DeleteUser;