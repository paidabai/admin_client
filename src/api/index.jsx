import ajax from "./ajax";
import jsonp from "jsonp"

const API = '/api'
const KEY = '26d9920252bfc3344a38a18b9ca1f2a0'

//登录
export const reqLogin = (username, password) => ajax(`${API}/login`,{username, password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax(`${API}/manage/user/add`, user, 'POST')

//获取天气
export const reqWeather = (city, fn) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${KEY}`
    return jsonp(url, {}, fn)
}

//获取一级/二级分类列表
export const reqCategory = (parentId) => ajax(`${API}/manage/category/list`,{parentId})

//添加分类
export const reqAddCategory = (parentId, categoryName) => ajax(`${API}/manage/category/add`,{parentId, categoryName},'POST')

//更新分类
export const reqUpDateCategory = (categoryId, categoryName) => ajax(`${API}/manage/category/update`,{categoryId, categoryName},'POST')
