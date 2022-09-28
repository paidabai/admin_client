import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, Input, message, Modal, Select, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {reqDeleteProduct, reqProducts, reqSearchProducts, reqUpdateStatus} from "../../../../api";
import {useNavigate} from "react-router-dom";
import {PAGE_SIZE} from '../../../../utils/constants'


function Home(props) {
    // 商品列表
    const [products, setProducts] = useState([])
    // 商品总数
    const [total, setTotal] = useState(0)
    // 当前页数
    const [pageNum, setPageNum] = useState(1)
    // 加载动画状态
    const [loading, setLoading] = useState(true)
    // 搜索类型
    const [searchType, setSearchType] = useState('productName')
    // 搜索内容
    const [searchName, setSearchName] = useState('')
    // 删除商品对话框状态
    const [open, setOpen] = useState(false);
    // 加载动画的状态
    const [confirmLoading, setConfirmLoading] = useState(false);
    // 对话框提示的文字
    const [modalText, setModalText] = useState('');
    // 删除商品的name
    const [deleteProductName, setDeleteProductName] = useState('')

    const Navigate = useNavigate()

    // 页面加载时获取商品列表
    const getProducts = useCallback(() => {
        if (!searchName){
            reqProducts(pageNum, PAGE_SIZE).then((response) => {
                const products = response.data
                const { list, total } = products.data
                if (products.status === 0){
                    setLoading(false)
                    setProducts(list)
                    setTotal(total)
                } else {
                    message.error('商品列表加载失败')
                }
            }).catch((error) => {
                message.error('请求出错' + error.message)
            })
        }
    },[pageNum, searchName])

    // 点击搜索时获取的商品
    const getSearchProducts = (pageNum) => {
        // 点击搜索后pageNum的默认值设置为1
        pageNum = pageNum || 1
        reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchType,searchName}).then((response) => {
            const products = response.data
            const { list, total } = products.data
            if (products.status === 0){
                setLoading(false)
                setProducts(list)
                setTotal(total)
            } else {
                message.error('商品查询失败')
            }
        }).catch((error) => {
            message.error('请求失败' + error.message)
        })
    }

    useEffect(() => {
        getProducts()
    },[getProducts])

    // 修改商品的状态
    const updateProductStatus = (status, productId) => {
        reqUpdateStatus({productId, status}).then((response) => {
            const data = response.data
            if (data.status === 0) {
                // 修改动画加载状态
                setLoading(true)
                getProducts()
                message.success('商品更新成功')
            }else {
                message.error('商品更新失败')
            }
        })
    }

    const showModal = (products) => {
        setDeleteProductName(products.name)
        setOpen(true);
        setModalText('确定删除该商品吗？');
    };

    const handleOk = () => {
        setConfirmLoading(true);
        reqDeleteProduct(deleteProductName).then((response) => {
            const result = response.data
            if (result.status === 0) {
                setTimeout(() => {
                    setOpen(false);
                    setConfirmLoading(false);
                    message.success('删除成功')
                    getProducts()
                }, 1000);
            } else {
                message.error('删除失败')
            }
        })
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const extra = (
        <Button className='btn' type="primary" size='large' onClick={ () => Navigate('update') }>
            <PlusOutlined/>
            添加商品
        </Button>
    )
    const title = (
        <span>
            <Select
                defaultValue="按名称搜索"
                style={{
                    width: 140,
                }}
                onChange={value => setSearchType(value)}
            >
                <Select.Option value="productName">按名称搜索</Select.Option>
                <Select.Option value="productDesc">按描述搜索</Select.Option>
            </Select>
            <Input placeholder="输入商品" style={{width: 160,marginLeft:10}} value={searchName} onChange={event => setSearchName(event.target.value)}/>
            <Button type='primary' style={{width: 60,marginLeft:10}} onClick={() => getSearchProducts()}>搜索</Button>
        </span>
    )

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (price) => '￥' + price
        },
        {
            width: 80,
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status, _id) => (
                <span>
                    <Button onClick={ () => updateProductStatus(status === 1 ? 2 : 1, _id) } type="primary">{status === 1 ? '下架' : '上架'}</Button>
                    <span>{status === 1 ? '在售' : '已下架'}</span>
                </span>
            )
        },
        {
            width: 100,
            title: '操作',
            render: (products) => (
                 <span>
                    <Button type="link" onClick={() => Navigate('detail',{replace: false,state: products})}>详情</Button>
                    <Button type='link' onClick={() => Navigate('update',{replace: false,state: products})}>修改</Button>
                    <Button type='link' onClick={() => {showModal(products)}}>删除</Button>
                     <Modal
                         title="删除商品"
                         visible={open}
                         onOk={() => handleOk(products)}
                         confirmLoading={confirmLoading}
                         onCancel={handleCancel}
                         okText='确定'
                         cancelText='取消'
                     >
                        <p>{modalText}</p>
                    </Modal>
                </span>
            )
        },
    ];
    return (
        <div>
            <Card title={title}
                  extra={extra}
                  style={{width: '100%'}}>
                <Table bordered
                       loading={loading}
                       columns={columns}
                       dataSource={products}
                       rowKey='_id'
                       size={'small'}
                       pagination={{total,
                                    defaultPageSize: PAGE_SIZE,
                                    onChange: (pageNue) => {
                                            setPageNum(pageNue)
                                            // 页数改变时调用getSearchProducts函数传给页数值
                                            getSearchProducts(pageNue)
                                            // 改变页数时改变加载动画的状态
                                            setLoading(true)
                                            }
                       }}/>
            </Card>
        </div>
    );
}

export default Home;