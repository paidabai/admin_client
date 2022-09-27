import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Form, Input, Tree} from "antd";
import {treeList} from "../../../../config/menuConfig";

const AuthForm = forwardRef((props,ref) => {
    const [form] = Form.useForm()
    const {role} = props
    // 角色选中的权限
    const [checkedKeys, setCheckedKeys] = useState()
    // 选中某个权限时的回调
    const onCheck = (checkedKeys, info) => {
        setCheckedKeys(checkedKeys)
    };

    useEffect(() => {
        setCheckedKeys(role.menus)
    },[role.menus])
    const treeData = treeList;

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
                       initialValue={role.name}
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