import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, Input, message, Select, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {reqProducts, reqSearchProducts} from "../../../../api";
import {Link, useNavigate} from "react-router-dom";


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

    //页数
    const PAGE_SIZE = 6
    // 使用history
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

    // 添加商品框
    const showAdd = () => {

    }

    const extra = (
        <Button className='btn' type="primary" size='large' onClick={showAdd}>
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
            render: (status) => (
                <span>
                    <Button type="primary">下架</Button>
                    {status ? <span>在售</span> : <span>已下架</span>}
                </span>
            )
        },
        {
            width: 100,
            title: '操作',
            render: (products) => (
                 <span>
                    <Button type="link" onClick={() => {Navigate('/product/detail', {replace: false,state: products})}}><Link to='/product/detail'>详情</Link></Button>
                    <Button type='link'>修改</Button>
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