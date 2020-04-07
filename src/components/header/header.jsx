import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { format } from 'date-fns'//日期格式化
import {reqWeather} from '../../api/index'

import LinkButton from '../../components/link-button/link-button'

import './header.less'

const { confirm } = Modal;

class Header extends Component {

    state = {
        currentTime:format( Date.now(), 'yyyy-dd-MM pp'),
        dayPictureUrl: '',
        weather: '',
    }
    componentDidMount() {
        //发送请求获取天气信息
        this._getWeather()
        //开启循环定时器
        this._setInterval()
    }
    componentWillUnmount() {
        clearInterval(this.intervalId)
    }
    _setInterval () {
        this.intervalId = setInterval(() => {
            const currentTime = format( Date.now(), 'yyyy-dd-MM pp')
            this.setState({
                currentTime
            })
        },1000)
    }
    _getWeather = async () => {
        const {dayPictureUrl, weather} = await reqWeather('上海')
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    loginOut = () => {
        confirm({
            title: '确定要退出吗?',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                memoryUtils.user = {}
                storageUtils.removeUser()
                this.props.history.replace('/login')
            }
        })
    }
    getTitle = () => {
        const path = this.props.location.pathname
        let title = ''
        menuList.forEach((item) => {
            if (item.key === path) {
                title = item.title
            }else if (item.children) {
                const cItem = item.children.find((cItem) => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    render () {
        const user = memoryUtils.user
        const menuTitle = this.getTitle()
        return (
            <div className="header-wrap">
                <div className="header-top">
                    <span>欢迎{user.username}
                        <LinkButton className="header-top-a" onClick={this.loginOut}>退出</LinkButton>
                    </span>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {menuTitle}
                    </div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <img src={this.state.dayPictureUrl} alt="weather"/>
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
