import React, {Component} from 'react'
import './login.less'

import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Logo from './images/logo.png'


//登陆的路由组件
export default class Login extends Component {
    //用户名校验
    validatorUser = async (rule, value) => {
        const length = value.length
        const reg = /^[a-zA-Z0-9_]+$/
        if (!value.trim()) {
            throw new Error('用户名不能为空！')
            return
        }else if (length < 4) {
            throw new Error('用户名最小4位！')
            return
        }else if (length > 12) {
            throw new Error('用户名最大12位！')
            return
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
            return
        }else if (length < 4) {
            throw new Error('密码最小4位！')
            return
        }else if (length > 12) {
            throw new Error('密码最大12位！')
            return
        }else if (!reg.test(value)) {
            throw new Error('密码必须是英文、数字或下划线组成！')
        }
    }
    //提交表单
    onFinish = (values) => {
         console.log('向后台发送请求', values)
        // this.props.history.replace('/')
    }
    render () {
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
