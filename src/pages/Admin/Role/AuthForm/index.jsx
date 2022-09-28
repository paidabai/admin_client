import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Form, Input, Tree} from "antd";
import {treeList} from "../../../../config/menuConfig";

const AuthForm = forwardRef((props,ref) => {
    const [form] = Form.useForm()
    const {role:{name, menus}} = props

    useEffect(() => {
        form.resetFields()
    },[form,props.role])

    // 角色选中的权限
    const [checkedKeys, setCheckedKeys] = useState()
    // 选中某个权限时的回调
    const onCheck = (checkedKeys, info) => {
        setCheckedKeys(checkedKeys)
    };

    // 更新选择的权限
    useEffect(() => {
        setCheckedKeys(menus)
    },[menus])
    const treeData = treeList;

    // 传给父元素的方法
    useImperativeHandle(ref, () => ({
        getMenus: () => {
            return checkedKeys
        }
    }))

    return (
        <Form
            form={form}
        >
            <Form.Item name='name'
                       initialValue={name}
                       label="角色名称:"
                      >
                <Input disabled/>
            </Form.Item>
            <Tree
                checkedKeys={checkedKeys}
                defaultExpandAll={true}
                checkable
                onCheck={onCheck}
                treeData={treeData}
            />
        </Form>
    );
})

export default AuthForm;