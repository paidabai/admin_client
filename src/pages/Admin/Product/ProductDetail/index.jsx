import React from 'react';
import {Card, List} from "antd";
import {
    ArrowLeftOutlined
} from '@ant-design/icons'
import './index.less'
import Item from "antd/es/list/Item";

function Detail(props) {

    const title = (
        <span>
            <ArrowLeftOutlined className='icon'/>
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
                            商品名称:<span className='right'>联想ThinkPad 翼4809</span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品名称:<span className='right'>联想ThinkPad 翼4809</span>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>
                            商品名称:<span className='right'>联想ThinkPad 翼4809</span>
                        </span>
                    </Item>
                </List>
            </Card>
        </div>
    );
}

export default Detail;