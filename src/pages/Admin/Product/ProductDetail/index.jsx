import React from 'react';
import {Card, List} from "antd";
import {
    ArrowLeftOutlined
} from '@ant-design/icons'
import './index.less'
import Item from "antd/es/list/Item";
import {Link, useLocation} from "react-router-dom";

function Detail(props) {

    const {state:{detail, name, desc, price, imgs}} = useLocation()
    const BASE_IMG_URL = 'http://localhost:3000/upload/'

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
                            所属分类:<span className='right'>电脑-->笔记本</span>
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