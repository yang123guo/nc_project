import React, { Component } from 'react';
// import { createPage } from 'build';
import { createPage } from '../../src';
import { afterEvent, buttonClick } from './events';

import { NCRadio } from '../../src/base/nc_Radio';
import { NCSwitch } from '../../src/base/nc_Switch';
import { NCSelect, NCOption } from '../../src/base/nc_Select';
import { NCIcon } from '../../src/base/nc_Icon';
import { NCModal } from '../../src/base/nc_Modal';

class IcApply extends Component {
	// react：构造函数
	constructor(props) {
		super(props);
		this.state = {};
		this.state.NCRadio = {
			selectedValue: 'apple'
		};

		this.state.NCSwitch = {
			checked: true
		};

		this.state.NCModal = {
			showModal: false
		};
		this.openModal.bind(this);
		this.closeModal.bind(this);


	}

	// react: 生命周期，可做初始化操作，相当于init
	componentDidMount() {
		this.props.form.setValue('form1', {
			userName: 'liyxt@yonyou.com',
			passWord: 'yonyou.com@1988'
		});
	}



	//单选按钮改变事件
	handleChange(value) {
		this.state.NCRadio.selectedValue = value;
		this.setState(this.state.NCRadio);
	}

	//开关改变事件
	onChange = () => {
		this.state.NCSwitch.checked = !this.state.checked;
		this.setState(this.state.NCSwitch);
	};

	//下拉框选择事件
	onSelectedChange = (value) => {
		console.log(`selected ${value}`);
	};

	//打开模态框
	openModal = () => {
		this.state.NCModal.showModal = true;
		this.setState(this.state.NCModal);
	};

	//关闭模态框
	closeModal = () => {
		this.state.NCModal.showModal = false;
		this.setState(this.state.NCModal);
	};

	// react：界面渲染函数
	render() {
		let { form, button, search } = this.props;
		let { createForm } = form;
		let { createButton } = button;
		let { NCCreateSearch } = search;

		return (
			<div>
				{/* 创建表单 */}
				<div style={{ border: '1px solid #666', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
					{createForm('form1')}
				</div>
				<div style={{ border: '1px solid #666', padding: '20px', marginBottom: '20px' }}>
					{createForm('form2')}
				</div>
				{/* 创建按钮 */}
				{createButton('setValueButton', { name: '设值' })}
				{createButton('getValueButton', { name: '取值' })}
				{createButton('getDisabledTrue', { name: 'input禁用', disabled: true })}
				{createButton('getDisabledFalse', { name: 'input可用' })}

				<br />
				{/*单选组件*/}
				<div style={{ color: 'red', marginTop: '20px' }}>单选组件</div>
				<NCRadio.NCRadioGroup
					name="fruit"
					selectedValue={this.state.NCRadio.selectedValue}
					onChange={this.handleChange.bind(this)}
				>
					<NCRadio value="apple">apple</NCRadio>

					<NCRadio value="orange">Orange</NCRadio>

					<NCRadio disabled value="watermelon">
						Watermelon
					</NCRadio>
				</NCRadio.NCRadioGroup>

				<br />

				{/*开关组件*/}
				<div style={{ color: 'red', marginTop: '20px' }}>开关组件</div>
				<div>
					<NCSwitch />
					<NCSwitch checked={this.state.NCSwitch.checked} onChange={this.onChange} />
				</div>

				{/*下拉框组件*/}
				<div style={{ color: 'red', marginTop: '20px' }}>下拉框组件</div>
				<div>
					<NCSelect
						size="lg"
						defaultValue="lucy"
						style={{ width: 200, marginRight: 6 }}
						onChange={this.onSelectedChange}
					>
						<NCOption value="jack">jack</NCOption>
						<NCOption value="lucy">lucy</NCOption>
						<NCOption value="disabled" disabled>
							Disabled
						</NCOption>
						<NCOption value="yiminghe">yiminghe</NCOption>
					</NCSelect>
				</div>

				{/*图标*/}
				<div style={{ color: 'red', marginTop: '20px' }}>图标组件</div>
				<div>
					<NCIcon type="uf-wechat" />
					<NCIcon type="uf-search" />
				</div>

				{/*模态框组件*/}
				<div style={{ color: 'red', marginTop: '20px' }}>模态框组件</div>
				<button onClick={this.openModal}>出来吧模态框</button>
				<NCModal show={this.state.NCModal.showModal} onHide={this.closeModal}>
					<NCModal.Header>
						<NCModal.Title>这是题目</NCModal.Title>
					</NCModal.Header>

					<NCModal.Body>这是一些描述。。。</NCModal.Body>

					<NCModal.Footer>
						<button onClick={this.closeModal}>我不是按钮</button>
					</NCModal.Footer>
				</NCModal>

			</div>
		);
	}
}

export default createPage({
	//模板id
	moduleId: '100', //或者 [ '001', '002', '003' ]
	// 编辑后事件
	onAfterEvent: afterEvent,
	// 按钮点击事件
	onButtonClick: buttonClick
})(IcApply);
