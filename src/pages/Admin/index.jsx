import { Layout } from 'antd';
import NavLeft from "../../components/NavLeft";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Outlet} from "react-router-dom";
import './index.less'

const { Content, Sider } = Layout;

function Admin(props) {
    return (
        <Layout className='layout'>
            <Sider>
                <NavLeft />
            </Sider>
            <Layout>
                <Header />
                <Content className='content'>
                    <Outlet/>
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
}

export default Admin;