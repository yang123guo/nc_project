import React, { Component } from 'react';
import ajax from '../../../../src/api/ajax'
import { createPage } from '../../../../src';
import {buttonClick, initTemplate} from './events';
import './index.less';
import * as echarts from 'echarts/lib/echarts';
// 引入饼状图
import 'echarts/lib/chart/pie';

class FinMessageIndex extends Component {
	// react：构造函数
	constructor(props) {
		super(props);
		this.state = {
			activeClassName: "1",
		}

	}
	//页签点击事件
	listItemClick = (itemId) => {
		//改变页签样式
		this.state.activeClassName = itemId;
		this.setState({
			activeClassName: this.state.activeClassName
		})
		if (itemId == 1) {
			//最近投资：按照投资日期倒序排列，仅显示10条数据
			let searchParams ={
				"searchMap": {
					"bankname":null ,
					"beginmny":null ,
					"endmny":null,
					"begindate":null ,
					"enddate":null ,
					"page":0,
					"size":1,
					"investtype":null,
					"investID":"",
					"sort":{
						"property": "investdate",
						"direction": "desc"
					}
				}
			}; 
			this.getAjaxDate('/demo-web/demo/inment/searchByCondition',searchParams,this.props.table.setAllTableData)
		} else {
			//即将到期：所有活期投资金额累计后显示在第一条，到期日为空；其他记录按照到期日正序排列，仅显示10条数据
			let searchParams ={
				"searchMap": {
					"bankname":null ,
					"beginmny":null ,
					"endmny":null,
					"begindate":null ,
					"enddate":null ,
					"page":0,
					"size":1,
					"investtype":null,
					"investID":"",
					"sort":{
						"property": "enddate",
						"direction": "asc"
					}
				}
			}; 
			this.getAjaxDate('/demo-web/demo/inment/searchByCondition',searchParams,this.props.table.setAllTableData)
		}
	}
	componentWillMount() {
		//默认加载最近投资
		let searchParams ={
			"searchMap": {
				"bankname":null ,
				"beginmny":null ,
				"endmny":null,
				"begindate":null ,
				"enddate":null ,
				"page":0,
				"size":1,
				"investtype":null,
				"investID":"",
				"sort":{
					"property": "investdate",
					"direction": "desc"
				}
			}
		}; 
		this.getAjaxDate('/demo-web/demo/inment/searchByCondition',searchParams,this.props.table.setAllTableData)
		// //得到数据渲染到页面
		// this.props.table.setAllTableData && this.props.table.setAllTableData('tableArea1', this.state.defaultValue.data.invest)
		
	}
	getAjaxDate=(_url,searchParams,callback)=>{
		let pageinfo={page:0,size:10}
		let data = {
			...pageinfo,
			searchParams,
		}
		ajax({
			url: _url,
			data: data,
			success: function(res) {
				callback && callback('tableArea1',res.data.invest_form1)

			}
		});

	}
	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
		let myChart = echarts.init(document.getElementById('bottomMychart'));
		// 绘制图表
		myChart.setOption({
			legend: {
				orient: 'vertical',
				left: 'left',
				data: ['担保金额', '被担保金额'],
				
			},
			series: [
				{
					name: '担保金',
					type: 'pie',
					radius: '55%',
					center: ['50%', '55%'],
					data: [
						{ value: 335, name: '担保金额' },
						{ value: 210, name: '被担保金额' },
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		})
	}
	// react：界面渲染函数
	render() {
		let { button, table } = this.props;
		let { createSimpleTable, handleChangePageSize } = table;
		let { createButton } = button;
		return (
			<div className="ICTable">
				<div className="title"><h1>理财产品，敬请期待</h1></div>
				<div className="main">
					<div className="main-left">
						<div id="bottomMychart" />
					</div>
					<div className="main-right">
						<div>
							{createButton('skipToBank', { name: '银行' })}
							{createButton('skipToAllMessage', { name: '查看全部' })}
							<div className="clear"></div>
						</div>
						<div>
							<ul className="list">
								<li className={this.state.activeClassName == 1 ? 'active' : ''} onClick={() => this.listItemClick("1")}>
									最近投资
								</li>
								<li className={this.state.activeClassName == 2 ? 'active' : ''} onClick={() => this.listItemClick("2")}>
									即将到期
								</li>
							</ul>
							{createSimpleTable('tableArea1')}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default createPage({
	//折行显示确认meta信息加载成功
	initTemplate: initTemplate,
	// 按钮点击事件
	onButtonClick: buttonClick,
})(FinMessageIndex);
