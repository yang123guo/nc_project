import React, { Component } from 'react';
import { createPage } from '../../../../src';
import { afterEvent, buttonClick } from './events';
import NCButton from '../../../../src/base/nc_Button'
import {Link, hashHistory} from 'react-router';
import './index.less'

class FinMessageCard extends Component {
	// react：构造函数
	constructor(props) {
		super(props);
	}
	handleClick=()=>{
		history.back()
	}
	// react：界面渲染函数
	render() {
		let { form, button } = this.props;
		let { createForm } = form;
		let { createButton } = button;
		return (
			<div className="fin_message_carts">
				{/* 创建按钮 */}
				<div className="buttons">
					<NCButton colors="info" onClick={this.handleClick}>返回</NCButton>
					{createButton('saveButton', { name: '保存' })}
					{createButton('cancelButton', { name: '取消' })}
				</div>
				{/* 创建表单 */}
				<div style={{ border: '1px solid #666', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
					{
						createForm('invest')
					}
				</div>
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
})(FinMessageCard);
