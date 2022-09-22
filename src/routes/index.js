import Login from "../pages/Login";
import Admin from "../pages/Admin";
import {Navigate} from "react-router-dom";
import Home from "../pages/Admin/Home";
import ProductHome from "../pages/Admin/Product/ProductHome"
import Pie from "../pages/Admin/Pie";
import Line from "../pages/Admin/Line";
import Bar from "../pages/Admin/Bar";
import User from "../pages/Admin/User";
import Role from "../pages/Admin/Role";
import Product from "../pages/Admin/Product";
import Category from "../pages/Admin/Category";
import ProductDetail from "../pages/Admin/Product/ProductDetail";
import AddUpdate from "../pages/Admin/Product/AddUpdate";


const indexRouter = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '',
        element: <Admin />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'category',
                element: <Category />
            },
            {
                path: 'product',
                element: <Product />,
                children:[
                    {
                        path: '',
                        element: <ProductHome />
                    },
                    {
                        path: 'detail',
                        element: <ProductDetail />
                    },
                    {
                        path: 'update',
                        element: <AddUpdate />
                    },
                    {
                        path: '/product/*',
                        element: <Navigate to='' />
                    }
                ]
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
                path: 'bar',
                element: <Bar />
            },
            {
                path: 'line',
                element: <Line />
            },
            {
                path: 'pie',
                element: <Pie />
            },
            {
                path: '/',
                element: <Navigate to='/home' />
            }
        ]
    },
    {
        path: '/*',
        element: <Navigate to='/login'/>
    },
]

export default indexRouter;