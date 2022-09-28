import React from 'react';
import {Form, Input} from "antd";

function DeleteForm(props) {
    const [form] = Form.useForm()
    const { role:{name} } = props

    return (
        <Form form={form}>
            <p>确定要删除该角色吗？</p>
            <Form.Item initialValue={name}
                       name='categoryName'
            >
                <Input disabled={true}/>
            </Form.Item>
        </Form>
    );
}

export default DeleteForm;