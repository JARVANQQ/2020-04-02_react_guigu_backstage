import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import { Menu } from 'antd'
import Icon from '@ant-design/icons'
import menuList from '../../config/menuConfig'

import logo from '../../assets/images/logo.png'
import './left-nav.less'

const { SubMenu } = Menu

class LeftNav extends Component {
    componentWillMount() {
        //放在componentWillMount只只执行一次，提高性能
        this.menuNode = this.menuNodes(menuList)//解决this.defaultOpenKey为undefined的问题
    }

    menuNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            if (!item.children) {
              pre.push(
                  <Menu.Item key={item.key}>
                      <Link to={item.key}>
                          <Icon component={item.icon} />
                          <span>{item.title}</span>
                      </Link>
                  </Menu.Item>
              )
            }else {
                const cItem = item.children.find((cItem) => cItem.key === this.props.location.pathname)

                if (cItem) {
                    this.defaultOpenKey = item.key
                }
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span className='sun-menu-span'>
                                <Icon component={item.icon}/>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.menuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
            return pre
        }, [])
    }
    render () {

        const selectKey = this.props.location.pathname
       /* console.log(selectKey)
        console.log(this.defaultOpenKey)*/
        return (
            <div className='left-nav-wrap'>
                <header>
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </header>
                <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.defaultOpenKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNode
                    }
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)//让非路由组件拥有路由组件的方法
