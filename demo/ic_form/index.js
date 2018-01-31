import React, { Component } from 'react';
import { createPage } from '../../src';
import { afterEvent, buttonClick } from './events';
import moment from 'moment';

class IcForm extends Component {
	// react：构造函数
	constructor(props) {
		super(props);
		//表单meta信息
		this.meta1 = [
			{
				label: '用户名',
				id: 'userName',
				config: {
					initialValue: '张飞',
					// disabled: true
				},
				type: 'input',
				inputType: 'text'
			},
			{
				label: '出生日期',
				id: 'birthday',
				config: {
					initialValue: moment(),
					// disabled: true
				},
				type: 'datepicker',
				inputType: 'birthday'
			},
			{
				label: '水果',
				id: 'fruit',
				type: 'radio',
				config: {
					initialValue: 'apple',
					// disabled: true
				},	

				inputType: 'fruit',
				items: [{
					label: '苹果',
					value: 'apple'
				}, {
					label: '橘子',
					value: 'orange'
				}, {
					label: '梨',
					value: 'pear'
				}, {
					label: '香蕉',
					value: 'banana'
				}]
			},
			{
				label: '蔬菜',
				id: 'vegetables',
				type: 'checkbox',
				inputType: 'vegetables',
				config: {
					initialValue: 'eggplant',
					// disabled: true
				},	

				items: [{
					label: '茄子',
					value: 'eggplant'
				}, {
					label: '黄瓜',
					value: 'cucumber'
				}, {
					label: '冬瓜',
					value: ' waxgourd'
				}, {
					label: '白菜',
					value: 'chinesecabbage'
				}]
			}
		];
		this.meta2 = [
			{
				label: '邮箱',
				id: 'email',
				type: 'input',
				config: {
					initialValue: 'email@yonyou.com',
					// disabled: true
				},
				inputType: 'text'
			},
			{
				label: '手机',
				id: 'teliphone',
				type: 'input',
				config: {
					initialValue: '11111000',
					// disabled: true
				},
				inputType: 'text'
			}
		];
	}

	// react：界面渲染函数
	render() {
		let { form, button } = this.props;
		let { createForm } = form;
		let { createButton } = button;
		return (
			<div>
				{/* 创建表单 */}
				<div style={{ border: '1px solid #666', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
					{
						createForm('form3')
					}
				</div>
				<div style={{ border: '1px solid #666', padding: '20px', marginBottom: '20px' }}>
					 {
					 	createForm('form4')
					 }
				</div>
				<div style={{ border: '1px solid #666', padding: '20px', marginBottom: '20px' }}>
					 {
					 	createForm('form5')
					 }
				</div>
				{/* 创建按钮 */}
				{createButton('setValueButton', { name: '设值' })}
				{createButton('getValueButton', { name: '取值' })}
				{createButton('changetobrowse', { name: '切换到浏览态' })}
				{createButton('changetoEdit', { name: '切换到编辑态' })}
				{createButton('checknow', { name: '校验' })}
				{createButton('getDisabledTrue', { name: 'input禁用', disabled: true })}
				{createButton('getDisabledFalse', { name: 'input可用' })}
			</div>
		);
	}
}

export default createPage({
	moduleId: '105',
	status: 'edit',
	// 编辑后事件
	onAfterEvent: afterEvent,
	// 按钮点击事件
	onButtonClick: buttonClick
})(IcForm);
