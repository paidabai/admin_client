import React, {useCallback, useEffect, useState} from 'react';
import {
    Button,
    Card,
    Modal,
    Table,
    message,
    Form
} from "antd";
import {ArrowRightOutlined, PlusOutlined} from "@ant-design/icons";
import {reqAddCategory, reqCategory, reqUpDateCategory, reqDeleteCategory} from "../../../api";
import AddForm from "./AddForm";
import ModifyForm from "./ModifyForm";
import DeleteForm from "./DeleteForm";


function Category(props) {
    //添加
    const [isAddVisible, setIsAddVisible] = useState(false)
    //修改
    const [isModifyVisible, setIsModifyVisible] = useState(false)
    //删除
    const [isDeleteVisible, setIsDeleteVisible] = useState(false)
    //一/二级分类列表
    const [category, setCategory] = useState([])
    //一/二级分类列表的名称
    const [categoryName, setCategoryName] = useState('')
    //一级分类列表的id
    const [categoryId, setCategoryId] = useState()
    //二级分类列表
    const [subCategory, setSubCategory] = useState([])
    //需要展示列表的父分类id
    const [parentId, setParentId] = useState('0')
    //需要展示列表的父分类名称
    const [parentName, setParentName] = useState('')
    //加载
    const [loading, setLoading] = useState(true)
    let [modifyForm] = Form.useForm()
    let [addForm] = Form.useForm()

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
                    <Button type="link" onClick={() => {showModify(category)}} size={"small"}>修改分类</Button>
                    <Button type="link" onClick={() => {showDeleteModify(category)}} size={"small"}>删除分类</Button>
                    {parentId === '0' ? <Button size={"small"} type="link" onClick={() => {showSubCategory(category)}}>查看子分类</Button> : ''}
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
        setCategoryName(category.name)
    }

    // 返回一级列表
    const showCategory = () => {
        setParentId('0')
        setParentName('')
        setSubCategory([])
    }

    useEffect(() => {
        getCategory()
    },[getCategory, parentId])

    // 修改框
    const showModify = (category) => {
        setCategoryName(category.name)
        setCategoryId(category._id)
        setIsModifyVisible(true)
    };

    //删除框
    const showDeleteModify = (category) => {
        setCategoryName(category.name)
        setCategoryId(category._id)
        setIsDeleteVisible(true)
    }

    const deleteOk = () => {
        reqDeleteCategory({categoryName}).then((response) => {
            if (response.data.status === 0){
                getCategory()
                message.success('删除成功')
            }else {
                message.error('删除失败')
            }
        }).catch((error) => {
            message.error('请求出错',error)
        })
        setIsDeleteVisible(false);
    }

    const deleteCancel = () => {
        setIsDeleteVisible(false)
    }

    // 更新分类
    const modifyOk = () => {
        const categoryName = modifyForm.getFieldsValue().categoryName
        modifyForm.validateFields().then(() => {
            reqUpDateCategory({categoryId, categoryName}).then((response) => {
                if (response.data.status === 0){
                    getCategory()
                    message.success('修改成功')
                }else {
                    message.error('修改失败')
                }
            }).catch((error) => {
                message.error("请求出错",error)
            })
            setIsModifyVisible(false);
        })
    }

    const modifyCancel = () => {
        setIsModifyVisible(false);
    }

    // 添加页面
    const showAdd = () => {
        setIsAddVisible(true);
    };

    // 添加分类
    const addOk = () => {
        const categoryName = addForm.getFieldsValue().categoryName
        addForm.validateFields().then(() => {
            reqAddCategory({parentId, categoryName}).then((response) => {
                if (response.data.status === 0){
                    getCategory()
                    message.success('添加成功')
                }else {
                    message.error('添加失败')
                }
            }).catch((error) => {
                message.error('请求出错',error)
            })
            setIsAddVisible(false);
        })
    }

    const addCancel = () => {
        setIsAddVisible(false);
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
                <Button className='btn' type="primary" size='large' onClick={showAdd}><PlusOutlined />添加</Button>}
                style={{ width: '100%' }
            }>
                <Table bordered columns={columns} dataSource={parentId === '0' ? category : subCategory} loading={loading} rowKey='_id' size={'small'}/>
                <Modal title="修改分类" visible={isModifyVisible} onOk={modifyOk} onCancel={modifyCancel} keyboard={true} cancelText='取消' okText='修改' destroyOnClose={true}>
                    <ModifyForm
                        categoryName={categoryName}
                        setModifyForm={(form) => {modifyForm = form}}
                    />
                </Modal>
                <Modal title="删除分类" visible={isDeleteVisible} onOk={deleteOk} onCancel={deleteCancel} keyboard={true} cancelText='取消' okText='删除' destroyOnClose={true}>
                    <DeleteForm categoryName={categoryName}/>
                </Modal>
                <Modal title="添加分类" visible={isAddVisible} onOk={addOk} onCancel={addCancel} keyboard={true} cancelText='取消' okText='添加' destroyOnClose={true}>
                    <AddForm
                        categoryName={categoryName}
                        parentId={parentId}
                        setAddForm={(form) => {addForm = form}}
                    />
                </Modal>
            </Card>
        </div>
    );
}

export default Category;