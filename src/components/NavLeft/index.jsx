import React from 'react';
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
import {NavLink, useLocation} from "react-router-dom";

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
    getItem(<NavLink to='home'>首页</NavLink>, '/home', <HomeOutlined />),
    getItem('商品', 'sub1', <ShoppingOutlined />, [
        getItem(<NavLink to='commodity/category'>品类管理</NavLink>, '/commodity/category', <MenuUnfoldOutlined />),
        getItem(<NavLink to='commodity/product'>商品管理</NavLink>, '/commodity/product', <TagsOutlined />),
    ]),
    getItem(<NavLink to='user'>用户管理</NavLink>, '/user', <UserOutlined />),
    getItem(<NavLink to='role'>角色管理</NavLink>, '/role', <SolutionOutlined />),
    getItem('图形图表', 'sub2', <DotChartOutlined />, [
        getItem(<NavLink to='charts/bar'>柱形图</NavLink>, '/charts/bar', <BarChartOutlined />),
        getItem(<NavLink to='charts/line'>折线图</NavLink>, '/charts/line', <LineChartOutlined />),
        getItem(<NavLink to='charts/pie'>饼图</NavLink>, '/charts/pie', <PieChartOutlined />)
    ]),
];


function NavLeft(props) {

    const location = useLocation()
    const path = location.pathname

    return (
        <div className='nav-left'>
            <div className='nav-left-header'>
                <img src={logo} alt="logo"/>
                <h2>管理后台</h2>
            </div>
            <div>
                <div>
                    <Menu
                        selectedKeys = {[`${path}`]}
                        defaultOpenKeys = {['sub1','sub2']}
                        mode="inline"
                        theme="dark"
                        items={items}
                    />
                </div>
            </div>
        </div>
    );
}

export default NavLeft;