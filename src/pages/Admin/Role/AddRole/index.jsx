import React, {useEffect} from 'react';
import {Form, Input} from "antd";

function AddRole(props) {
    const {setAddForm} = props
    const [form] = Form.useForm()
    useEffect(() => {
        setAddForm(form)
    },[form, setAddForm])

    return (
        <Form
            form={form}
        >
            <Form.Item name='name'
                       label="角色名称:"
                       rules={[
                           {required: true, message: '请输入角色名称' },
                           {
                               pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                               message: '请勿输入非法字符'
                           }
                       ]}>
                <Input placeholder='请输入角色名称'/>
            </Form.Item>
        </Form>
    );
}

export default AddRole;