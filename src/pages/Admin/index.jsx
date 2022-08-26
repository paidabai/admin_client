import React, {Component} from 'react';
import { Layout } from 'antd';
import NavLeft from "../../components/NavLeft";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Category from "./Category";
import Product from "./Product";
import Role from "./Role";
import User from "./User";
import Bar from "./Bar";
import Line from "./Line";
import Pie from "./Pie";

const { Content, Sider } = Layout;

class Admin extends Component {
    render() {
        return (
                <Layout style={{height: "100%"}}>
                    <Sider>
                        <NavLeft />
                    </Sider>
                    <Layout>
                        <Header />
                        <Content>
                            <Routes>
                                <Route path="/home" element={<Home />}/>
                                <Route path="/commodity/category" element={<Category />}/>
                                <Route path="/commodity/product" element={<Product />}/>
                                <Route path="/role" element={<Role />}/>
                                <Route path="/user" element={<User />}/>
                                <Route path="/charts/bar" element={<Bar />}/>
                                <Route path="/charts/line" element={<Line />}/>
                                <Route path="/charts/pie" element={<Pie />}/>
                                <Route path='/' element={<Navigate to='/home' />} />
                            </Routes>
                        </Content>
                        <Footer />
                    </Layout>
                </Layout>
        );
    }
}

export default Admin;