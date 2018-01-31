import React, { Component } from 'react';
import { Modal, Button, Radio, Select, Checkbox } from 'tinper-bee';
import { createFormByMeta } from './create';
import Switch from 'bee-switch';
import Form from 'bee-form';
import FormControl from 'bee-form-control';
import DatePicker from 'bee-datepicker';
const FormItem = Form.FormItem;
import moment from 'moment';
const Option = Select.Option;

import {
    InputItem,
    SelectItem,
    DateTimePickerItem,
} from '../../base/nc_FormItems';

export default class ModelForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meta: props.meta,
            checkFormNow: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            meta: nextProps.meta
        })
    }

    handleDoSave = () => {
        var tempObj = {},
            moduleId = this.state.meta.moduleId,
            id = this.state.meta.id;
        let tempArr = this.state.meta.renderCol
            .filter(item => item.itemType !== 'label')
            .forEach(item => {
                let key = item.key;
                tempObj[key] = {
                    display: null,
                    scale: -1,
                    value: item.value
                }
            })

        let dist = {
            data: {
                [moduleId]: {
                    pageinfo: {},
                    rows: [{
                        rowId: null,
                        values: { ...tempObj, id: { display: null, scale: -1, value: id } }
                    }]
                }
            }
        }
        this.props.tableModelConfirm(dist, this.props.type)
        this.props.closeModel(moduleId)
    }

    handleSubmit = () => {
        // 提供了钩子函数把数据抛出去  关闭窗口
        this.setState({
            checkFormNow: true
        })
    }

    submitcheckForm = (flag) => {
        if(flag) {
            this.handleDoSave();
        }
        this.setState({
            checkFormNow: false
        })
    }

    close = () => {
        this.props.closeModel(this.props.meta.moduleId)
    }

    stateChange = (val, id) => {
        console.log(val, id)
        this.state.meta.renderCol.map(item => {
            if(item.key == id) {
                item.value = val
            }
        })

        this.setState({
            meta: this.state.meta
        })
    }

    render() {
        const { showModal, data, type } = this.props;
        const { meta, checkFormNow } = this.state;
        let title = '标题';
        switch(type) {
            case 'add':
                title = '新增'
                break;
            case 'edit':
                title = '编辑'
                break;
            default:
                break;
        }
        let formMeta = meta.renderCol.filter(item => item.itemType && item.itemType !== 'label')
        console.log(formMeta)
        return (
            <Modal 
                id="tableModal"
                show={showModal} 
                className="table-modal" 
                backdrop="static" 
                animation={false} 
                onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            showSubmit={false}
                            submitCallBack={this.submitcheckForm}
                            checkFormNow={checkFormNow} 
                            useRow={true}
                            className="table-modal-form">
                            {formMeta.map((item, i) => {
                                switch (item.itemType) {
                                    case 'input':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4} 
                                                md={8} 
                                                isRequire={true}
                                                showMast={true}
                                                errorMessage={['必输项目']}
                                                labelName={item.label}
                                            >
                                                <FormControl 
                                                    placeholder="请输入..."
                                                    name={item.key}
                                                    value={item.value}
                                                    defaultValue={item.value}
                                                    onChange={(val) => {
                                                        this.stateChange(val, item.key)
                                                    }} />
                                            </FormItem>
                                        );
                                    case 'select':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8} 
                                                isRequire={true}
                                                showMast={true}
                                                labelName={item.title}
                                            >
                                                <Select  
                                                    value={item.value} 
                                                    onChange={(val) => {
                                                        this.stateChange(val, item.key)
                                                    }} 
                                                    getPopupContainer = {() => document.querySelector('#tableModal')}
                                                    dropdownStyle={{ zIndex: 18000 }}>
                                                    {
                                                        item.options.map((one, i) => <Option value={one.value} key={i} > {one.display} </Option>)
                                                    }
                                                        
                                                </Select>
                                            </FormItem>
                                        );
                                    case 'datepicker':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8} 
                                                labelName={item.title}
                                            >
                                                <DatePicker
                                                    type="customer"
                                                    format="YYYY-MM-DD"
                                                    // locale={zhCN}
                                                    value={item.value ? moment(item.value) : ''}
                                                    onChange={(e) => {
                                                        let val = e.format('YYYY-MM-DD')
                                                        this.stateChange(val, item.key)
                                                    }}
                                                    placeholder={'选择日期时间'}
                                                />
                                            </FormItem>
                                        );
                                    case 'textarea':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                labelName={item.title}
                                            >
                                                <textarea
                                                    placeholder="请输入..."
                                                    name={item.key}
                                                    value={item.value}
                                                    defaultValue={item.value}
                                                    onChange={(val) => {
                                                        this.stateChange(val, item.key)
                                                    }} >
                                                </textarea>
                                            </FormItem>
                                        );
                                    case 'radio':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                labelName={item.title}
                                            >
                                                <Radio.RadioGroup
                                                    type="customer"
                                                    name={item.key}
                                                    selectedValue={item.value}
                                                    onChange={(val) => {
                                                        this.stateChange(val, item.key)
                                                    }}>
                                                    {
                                                        item.options.map((one, i) => <Radio value={one.value} key={i} > {one.display} </Radio>)
                                                    }
                                                </Radio.RadioGroup>
                                            </FormItem>
                                        );
                                    case 'checkbox':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                labelName={item.title}
                                            >
                                                <div>
                                                    {item.options.map((box, i) => 
                                                    <Checkbox colors="info"
                                                        checked={box.value}
                                                        onChange={(val) => {
                                                            console.log(val)
                                                            this.stateChange(val, item.key)
                                                        }}
                                                        key={i} 
                                                        name={item.key} >
                                                        {box.display}
                                                    </Checkbox>
                                                    )}
                                                </div>
                                            </FormItem>
                                        );
                                    case 'switch':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                labelName={item.title}
                                            >
                                                <Switch 
                                                    checked={!!item.value} 
                                                    onChange={(val) => {
                                                        this.stateChange(val, item.key)
                                                    }} 
                                                /> 
                                            </FormItem>
                                        );
                                    case 'number':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                labelName={item.title}
                                            >
                                                <div>number</div>
                                            </FormItem>
                                        );
                                    case 'rangepicker':
                                        return (
                                            <FormItem
                                                key={i}
                                                inline={true}
                                                labelMd={4}
                                                md={8}
                                                labelName={item.title}
                                            >
                                                <div>rangepicker</div>
                                            </FormItem>
                                        );
                                }
                            })}  
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-2" onClick={this.handleSubmit}>
                            确认
						</Button>
                        <Button className="btn-2 btn-cancel" onClick={this.close} shape="border">
                            取消
						</Button>
                    </Modal.Footer>
                
            </Modal>
        );
    }
}