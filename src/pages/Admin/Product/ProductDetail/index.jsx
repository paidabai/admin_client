import React, {useState} from 'react';
import {Card, List} from "antd";
import {
    ArrowLeftOutlined
} from '@ant-design/icons'
import './index.less'
import Item from "antd/es/list/Item";
import {Link, useLocation} from "react-router-dom";
import {reqCategoryOne} from "../../../../api";

function Detail(props) {
    // 商品一级分类
    const [cName1, setCName1] = useState('')
    // 商品二级分类
    const [cName2, setCName2] = useState('')

    // 获取商品信息
    const {state:{detail, name, desc, price, imgs, pCategoryId, categoryId}} = useLocation()
    const BASE_IMG_URL = 'http://www.paidab.love:5000/upload/'

    if (pCategoryId === '0') {
        reqCategoryOne(pCategoryId).then((response) => {
            const info = response.data
            setCName1(info.data.name)
        })
    } else {
        reqCategoryOne(pCategoryId).then((response) => {
            const info = response.data
            setCName1(info.data.name)
        })
        reqCategoryOne(categoryId).then((response) => {
            const info = response.data
            setCName2(info.data.name)
        })
    }

    const title = (
        <span>
            <Link to='/product'><ArrowLeftOutlined className='icon'/></Link>
            <span className='headerName'>商品详情</span>
        </span>
    )

    return (
        <div className='detail'>
            <Card title={title}>
                <List>
                    <Item>
                        <span className='left'>
                            商品名称:<span className='right'>{name}</span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品描述:<span className='right'>{desc}</span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品价格:<span className='right'>￥{price}元</span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            所属分类:<span className='right'>
                                        {cName1} {cName2 ? '--> ' + cName2 : ''}
                                    </span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品图片:
                            {
                                imgs.map(img =>(
                                    <img
                                        key={img}
                                        className='img'
                                        src={BASE_IMG_URL + img}
                                        alt="img"/>
                                ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品详情:
                            <span
                                className='right'
                                dangerouslySetInnerHTML={{__html:`${detail}`}}></span>
                        </span>
                    </Item>
                </List>
            </Card>
        </div>
    );
}

export default Detail;