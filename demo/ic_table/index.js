import React, { Component } from 'react';
import { createPage } from '../../src';
import Button from 'bee-button';
import ajax from '../../src/api/ajax';
import getTableData from "./events/sendAjax"
import { handleAfterChange, addOperationColumn, tableModelConfirm, initTemPlate} from './events';
import './index.less';
import {Link, hashHistory} from 'react-router';

class IcTable extends Component {
	// react：构造函数
	constructor(props) {
		super(props);
		//表单meta信息
	}

	handleClick = () => {
		this.props.table.openModel('tableBank', 'add');
	}

	componentWillMount() {
		let pageInfo = this.props.table.getTablePageInfo('tableBank');
		let searchParams = { searchMap: { "bankname": "" } };
		let data = {
			...pageInfo,
			searchParams,
		}
		let { setAllTableData } = this.props.table
		//得到数据渲染到页面
		ajax({
			url: 'tableData',
			data: data,
			success: function (res) {
				console.log(res)
				setAllTableData && setAllTableData('tableBank', res.table)
			}
		});
	}
	
	// react：界面渲染函数
	render() {
		let { form, button, table } = this.props;
		let { createSimpleTable } = table;
		let { createButton } = button;
		return (
			<div className="ICTable">
				<div>
					<Button colors="info" onClick={this.handleClick}>新增</Button>
				</div>
				{/* {createSimpleTable('tableArea1')} */}
				{createSimpleTable('tableBank')} 
				{/* {createSimpleTable('table_meta_demo1')} */}
			</div>
		);
	}
}


// 如果多个 页码change事件
export default createPage({
	moduleId: 'table-0001',
	initTemplate: initTemPlate,
	handlePageInfoChange: handleAfterChange,
	tableModelConfirm: tableModelConfirm
})(IcTable);
