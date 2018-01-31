import React, { Component } from 'react';
import { createPage } from '../../src';
import { afterEvent, buttonClick } from './events';
import moment from 'moment';

class VerifyForm extends Component {
	// react：构造函数
	constructor(props) {
		super(props);

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
						 createForm('form5')
					}
				</div>
				{/* 创建按钮 */}
				{createButton('setAllValueButton', { name: '设所有值' })}
                {createButton('getAllValueButton', { name: '取所有值' })}
                {createButton('setNameValueButton', { name: '设公司名称值' })}
				{createButton('getNameValueButton', { name: '取公司名称值' })}
				{createButton('setNameDisabledTrue', { name: '公司名称禁用'})}
                {createButton('setNameDisabledFalse', { name: '公司名称可用' })}
                {createButton('getNameDisabled', { name: ' 获取公司名称可用性' })}
                {createButton('setNameVerify', { name: '验证公司名称' })}
			</div>
		);
	}
}

export default createPage({
	moduleId: '105',
	// 编辑后事件
	onAfterEvent: afterEvent,
	// 按钮点击事件
	onButtonClick: buttonClick
})(VerifyForm);
