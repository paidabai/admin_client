import React from 'react';
import {Form, Input} from "antd";

function DeleteUser(props) {
    const [form] = Form.useForm()
    const {user:{username}} = props

    return (
        <Form form={form}>
            <p>确定要删除该用户吗？</p>
            <Form.Item initialValue={username}
                       name='categoryName'
            >
                <Input disabled={true}/>
            </Form.Item>
        </Form>
    );
}

export default DeleteUser;