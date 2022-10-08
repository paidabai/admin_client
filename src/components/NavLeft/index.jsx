import React, {useCallback, useEffect, useState} from 'react';
import logo from './images/login-logo.png'
// import {
//     BarChartOutlined,
//     UserOutlined,
//     ShoppingOutlined,
//     SolutionOutlined,
//     HomeOutlined,
//     MenuUnfoldOutlined,
//     TagsOutlined,
//     DotChartOutlined,
//     LineChartOutlined,
//     PieChartOutlined
// } from '@ant-design/icons';
import { Menu } from 'antd';
import './index.less'
import {NavLink, useLocation} from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import {menuList} from "../../config/menuConfig";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

// const items = [
//     getItem(<NavLink to='home'>首页</NavLink>, '/home', <HomeOutlined />),
//     getItem('商品', '/products', <ShoppingOutlined />, [
//         getItem(<NavLink to='category'>品类管理</NavLink>, '/category', <MenuUnfoldOutlined />),
//         getItem(<NavLink to='product'>商品管理</NavLink>, '/product', <TagsOutlined />),
//     ]),
//     getItem(<NavLink to='user'>用户管理</NavLink>, '/user', <UserOutlined />),
//     getItem(<NavLink to='role'>角色管理</NavLink>, '/role', <SolutionOutlined />),
//     getItem('图形图表', '/charts', <DotChartOutlined />, [
//         getItem(<NavLink to='/charts/bar'>柱形图</NavLink>, '/charts/bar', <BarChartOutlined />),
//         getItem(<NavLink to='/charts/line'>折线图</NavLink>, '/charts/line', <LineChartOutlined />),
//         getItem(<NavLink to='/charts/pie'>饼图</NavLink>, '/charts/pie', <PieChartOutlined />)
//     ]),
// ];


function NavLeft(props) {
    // const [menuSet, setMenuSet] = useState([])
    const [item, setItem] = useState([])
    const user = memoryUtils.user
    // 使用location hook
    const location = useLocation()
    const path = location.pathname
    let index = path.indexOf('/')
    index = path.indexOf('/',index + 1)
    let newPath = index > 0 ? path.substring(0,index) : location.pathname
    if (newPath === '/charts') {
        newPath = location.pathname
    }
    // 获取
    let menuSet = new Set(user.role.menus || [])
    // 判断用户是否有权限
    const hasAuth = useCallback((item) => {
        const key = item.key
        /*
            1. 如果菜单项标识为公开
            2. 如果当前用户是 admin
            3. 如果菜单项的 key 在用户的 menus 中
        */
        if(item.isPublic || memoryUtils.user.username==='admin' || menuSet.has(key)) {
            return true
            // 4. 如果有子节点, 需要判断有没有一个 child 的 key 在 menus 中
        } else if(item.children) {
            return !!item.children.find(child => menuSet.has(child.key))
        }
    },[menuSet])

    const getMenuNodes = useCallback((list) => {
        return list.reduce((pre, item) => {
            if (hasAuth(item)) {
                const icon = item.icon
                if (!item.children) {
                    pre.push((
                        getItem(<NavLink to={item.key}>{item.title}</NavLink>, `${item.key}`, icon)
                    ))
                } else {
                    pre.push((
                        getItem(`${item.title}`, `${item.key}`, icon,
                            getMenuNodes(item.children)
                        )
                    ))
                }
            }
            return pre
        }, [])
    },[hasAuth])

    useEffect(() => {
        setItem(getMenuNodes(menuList))
    },[getMenuNodes])

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
                        defaultOpenKeys = {['/products','/charts']}
                        mode="inline"
                        theme="dark"
                        items={item}
                        style={{ height:800 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default NavLeft;