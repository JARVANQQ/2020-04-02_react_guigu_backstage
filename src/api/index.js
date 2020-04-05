/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'

// const BASE_URL = 'http://localhost:5000' //已经配置完代理后直接请求3001，但是实际请求的是5000，浏览器不知道
const BASE_URL = ''
//请求登陆
export const reqLogin = ({username, password}) => ajax(`${BASE_URL}/login`, {username, password}, 'post')

