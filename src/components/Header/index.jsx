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

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        storageUtils.removeUser()
        memoryUtils.user = {}
        navigate('/login')
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
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
        getWeather()
    })

    useEffect(() => {
        const getTime = () => {
            setInterval(() => {
                const currentTime = formatDate(Date.now())
                setCurrentTime(currentTime)
            }, 1000)
        }
        getTime()
    })

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