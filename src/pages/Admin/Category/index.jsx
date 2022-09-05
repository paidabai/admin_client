import React, {useCallback, useEffect, useState} from 'react';
import {
    Button,
    Card,
    Modal,
    Select,
    Form,
    Input,
    Table,
    message
} from "antd";
import {ArrowRightOutlined, PlusOutlined} from "@ant-design/icons";
import {reqCategory} from "../../../api";


function Category(props) {

    const [isModalVisible, setIsModalVisible] = useState(false)
    //一级分类列表
    const [category, setCategory] = useState([])
    //二级分类列表
    const [subCategory, setSubCategory] = useState([])
    //需要展示列表的父分类id
    const [parentId, setParentId] = useState('0')
    //需要展示列表的父分类名称
    const [parentName, setParentName] = useState('')
    //加载
    const [loading, setLoading] = useState(true)

    const columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            width: 300,
            dataIndex: '',
            render: (category) => (
                <span>
                    <Button type="link">修改分类</Button>
                    {parentId === '0' ? <Button type="link" onClick={() => {showSubCategory(category)}}>查看子分类</Button> : ''}
                </span>
            )

        },
    ];

    // 获取一级或二级列表
    const getCategory = useCallback(() => {
        reqCategory(parentId).then((response) => {
            const category = response.data
            if (category.status === 0){
                setLoading(false)
                if (parentId === '0'){
                    setCategory(category.data)
                }
                else {
                    setSubCategory(category.data)
                }
            }else {
                message.error('分类列表加载失败')
            }
        }).catch((error) => {
            message.error('请求出错' + error.message)
        })
    },[parentId])

    // 点击查看二级列表 改变状态
    const showSubCategory = (category) => {
        setParentId(category._id)
        setParentName(category.name)
    }

    // 返回一级列表
    const showCategory = () => {
        setParentId('0')
        setParentName('')
        setSubCategory([])
    }

    useEffect(() => {
        getCategory()
    },[getCategory,parentId])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    // 表格头部文字
    const tableTitle = parentId === '0' ? '一级分类列表' :
    (<span>
        <Button type='link' onClick={showCategory}>一级分类列表</Button>
        <ArrowRightOutlined  style={{marginRight: 15}}/>
        <span>{parentName}</span>
    </span>)

    return (
        <div>
            <Card title={tableTitle} extra={
                <Button className='btn' type="primary" size='large' onClick={showModal}><PlusOutlined />添加</Button>}
                style={{ width: '100%' }
            }>
                <Modal title="添加分类" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} keyboard={true} cancelText='取消' okText='添加'>
                    <Form.Item>
                        <p>所属分类:</p>
                        <Select>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                        <br/>
                        <br/>
                        <p>分类名称:</p>
                        <Input />
                    </Form.Item>
                </Modal>

                <Table bordered columns={columns} dataSource={parentId === '0' ? category : subCategory} loading={loading} rowKey='_id'/>
            </Card>
        </div>
    );
}

export default Category;