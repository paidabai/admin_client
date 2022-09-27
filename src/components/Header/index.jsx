import './index.less'
import {useLocation, useNavigate} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";
import {Button, message, Modal} from "antd";
import {useEffect, useState} from "react";
import {formatDate} from "../../utils/dateUtils";
import {reqWeather} from "../../api";
import {menuList} from "../../config/menuConfig";

function Header(props) {

    const userName = memoryUtils.user.username
    const navigate = useNavigate()
    const location = useLocation()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [currentTime, setCurrentTime] = useState(formatDate(Date.now()))
    const [temperature, setTemperature] = useState('')
    const [city, setCity] = useState('')

    // 显示确认退出对话框
    const showModal = () => {
        setIsModalVisible(true);
    };

    // 确定退出登录
    const handleOk = () => {
        storageUtils.removeUser()
        memoryUtils.user = {}
        navigate('/login')
    };

    // 取消退出登录
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 获取天气
    const getWeather = () => {
        reqWeather('成都', (err, data) => {
            if (!err && data.status === '1'){
                setTemperature(data.lives[0].temperature)
                setCity(data.lives[0].city)
            }else {
                message.error('天气获取失败')
            }
        })
    }

    // 页面加载时挂载一次
    useEffect(() => {
        getWeather()
    },[])

    // 每一小时更新一次
    useEffect(() => {
        setInterval(() => {
            getWeather()
        },3600000)
    })

    // 获取当前的时间
    const getTime = () => {
        setInterval(() => {
            const currentTime = formatDate(Date.now())
            setCurrentTime(currentTime)
        }, 1000)
    }

    useEffect(() => {
        getTime()
    })

    // 获取标头
    const getTitle = () => {
        const path = location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path){
                title = item.title
            }else if (item.children){
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }

    const title = getTitle()

    return (
        <div className='header'>
            <div className='header-top'>
                <div className='admin'><span>欢迎,{userName}</span></div>
                <Button className='btn' type="primary" onClick={showModal} size='small'>
                    退出
                </Button>
                <Modal title="确认退出" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} keyboard={true} cancelText='取消' okText='确定'>
                    <p>确定要退出登录吗？</p>
                </Modal>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>
                    {title}
                </div>
                <div className='header-bottom-right'>
                    <span>{currentTime}</span>
                    <span>{city}当前的气温为:{temperature}℃</span>
                </div>
            </div>
        </div>
    );
}

export default Header;