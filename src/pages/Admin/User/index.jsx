import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Form, message, Modal, Space, Table} from "antd";
import {PAGE_SIZE} from "../../../utils/constants";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import {reqAddUser, reqDeleteUser, reqUsers} from "../../../api";
import {formatDate} from "../../../utils/dateUtils";

function User(props) {
    // 加载动画状态
    const [loading, setLoading] = useState(true)
    // 用户列表
    const [users, setUsers] = useState([])
    // 角色列表
    const [roles, setRoles] = useState([])
    // 当前选的用户
    const [user, setUser] = useState('')
    // 创建用户对话框状态
    const [openCreate, setOpenCreate] = useState(false)
    // 修改用户对话框状态
    const [openUpdate, setOpenUpdate] = useState(false)
    // 删除用户对话框状态
    const [openDelete, setOpenDelete] = useState(false)
    // ref
    const childrenRef = useRef();
    // form
    let [creatUserForm] = Form.useForm()
    let [updateForm] = Form.useForm()

    // card的头部
    const title = (
        <Space size='large'>
            <Button type='primary' onClick={() => {showCreate()}}>创建用户</Button>
        </Space>
    )

    // 标题
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            key: 'create_time',
            render: formatDate
        },
        {
            title: '所属角色',
            dataIndex: 'role_id',
            key: 'role_id',
            render: (role_id) => roles.find(role => role._id === role_id).name
        },
        {
            title: '操作',
            render: (users) => (
                <span>
                    <Button type="link" size="small" onClick={() => {showUpdate(users)}}>修改</Button>
                    <Button type="link" size="small" onClick={() => {showDelete(users)}}>删除</Button>
                </span>
            )
        },
    ]

    // 点击确认创建用户的回调
    const handleOk = () => {
        creatUserForm = childrenRef.current.setUpdateFrom()
        creatUserForm.validateFields().then(() => {
            reqAddUser(creatUserForm.getFieldsValue()).then((response) => {
                const result = response.data
                if (result.status === 0) {
                    message.success('添加成功')
                    setOpenCreate(false)
                    getUsers()
                } else {
                    message.error('添加失败')
                }
            })
        })

    }

    // 点击取消创建用户的回调
    const handleCancel = () => {
        setOpenCreate(false)
        childrenRef.current.setUpdateFrom().resetFields()
    }

    // 点击创建用户的对话框
    const showCreate = () => {
        setOpenCreate(true)
    }

    // 点击修改用户的对话框
    const showUpdate = (users) => {
        setUser(users)
        setOpenUpdate(true)
    }

    // 点击确认修改用户的回调
    const UpdateOk = () => {

    }

    // 点击取消修改用户的回调
    const UpdateCancel = () => {
        setOpenUpdate(false)
        updateForm.resetFields()
    }

    // 点击删除用户的对话框
    const showDelete = (users) => {
        setOpenDelete(true)
        setUser(users)
    }

    // 点击确认删除用户的回调
    const DeleteOk = () => {
        reqDeleteUser(user._id).then((response) => {
            const result = response.data
            if (result.status === 0) {
                message.success('删除成功')
                getUsers()
            } else {
                message.error('删除失败')
            }
        })
        setOpenDelete(false)
    }

    // 点击取消删除用户的回调
    const DeleteCancel = () => {
        setOpenDelete(false)
    }

    // 发送请求获取用户列表
    const getUsers = () => {
        reqUsers().then((response) => {
            const result = response.data
            if (result.status === 0){
                setUsers(result.data.users)
                setRoles(result.data.roles)
                setLoading(false)
            } else {
                setLoading(false)
                message.error('用户列表加载失败')
            }
        })
    }

    useEffect(() => {
        getUsers()
    },[])

    return (
        <div>
            <Card title={title}>
                <Table bordered
                       loading={loading}
                       columns={columns}
                       dataSource={users}
                       rowKey='_id'
                       pagination={{
                           defaultPageSize: PAGE_SIZE
                       }}
                />

                <Modal
                    title="创建用户"
                    visible={openCreate}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText='确定'
                    cancelText='取消'
                >
                    <CreateUser
                        roles={roles}
                        ref={childrenRef}
                    />
                </Modal>

                <Modal
                    title="修改用户"
                    visible={openUpdate}
                    onOk={UpdateOk}
                    onCancel={UpdateCancel}
                    okText='确定'
                    cancelText='取消'
                >
                    <UpdateUser
                        user={user}
                        roles={roles}
                        setUpateForm={form => updateForm = form}
                    />
                </Modal>

                <Modal
                    title="删除用户"
                    visible={openDelete}
                    onOk={DeleteOk}
                    onCancel={DeleteCancel}
                    okText='确定'
                    cancelText='取消'
                >
                    <DeleteUser user={user}/>
                </Modal>
            </Card>
        </div>
    );
}

export default User;