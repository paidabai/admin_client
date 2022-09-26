import React, {useEffect} from 'react';
import {Form, Input} from "antd";

function AddForm(props) {
    const [form] = Form.useForm()
    const {setAddForm ,parentId, categoryName} = props

    useEffect(() => {
            setAddForm(form)
        }
    ,[form, setAddForm])


    return (
        <Form form={form}>
            <p>所属分类:</p>
            <Form.Item name='newCategoryName'>
                    {parentId === '0' ?
                        <Input value="一级分类"  disabled={true}/> :
                        <Input value={categoryName} disabled={true}/>
                    }
            </Form.Item>
                <p>分类名称:</p>
            <Form.Item name='categoryName'
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

export default AddForm;