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
import {NavLink} from "react-router-dom";

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
    getItem(<NavLink to='home'>首页</NavLink>, '1', <HomeOutlined />),
    getItem('商品', 'sub1', <ShoppingOutlined />, [
        getItem(<NavLink to='commodity/category'>品类管理</NavLink>, '2', <MenuUnfoldOutlined />),
        getItem(<NavLink to='commodity/product'>商品管理</NavLink>, '3', <TagsOutlined />),
    ]),
    getItem(<NavLink to='user'>用户管理</NavLink>, '4', <UserOutlined />),
    getItem(<NavLink to='role'>角色管理</NavLink>, '5', <SolutionOutlined />),
    getItem('图形图表', 'sub2', <DotChartOutlined />, [
        getItem(<NavLink to='charts/bar'>柱形图</NavLink>, '6', <BarChartOutlined />),
        getItem(<NavLink to='charts/line'>折线图</NavLink>, '7', <LineChartOutlined />),
        getItem(<NavLink to='charts/pie'>饼图</NavLink>, '8', <PieChartOutlined />)
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