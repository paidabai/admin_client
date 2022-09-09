import React, {useEffect} from 'react';
import {Form, Input} from "antd";

function ModifyForm(props) {
    const [form] = Form.useForm();
    const {categoryName ,setModifyForm} = props

    useEffect(() => {
        setModifyForm(form)
    },[form, setModifyForm])

    return (
        <Form form={form}>
            <Form.Item initialValue={categoryName}
                       name='categoryName'
                       rules={[
                           {required: true, message: '请输入分类名称' },
                           {
                               pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                               message: '请勿输入非法字符'
                           }
                       ]}>
                <Input placeholder='请输入分类名称'/>
            </Form.Item>
        </Form>
    );
}

export default ModifyForm;