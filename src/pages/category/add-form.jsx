import React, {Component} from 'react'
import {Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const { Option } = Select


export default class  extends Component {
    formRef = React.createRef()
    //给组件类指定属性,接收父组件传过来的数据
    static propTypes ={
        categorys: PropTypes.array.isRequired,
        parentId:PropTypes.string.isRequired ,
        setForm: PropTypes.func.isRequired//用来传递form对象的函数
    }
    /*onGenderChange = (value) => {
        this.setState({
            selectValue:value
        })
    }*/
    componentWillMount() {
        this.props.setForm(this.formRef)
    }

    render () {
        const {categorys, parentId} = this.props

        return (
            <Form
                name="add_form"
                ref={this.formRef}
                onFinish={this.onFinish}
            >
                <Form.Item>
                    <Select
                        defaultValue={parentId}
                    >
                        <Option value="0">一级分类</Option>
                        {
                            categorys.map((item) => ( <Option value={item._id} key={item._id}>{item.name}</Option>))
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="field">
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        )
    }
}
