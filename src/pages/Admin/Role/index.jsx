import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Form, message, Modal, Space, Table} from "antd";
import {PAGE_SIZE} from "../../../utils/constants";
import {reqAddRole, reqRolesList, reqUpdateRole} from "../../../api";
import AddRole from "./AddRole";
import AuthForm from "./AuthForm";
import memoryUtils from "../../../utils/memoryUtils";
import {formatDate} from "../../../utils/dateUtils";

function Role(props) {
    // 角色列表
    const [roles, setRoles] = useState([])
    // 加载动画状态
    const [loading, setLoading] = useState(true)
    // 选择的角色的id
    const [roleId, setRoleId] = useState('')
    // 选中的角色信息
    const [role, setRole] = useState([])
    // 添加角色的对话框状态
    const [open, setOpen] = useState(false);
    // 添加角色权限的对话框状态
    const [openAuth, setOpenAuth] = useState(false);
    // 创建form
    let AddForm = Form.useForm()
    // 使用ref
    const childrenRef = useRef();
    // 当前登录的用户/授权用户名
    const userName = memoryUtils.user.username

    // 打开创建角色对话框
    const showModal = () => {
            setOpen(true)
    }

    // 打开设置角色权限对话框
    const showAuthModal = () => {
        setOpenAuth(true)
    }

    // card的头部
    const title = (
        <Space size='large'>
            <Button type='primary' onClick={showModal}>创建角色</Button>
            <Button type='primary' disabled={!roleId} onClick={showAuthModal}>设置角色权限</Button>
        </Space>
    )

    // 点击添加角色确定后的回调
    const handleOk = () => {
        AddForm.validateFields().then((value) => {
            reqAddRole(value.name).then((response) => {
                const result = response.data
                if (result.status === 0) {
                    message.success('角色添加成功')
                    setOpen(false)
                    getRoles()
                    AddForm.resetFields()
                } else {
                    message.error('角色添加失败')
                }
            })
        }).catch((reason) => {
            console.log(reason)
        })
    }

    // 点击创建角色的取消，改变对话框状态
    const handleCancel = () => {
        setOpen(false)
        AddForm.resetFields()
    }

    // 点击设置角色权限的确定回调
    const handleAuthOk = () => {
        getUpdateRole()
        setOpenAuth(false)
    }

    // 点击设置角色权限的取消，改变对话框状态
    const handleAuthCancel = () => {
        setOpenAuth(false)
    }

    // 表格头部
    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            key: 'auth_time',
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
            key: 'auth_name',
        },
    ]

    // 获取角色列表
    const getRoles = () => {
        reqRolesList().then((response) => {
            const roles = response.data
            if (roles.status === 0) {
                setLoading(false)
                // 用于保存时间格式化后的新角色列表
                let newRoles = []
                // 遍历获取到的角色列表
                roles.data.map(c => {
                    // 把格式化后的时间重新赋值
                    c.create_time = formatDate(c.create_time)
                    c.auth_time = formatDate(c.auth_time)
                    // 把格式化后的每个对象添加到新的角色列表中
                    newRoles.push(c)
                    return 1
                })
                // 更新角色列表的状态
                setRoles(newRoles)
            } else {
                message.error('角色列表加载失败')
            }
        })
    }

    useEffect(() => {
        getRoles()
    },[])

    // 请求更新角色权限
    const getUpdateRole = () => {
        // 赋值最新选择的权限
        role.menus = childrenRef.current.getMenus()
        // 赋值当前登录/授权的用户
        role.auth_name = userName
        reqUpdateRole(role).then((response) => {
            const result = response.data
            if (result.status === 0) {
                message.success('角色权限授权成功')
                getRoles()
            }else {
                message.error('授权错误')
            }
        })
    }

    const select = (selectedRowKeys, selectedRows) => {
        setRoleId(selectedRows[0]._id)
        setRole(selectedRows[0])
    }

    const onRow = (roles) => {
        return {
            onClick: event => {
                setRoleId(roles._id)
                setRole(roles)
            }, // 点击行
        }
    }

    return (
        <Card title={title}>
            <Table bordered
                   loading={loading}
                   columns={columns}
                   dataSource={roles}
                   rowKey='_id'
                   rowSelection={{
                       type: "radio",
                       onChange: select,
                       selectedRowKeys: [roleId]
                    }}
                   pagination={{
                       defaultPageSize: PAGE_SIZE
                    }}
                   onRow={onRow}
            />
            <Modal
                title="创建角色"
                visible={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='确定'
                cancelText='取消'
                mask={false}
            >
                <AddRole setAddForm={(form) => {AddForm = form}}/>
            </Modal>
            <Modal
                title="设置角色权限"
                visible={openAuth}
                onOk={handleAuthOk}
                onCancel={handleAuthCancel}
                okText='确定'
                cancelText='取消'
                mask={false}
            >
                <AuthForm
                    setAddForm={(form) => {AddForm = form}}
                    role={role}
                    ref={childrenRef}
                />
            </Modal>
        </Card>
    );
}

export default Role;