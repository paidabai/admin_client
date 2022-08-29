import Login from "../pages/Login";
import Admin from "../pages/Admin";
import {Navigate} from "react-router-dom";
import Home from "../pages/Admin/Home";
import Pie from "../pages/Admin/Pie";
import Line from "../pages/Admin/Line";
import Bar from "../pages/Admin/Bar";
import User from "../pages/Admin/User";
import Role from "../pages/Admin/Role";
import Product from "../pages/Admin/Product";
import Category from "../pages/Admin/Category";

const indexRouter = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Admin />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'commodity/category',
                element: <Category />
            },
            {
                path: 'commodity/product',
                element: <Product />
            },
            {
                path: 'user',
                element: <User />
            },
            {
                path: 'role',
                element: <Role />
            },
            {
                path: 'charts/bar',
                element: <Bar />
            },
            {
                path: 'charts/line',
                element: <Line />
            },
            {
                path: 'charts/pie',
                element: <Pie />
            },{
                path: '/',
                //重定向
                element: <Navigate to='/home' />
            }
        ]
    },
    {
        path: '/',
        element: <Navigate to='/login' />
    }
]

export default indexRouter;