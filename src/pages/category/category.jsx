import React, { Component } from 'react'
import {Card, Button, Table, Modal} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqCategorys, reqAddCategory } from '../../api/index'
import { ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'
import AddForm from './add-form'
import UpdateForm from './update-form'

import './category.less'

export default class Category extends Component {
    state = {
        categorys: [],//一级分类列表
        subCategorys: [],//二级分类列表
        parentId: '0',
        parentName: '',
        visible: 0,//是否显示弹窗,0表示隐藏，1表示显示添加，2表示更新
        loading: false,//加载
    }
    showSubCategorys = (category) => {
        const parentId = category._id
        this.setState({
            parentId,
            parentName: category.name
        }, () => {//在状态跟新且重新render()的时候执行
            this._getCategorys()
        })
    }
    showCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
        })
    }
    //关闭弹窗
    handleCancel = () => {
        this.form.current.resetFields()
        this.setState({
            visible: 0
        })
        console.log(this.form.current)
    }
    //确定修改或者添加
    handleOk = () => {
        console.log(this.form.current.getFieldsValue())
        // const result = reqAddCategory(parentId, categoryName)
        this.setState({
            visible: 0
        })
    }

    _getCategorys = async () => {
        const {parentId} = this.state
        this.setState({
            loading: true
        })
        const result = await reqCategorys(parentId)
        if (result.status===0) {
            const categorys = result.data
            const loading = false
            if (parentId==='0') {
                this.setState({
                    categorys,
                    loading
                })
            }else {
                this.setState({
                    subCategorys:categorys,
                    loading
                })
            }
        }
    }
    //添加分类
    addCategory = () => {
        this.setState({
            visible: 1
        })
    }
    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: "300px",
                dataIndex: '',
                render: (category) => (
                    <span>
                        <LinkButton style={{marginRight: 20}}>修改分类</LinkButton>
                        {
                            this.state.parentId==='0'?(<LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>) : null
                        }
                   </span>
                ),
            }
        ]
    }
    componentDidMount() {
        this._getCategorys()
    }
    //为第一次render()准备数据
    componentWillMount() {
        this.initColumns()
    }
    render () {
        const {categorys, subCategorys, parentId, parentName, visible} = this.state
        return (
            <Card title={parentId==='0'?"一级分类列表":(
                <span>
                    <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                    <ArrowRightOutlined />
                    <span style={{marginLeft: 5}}>{parentName}</span>
                </span>
            )} extra={
                <Button type="primary" onClick={this.addCategory}>
                    <PlusOutlined />添加
                </Button>
            } style={{width: "100%"}}
            >
                <Table
                    columns={this.columns}
                    dataSource={parentId==='0' ? categorys : subCategorys}
                    bordered
                    rowKey="_id"
                    pagination={{showQuickJumper:true}}
                    loading={this.state.loading}
                />
                <Modal
                    title="添加分类"
                    visible={visible===1}
                    okText="确认"
                    cancelText="取消"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <AddForm setForm={(form) => this.form = form} categorys={categorys} parentId={parentId}/>
                </Modal>
            </Card>
        )
    }
}
