/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
import jsonp from 'jsonp'

// const BASE_URL = 'http://localhost:5000' //已经配置完代理后直接请求3001，但是实际请求的是5000，浏览器不知道
const BASE_URL = ''
//请求登陆
export const reqLogin = ({username, password}) => ajax(`${BASE_URL}/login`, {username, password}, 'post')
//请求天气信息
export function reqWeather(city) {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve, reject) => {
        jsonp(url, {param: 'callback'}, (error, response) => {
            if (!error && response.status === 'success') {
                const {dayPictureUrl, weather} = response.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
             }
        })
    })
}
