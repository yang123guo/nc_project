import React, { Component } from 'react';
import { createPage } from '../../src';
import { searchButtonClick} from './events';
class IcSimpleSearch extends Component {
	// react：构造函数
	constructor(props) {
		super(props);
		//表单meta信息
		this.meta9={
			title :"结算方式",
			buttonValue: "新增",
			buttonClick:this.buttonClick,
			buttonConfig : {
				colors:"primary",
				size:"sm"
			},
		}
	}
	//新增按钮事件
	buttonClick=()=>{
		//跳转到新增页面或者弹出框
		console.log(111)
	}

	// react：界面渲染函数
	render() {
		let { simpleSearch } = this.props;
		let { createSimpleSearch} = simpleSearch;
		// console.log(createSimpleTable)
		return (
			<div>
				{createSimpleSearch(this.meta9)}
				{}
			</div>
		);
	}
}

export default createPage({
	searchButtonClick:searchButtonClick
})(IcSimpleSearch);