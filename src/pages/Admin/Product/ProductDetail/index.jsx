import React from 'react';
import {Card, List} from "antd";
import {
    ArrowLeftOutlined
} from '@ant-design/icons'
import './index.less'
import Item from "antd/es/list/Item";
import {Link, useLocation} from "react-router-dom";

function Detail(props) {

    const {state:{detail}} = useLocation()
    console.log(detail)

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
                            商品名称:<span className='right'>联想ThinkPad 翼4809</span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品描述:<span className='right'>英特尔酷睿i5 14英寸轻薄笔记本电脑（i5-8250U 8G 256GSSD FHD）黑色</span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品价格:<span className='right'>9999￥</span>
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
                            <img className='img' src="https://img1.baidu.com/it/u=1509154669,936827063&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=427" alt=""/>
                            <img className='img' src="https://img1.baidu.com/it/u=1509154669,936827063&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=427" alt=""/>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品详情:
                            <span
                                className='right'
                                dangerouslySetInnerHTML={{__html:'<p><span style=\\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\\">99999</span></p>'}}></span>
                        </span>
                    </Item>
                </List>
            </Card>
        </div>
    );
}

export default Detail;