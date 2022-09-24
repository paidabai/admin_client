import ajax from "./ajax";
import jsonp from "jsonp"

const API = '/api'
const KEY = '26d9920252bfc3344a38a18b9ca1f2a0'

// 登录
export const reqLogin = (username, password) => ajax(`${API}/login`,{username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(`${API}/manage/user/add`, user, 'POST')

// 获取天气
export const reqWeather = (city, fn) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${KEY}`
    return jsonp(url, {}, fn)
}

// 获取一级/二级分类列表
export const reqCategory = (parentId) => ajax(`${API}/manage/category/list`,{parentId})

// 添加分类
export const reqAddCategory = ({parentId, categoryName}) => ajax(`${API}/manage/category/add`,{parentId, categoryName},'POST')

// 更新分类
export const reqUpDateCategory = ({categoryId, categoryName}) => ajax(`${API}/manage/category/update`,{categoryId, categoryName},'POST')

// 删除分类
export const reqDeleteCategory = ({categoryName}) => ajax(`${API}/manage/category/delete`,{categoryName})

// 获取一个分类
export const reqCategoryOne = (categoryId) => ajax(`${API}/manage/category/info`,{categoryId})

// 修改商品的状态（在售/已下架）
export const reqUpdateStatus = ({productId, status}) => ajax(`${API}/manage/product/updateStatus`,{productId, status},'POST')

// 获取商品列表
export const reqProducts = (pageNum, pageSize) => ajax(`${API}/manage/product/list`,{pageNum, pageSize})

// 根据（商品名称/商品描述）搜索产品分页列表
// searchType为productName/productDesc
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) => ajax(`${API}/manage/product/search`,{
    pageNum,
    pageSize,
    // searchType为变量
    [searchType]: searchName
})