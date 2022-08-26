import React, {Component} from 'react';
import logo from './images/login-logo.png'
import {
    BarChartOutlined,
    UserOutlined,
    ShoppingOutlined,
    SolutionOutlined,
    HomeOutlined,
    MenuUnfoldOutlined,
    TagsOutlined,
    DotChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import './index.less'

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('首页', '1', <HomeOutlined />),
    getItem('商品', 'sub1', <ShoppingOutlined />, [
        getItem('品类管理', '2', <MenuUnfoldOutlined />),
        getItem('商品管理', '3', <TagsOutlined />),
    ]),
    getItem('用户管理', '4', <UserOutlined />),
    getItem('角色管理', '5', <SolutionOutlined />),
    getItem('图形图表', 'sub2', <DotChartOutlined />, [
        getItem('柱形图', '6', <BarChartOutlined />),
        getItem('折线图', '7', <LineChartOutlined />),
        getItem('饼图', '8', <PieChartOutlined />)
    ]),
];



class NavLeft extends Component {
    render() {
        return (
            <div className='nav-left'>
                <div className='nav-left-header'>
                    <img src={logo} alt="logo"/>
                    <h2>管理后台</h2>
                </div>
                <div>
                    <div>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            items={items}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default NavLeft;