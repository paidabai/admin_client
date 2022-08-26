import ajax from "./ajax";

const api = '/api'

//登录
export const reqLogin = (username, password) => ajax(`${api}/login`,{username, password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax(`${api}/manage/user/add`, user, 'POST')