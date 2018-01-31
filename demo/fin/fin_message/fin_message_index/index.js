import React, { Component } from 'react';
import { createPage } from '../../../../src';
import Button from 'bee-button';
import Axios from "axios";
import getTableData from "./events/sendAjax"
import { handleAfterChange} from './events';
import './index.less';
import * as echarts from 'echarts/lib/echarts';
// 引入饼状图
import 'echarts/lib/chart/pie';
import {Link, hashHistory} from 'react-router';

class FinMessageIndex extends Component {
	// react：构造函数
	constructor(props) {
		super(props);


	}
	//‘新增‘按钮，跳转到新增卡片
	pushAddMessage = () => {
		hashHistory.push('/fin/fin_message/fin_message_card');
	}
	//“全部”按钮，跳转到列表页面
	pushAllMessage=()=>{
		hashHistory.push('');
	}
	componentWillMount() {
		let pageInfo = this.props.table.getTablePageInfo('tableArea1');
		let keyWords = null; // 通过第三方方法获得
		getTableData(pageInfo, keyWords, this.props.table.setAllTableData);
	}
	componentDidMount(){
		// 基于准备好的dom，初始化echarts实例
		let myChart = echarts.init(document.getElementById('bottomMychart'));
		// 绘制图表
		myChart.setOption({
			legend: {
				orient: 'vertical',
				left: 'left',
				data: ['担保金额', '被担保金额']
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
		let { form, button, table } = this.props;
		let { createSimpleTable, handleChangePageSize } = table;
		let { createButton } = button;
		return (
			<div className="ICTable">
				<div className="title"><h1>投资信息</h1></div>
				<div className="main">
					<div className="main-left">
					<div id="bottomMychart"/>
					</div>
					<div className="main-right">
						<div>
							<Button colors="info" onClick={this.pushAddMessage}>新增</Button>
							<Button colors="info" onClick={this.pushAllMessage}>全部</Button>
							<div className="clear"></div>
						</div>
						<div>
							<ul className="list">
								<li>最近投资</li>
								<li>即将到期</li>
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
	moduleId: 'table-0001',
	handlePageInfoChange: handleAfterChange
})(FinMessageIndex);
