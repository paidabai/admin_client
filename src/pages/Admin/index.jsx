import {Layout, notification} from 'antd';
import NavLeft from "../../components/NavLeft";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Outlet, useNavigate} from "react-router-dom";
import './index.less'
import memoryUtils from "../../utils/memoryUtils";
import {useEffect} from "react";

const { Content, Sider } = Layout;

function Admin(props) {
    const user = memoryUtils.user
    const navigate = useNavigate()
    useEffect(() => {
        if (!user || !user._id){
            navigate("/login");
            ((placement,duration) => {
                notification.info({
                    message: `非法访问`,
                    description:
                        '请输入账号密码进行登录',
                    placement,duration
                });
            })('top',1.8);
        }
    },[navigate,user])

    return (
        <Layout className='layout'>
            <Sider>
                <NavLeft />
            </Sider>
            <Layout>
                <Header/>
                <Content className='content'>
                    <Outlet/>
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
}

export default Admin;