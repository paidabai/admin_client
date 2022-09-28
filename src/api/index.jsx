import ajax from "./ajax";
import jsonp from "jsonp"

const API = '/api'
const KEY = '26d9920252bfc3344a38a18b9ca1f2a0'

// 登录
export const reqLogin = (username, password) => ajax(`${API}/login`,{username, password}, 'POST')

// 获取用户列表
export const reqUsers = () => ajax(`${API}/manage/user/list`)

// 添加用户
export const reqAddUser = (user) => ajax(`${API}/manage/user/add`, user, 'POST')

// 删除用户
export const reqDeleteUser = (userId) => ajax(`${API}/manage/user/delete`,{userId},'POST')

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

// 删除图片
export const reqDeleteImage = (name) => ajax(`${API}/manage/img/delete`, {name}, 'POST')

// 添加/更新商品
export const reqAddOrUpdateProduct = (product) => ajax(`${API}/manage/product/` + (product._id ? 'update' : 'add'),product,'POST')

// 删除商品
export const reqDeleteProduct = (name) => ajax(`${API}/manage/product/delete`, {name})

// 获取角色列表
export const reqRolesList = () => ajax(`${API}/manage/role/list`)

// 添加角色
export const reqAddRole = (roleName) => ajax(`${API}/manage/role/add`,{roleName},'POST')

// 设置角色权限
export const reqUpdateRole = (role) => ajax(`${API}/manage/role/update`,role,'POST')

// 删除角色
export const reqDeleteRole = (name) => ajax(`${API}/manage/role/delete`,{name})