import {
    BarChartOutlined,
    DotChartOutlined,
    HomeOutlined,
    LineChartOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    ShoppingOutlined,
    SolutionOutlined,
    TagsOutlined,
    UserOutlined
} from "@ant-design/icons";
import React from "react";

export const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: <HomeOutlined />,
        isPublic: true,
    },
    {
        title: '商品',
        key: '/products',
        icon: <ShoppingOutlined />,
        children: [
            {
                title: '品类管理',
                key: '/category',
                icon: <MenuUnfoldOutlined />,
            },
            {
                title: '商品管理',
                key: '/product',
                icon: <TagsOutlined />,
            },
        ],
    },
    {
        title: '用户管理',
        key: '/user',
        icon: <UserOutlined />,
    },
    {
        title: '角色管理',
        key: '/role',
        icon: <SolutionOutlined />,
    },
    {
        title: '图形图表',
        key: '/charts',
        icon: <DotChartOutlined />,
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: <BarChartOutlined />,
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: <LineChartOutlined />,
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: <PieChartOutlined />
            },
        ],
    },
];

export const treeList = [
    {
        title: '平台权限',
        key: 'all',
        children: [
            {
                title: '首页',
                key: '/home',
            },
            {
                title: '商品',
                key: '/products',
                children: [
                    {
                        title: '品类管理',
                        key: '/category',
                    },
                    {
                        title: '商品管理',
                        key: '/product',
                    },
                ],
            },
            {
                title: '用户管理',
                key: '/user',
            },
            {
                title: '角色管理',
                key: '/role',
            },
            {
                title: '图形图表',
                key: '/charts',
                children: [
                    {
                        title: '柱形图',
                        key: '/charts/bar',
                    },
                    {
                        title: '折线图',
                        key: '/charts/line',
                    },
                    {
                        title: '饼图',
                        key: '/charts/pie',
                    },
                ],
            },
        ]
    },

];