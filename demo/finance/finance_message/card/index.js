import React, { Component } from 'react';
import { createPage, base, ajax } from '../../../../src';
//import Ajax from '../../../../src/api/ajax';
import { NCScrollElement, NCScrollLink } from '../../../../src/base/nc_Scroll';
import NCAffix from '../../../../src/base/nc_Affix';
import { buttonClick, initTemplate, afterEvent } from './events';
import './index.less';

let status;

class FinanceMessageCard extends Component {
	// react：构造函数
	constructor(props) {
		super(props);
		status = this.props.location.query.type;
		this.id = this.props.location.query.id;
	}

	//接收props更新
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.query) {
			status = nextProps.location.query.type;
			this.id = nextProps.location.query.id;
			if (status !== this.props.location.query.type) {
				this.props.setPageStatus(status, this.id);
				if (status != 'browse') {
					this.props.editTable.edit('invest_table');
				}
			}
		}
	}

	componentDidMount() {
		this.props.setPageStatus(status, this.id);
		if (status != 'browse') {
			this.props.editTable.setStatus('invest_table', 'edit');
		}

		//新增态时 将投资日期设置为今天
		if (status === 'add') {
			let date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
			this.props.form.setFormItemsValue('invest_form2', { 'investdate': date });
		}

		const that = this;
		if (status != "add") {
			//查询卡片详情，给表单表格赋值
			let data = {
				page: 0,
				size: 1,
				searchParams: {
					searchMap: {
						bankname: '',
						beginmny: '',
						endmny: '',
						begindate: '',
						enddate: '',
						page: 0,
						size: 1,
						investID: this.props.location.query.id,
						sort: {
							property: '',
							direction: ''
						}
					}
				}
			}
			ajax({
				data: data,
				url: '/demo-web/demo/inment/searchByCondition',
				success: function (res) {
					that.props.form.setAllFormValue("invest_form1", res.data.invest_form1.rows[0].values);
					that.props.form.setAllFormValue("invest_form2", res.data.invest_form2.rows[0].values);
					if (res.data.invest_table) {
						that.props.editTable.setTableData("invest_table", res.data.invest_table);
					}
				}
			})
		}
	}


	// react：界面渲染函数
	render() {
		let { form, button, table, editTable } = this.props;
		let { createForm } = form;
		let { createButton } = button;
		let { createEditTable } = editTable;

		return (
			<div className="finance-card-wrapper">
				<NCAffix>
					<div className="nav">
						<div className="left">理财单</div>
						<div className="finance-card-btnArea right">
							{this.props.getPageStatus() === 'browse' ? (
								<span>{createButton('backButton', { name: '返回' })}
									{createButton('editButton', { name: '修改' })}</span>
							) : (
									<span>{createButton('saveButton', { name: '保存' })}
										{createButton('cancelButton', { name: '取消' })}</span>
								)}
						</div>
						<div className="middle">
							<NCScrollLink to='fininfo' offset={-50}>
								<span>理财产品</span>
							</NCScrollLink>
							<NCScrollLink to='investinfo' offset={-50}>
								<span>投资情况</span>
							</NCScrollLink>
							<NCScrollLink to='payinfo' offset={-50}>
								<span>付款计划</span>
							</NCScrollLink>
						</div>
					</div>
				</NCAffix>
				<NCScrollElement name='fininfo'>
					<div className="finance-card-investInfoForm part">
						<div className="title">理财产品</div>
						{createForm('invest_form1')}
					</div>
				</NCScrollElement>
				<NCScrollElement name='investinfo'>
					<div className="finance-card-bankForm part">
						<div className="title">投资情况</div>
						{createForm('invest_form2')}
					</div>
				</NCScrollElement>
				<NCScrollElement name='payinfo'>
					<div className="finance-card-table part">
						<div className="title">付款计划</div>
						<div className="card-table">
							{this.props.getPageStatus() != 'browse' && createButton('addRowButton', { name: '新增' })}
							{createEditTable('invest_table')}
						</div>
					</div>
				</NCScrollElement>
			</div>
		);
	}
}

export default createPage({
	initTemplate: initTemplate,
	// 编辑后事件
	onAfterEvent: afterEvent,
	// 按钮点击事件
	onButtonClick: buttonClick,
})(FinanceMessageCard);
