import React, {Component} from 'react'
import { Layout } from 'antd'
import {Switch, Route, Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/header/header'
import LeftNav from '../../components/left-nav/left-nav'

import './admin.less'
import Home from "../home/home"
import Category from "../category/category"
import Product from "../product/product"
import Role from "../role/role"
import User from "../user/user"
import Bar from "../charts/bar"
import Line from "../charts/line"
import Pie from "../charts/pie"

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    componentDidMount() {
        const user = memoryUtils.user
        // console.log(user)
        if (!user._id) {
            this.props.history.replace('/login')
        }
    }

    render () {
        return (
            <Layout>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/charts/bar' component={Bar}></Route>
                            <Route path='/charts/line' component={Line}></Route>
                            <Route path='/charts/pie' component={Pie}></Route>
                            <Redirect to='/home'></Redirect>
                        </Switch>
                    </Content>
                    <Footer>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
