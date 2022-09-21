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
        getItem(<NavLink to='category'>品类管理</NavLink>, '/category', <MenuUnfoldOutlined />),
        getItem(<NavLink to='product'>商品管理</NavLink>, '/product', <TagsOutlined />),
    ]),
    getItem(<NavLink to='user'>用户管理</NavLink>, '/user', <UserOutlined />),
    getItem(<NavLink to='role'>角色管理</NavLink>, '/role', <SolutionOutlined />),
    getItem('图形图表', 'sub2', <DotChartOutlined />, [
        getItem(<NavLink to='bar'>柱形图</NavLink>, '/bar', <BarChartOutlined />),
        getItem(<NavLink to='line'>折线图</NavLink>, '/line', <LineChartOutlined />),
        getItem(<NavLink to='pie'>饼图</NavLink>, '/pie', <PieChartOutlined />)
    ]),
];


function NavLeft(props) {

    const location = useLocation()
    const path = location.pathname
    let index = path.indexOf('/')
    index = path.indexOf('/',index + 1)
    const newPath = path.substring(0,index)
    console.log(newPath)

    return (
        <div className='nav-left'>
            <div className='nav-left-header'>
                <img src={logo} alt="logo"/>
                <h2>管理后台</h2>
            </div>
            <div>
                <div>
                    <Menu
                        selectedKeys = {[`${newPath}`]}
                        defaultOpenKeys = {['sub1','sub2']}
                        mode="inline"
                        theme="dark"
                        items={items}
                        style={{ height:800 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default NavLeft;