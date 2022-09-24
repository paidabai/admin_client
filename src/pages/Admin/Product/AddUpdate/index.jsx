import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, Cascader, Form, Input} from "antd";
import {Link, useLocation} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";
import './index.less'
import {reqCategory} from "../../../../api";

const optionLists = [];

function AddUpdate(props) {
    // 商品分类列表
    const [options, setOptions] = useState(optionLists);
    // 判断修改和添加
    const isUpdate = !!useLocation().state
    // 保存商品信息
    const product = useLocation().state || {}
    // 存储分类id的数组
    const info = []
    // 获取分类id
    const {pCategoryId, categoryId} = product
    if (isUpdate) {
        if (pCategoryId === '0'){
        info.push(pCategoryId)
        } else {
            info.push(pCategoryId)
            info.push(categoryId)
        }
    }
    // 页面头部
    const title = (
        <span>
            <Link to='/product'><ArrowLeftOutlined className='icon'/></Link>
            <span className='headerName'>{isUpdate ? '修改商品' : '添加商品'}</span>
        </span>
    )

    const layout = {
        labelCol: { span: 2 }, //左侧label的宽度
        wrapperCol: { span: 8 }, //右侧input的宽度
    };

    // 根据category生成optionLists
    const initOptions = useCallback((category) => {
        const options = category.map( c => ({
            value: c._id,
            label: c.name,
            isLeaf: false
        }))
        // 获取需要修改的商品的二级分类
        const targetOption = options.find(option => option.value === product.pCategoryId)
        if (isUpdate && targetOption.value !== '0'){
            reqCategory(targetOption.value).then((response) => {
                const subCategory = response.data
                const childOptions = subCategory.data.map(c => ({
                    value: c._id,
                    label: c.name,
                    isLeaf: false
                }))
                console.log(childOptions)
                targetOption.children = childOptions
            })
        }
        setOptions([...options])
    },[isUpdate, product.pCategoryId, product.parentId])

    // 获取分类列表
    const getCategory = useCallback((parentId) => {
        reqCategory(parentId).then((response) => {
            const result = response.data
            if (result.status === 0){
                const category = result.data
                if (parentId === '0'){
                    initOptions(category)
                } else {
                    return category
                }

            }
        })
    },[initOptions])

    useEffect(() => {
        getCategory('0')
    },[getCategory])

    // 表单验证成功后请求
    const onFinish = (values) => {
        console.log(values);
    };

    // 加载下级分类的回调
    const loadData = (selectedOptions) => {
        // 得到选择的option
        const targetOption = selectedOptions[0];
        // 显示加载动画
        targetOption.loading = true;

        // 根据选中的分类获取二级分类
        reqCategory(targetOption.value).then((response) => {
            console.log(targetOption.value)
            const subCategory = response.data
            targetOption.loading = false;
            // 获取到二级分类
            if (subCategory.data && subCategory.data.length > 0){
                // 遍历二级分类
                const childOptions = subCategory.data.map(c => ({
                    value: c._id,
                    label: c.name,
                    isLeaf: true
                }))
                targetOption.children = childOptions
                setOptions([...options]);
            } else {
                // 没有二级分类,选中的分类就没有下一项
                targetOption.isLeaf = true
                targetOption.loading = false;
                setOptions([...options]);
            }
        })

    };


    return (
        <div className='addProduct'>
            <Card title={title}>
                <Form
                    {...layout}
                    onFinish={onFinish}
                >
                    <Form.Item
                        initialValue= {product.name}
                        name="name"
                        label="商品名称"
                        rules={
                        [
                            { required: true, message: '请输入商品名称!'},
                            { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '请勿输入非法字符'}
                        ]
                    }>
                        <Input value='23' />
                    </Form.Item>
                    <Form.Item
                        initialValue= {product.desc}
                        name="desc"
                        label="商品描述"
                        rules={[{ required: true, message: '请输入商品描述!'}]}>
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item
                        initialValue= {product.price}
                        name="price"
                        label="商品价格"
                        rules={
                        [
                            { required: true, message: '请输入商品价格!'},
                            { pattern: /^[1-9]*[1-9][0-9]*$/, message: '价格不能低于0元!' }
                        ]
                    }>
                        <Input prefix="￥" suffix="RMB" />
                    </Form.Item>
                    <Form.Item
                        initialValue={info}
                        name="info"
                        label="商品分类"
                        rules={[{ required: true, message: '请选择商品分类!'}]}>
                        <Cascader
                            options={options} // 加载一级分类的列表
                            loadData={loadData} // 加载下级分类列表的回调
                             />
                    </Form.Item>
                    <Form.Item
                        name="imgs"
                        label="商品图片"
                        >
                        <Cascader
                            options={options}
                            expandTrigger="hover"
                        />
                    </Form.Item>
                    <Form.Item
                        name="detail"
                        label="商品详情"
                        >
                        <Cascader
                            options={options}
                            changeOnSelect
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' >提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default AddUpdate;