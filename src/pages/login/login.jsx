import React, {Component} from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {reqLogin} from '../../api'
import {Redirect} from 'react-router-dom'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'

import './login.less'
import Logo from '../../assets/images/duola.jpg'

//登陆的路由组件
export default class Login extends Component {
    //用户名校验
    validatorUser = async (rule, value) => {
        const length = value.length
        const reg = /^[a-zA-Z0-9_]+$/
        if (!value.trim()) {
            throw new Error('用户名不能为空！')
        }else if (length < 4) {
            throw new Error('用户名最小4位！')
        }else if (length > 12) {
            throw new Error('用户名最大12位！')
        }else if (!reg.test(value)) {
            throw new Error('用户名必须是英文、数字或下划线组成！')
        }
    }
    //密码校验
    validatorPwd = async (rule, value) => {
        const length = value.length
        const reg = /^[a-zA-Z0-9_]+$/
        if (!value.trim()) {
            throw new Error('密码不能为空！')
        }else if (length < 4) {
            throw new Error('密码最小4位！')
        }else if (length > 12) {
            throw new Error('密码最大12位！')
        }else if (!reg.test(value)) {
            throw new Error('密码必须是英文、数字或下划线组成！')
        }
    }
    //提交表单
    onFinish = async (values) => {
        const result = await reqLogin (values)
        if (result.status===0) {
            const user = result.data
            message.success('登陆成功')
            //将登陆信息保存到内存中
            memoryUtils.user = user
            //将登录信息保存到localStorage
            storageUtils.saveUser(user)
            this.props.history.replace('/')
        }else {
            message.error(result.msg)
        }
    }

    render () {
        //判断本地是否有user信息，有的话读取进入
        if (memoryUtils.user && memoryUtils.user._id) {
          return <Redirect to='/' />
        }
        return (
            <div className='login'>
                <header className='login_header'>
                    <img src={Logo} alt="logo"/>
                    <h1>React项目: 咻咻后台管理（二）</h1>
                </header>
                <section className='login_content'>
                    <div className='login_form_wrap'>
                        <h2>用户登录</h2>
                        <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true , username: 'admin', password: 'admin'}}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            name="username"
                            rules={[
                                { validator: this.validatorUser}
                                ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="用户名"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { validator: this.validatorPwd}
                                ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </section>
            </div>
        )
    }
}
