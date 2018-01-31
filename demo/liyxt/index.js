import React, { Component } from 'react';
//从npm包引入
// import { createPage, base } from 'nc-lightapp-front';
// 从打包后的build目录引入
// import { createPage, base } from 'build';
// 从源码引入
import { createPage, base, ajax } from '../../src';
import { afterEvent, buttonClick } from './events';
let { NCNumber, NCFormControl } = base;
import { FormControl, Select } from 'tinper-bee';
import {  Refer } from '../../src/containers/Refer';
// import { highGrade } from 'build';
// const { Refer } = highGrade;
import axios from 'axios';
import Table from '../../src/base/nc_Table';
const Option = Select.Option;

class IcApply extends Component {
	// react：构造函数
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			currency: {}
		};
	}

	// react: 生命周期，可做初始化操作，相当于init
	componentDidMount() {
		let that = this;
		ajax({
			url: '/demo-web/demo/invest/query',
			success: function(res) {
				// that.props.editTable.setTableData('investTable', res.data.invest);
			}
		});
	}

	// react：界面渲染函数
	render() {
		let { form, button, editTable } = this.props;
		let { createForm } = form;
		let { createButton } = button;
		let { createEditTable } = editTable;

		return (
			<div>
				{/* 创建表单 */}
				{/* <div style={{ border: '1px solid #666', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
					{createForm('invest')}
				</div> */}
				{/* 创建表格 */}
				<Select value={'1'}>
					<Option value={'1'}>111</Option>
				</Select>
				<div style={{ width: '240px' }}>
					<Refer
						refCode={'bank'}
						value={this.state.currency}
						onChange={(value) => {
							this.setState({
								currency: value
							});
						}}
					/>
				</div>
				{createButton('add', { name: '新增' })}
				{createButton('edit', { name: '编辑' })}
				{createButton('cancel', { name: '取消' })}
				{createButton('save', { name: '保存' })}
				{createButton('del', { name: '删除' })}
				<div style={{ border: '1px solid #666', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
					{createEditTable('investTable')}
				</div>
			</div>
		);
	}
}

export default createPage({
	// 页面初始状态
	status: 'browse',
	//模板id
	moduleId: '100', //或者 [ '001', '002', '003' ]
	// 编辑后事件
	onAfterEvent: afterEvent,
	// 按钮点击事件
	onButtonClick: buttonClick,
	onMetaReceived: function(props, meta) {
		// meta.invest.items[0].label = '修改表单字段名称';
		// props.meta.setMeta(meta);
	}
})(IcApply);
