import React, { Component } from 'react';
import { createPage } from '../../src';
import NCAffix from '../../src/base/nc_Affix';
import NCBreadcrumb from '../../src/base/nc_Breadcrumb';
import NCButton from '../../src/base/nc_Button';
import NCInput from '../../src/base/nc_Input';
import NCDatePicker from '../../src/base/nc_DatePicker';
import NCTable from '../../src/base/nc_Table';
import NCTabs from '../../src/base/nc_Tabs_test';
import './index.less';


const NCBreadcrumbItem = NCBreadcrumb.NCBreadcrumbItem;
const NCTabPane = NCTabs.NCTabPane;

class Test extends Component {
	// react：构造函数
	constructor(props) {
		super(props);
        this.state={
			inputValue:'',
			dateValue:'',
			activeKey : 0,
			show1:true,
			show2:true,
			show3:true
		}

		//配置面包屑导航
		this.breadcrumbItem = [ 
			{  href: '#', title: '首页' }, 
			{  href: '.#/test', title: ' 测试模块' }, 
			{  title: '测试页面1' } 
        ];

		//表单meta信息
		this.meta1 = [
			{
				label: '用户名',
				id: 'userName',
				config: {
					initialValue: 'lyx',
					disabled: true
				},
				type: 'input',
				inputType: 'text'
			},
			{
				label: '密码',
				id: 'passWord',
				type: 'input',
				inputType: 'password'
			}
		];
		this.meta2 = [
			{
				label: '邮箱',
				id: 'email',
				type: 'input',
				inputType: 'text'
			},
			{
				label: '手机',
				id: 'teliphone',
				type: 'input',
				inputType: 'text'
			}
		];

		this.columns = [
			{ title: "用户名", dataIndex: "a", key: "a", width: 100 },
			{ id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
			{ title: "年龄", dataIndex: "c", key: "c", width: 200 },
			{
			  title: "操作",
			  dataIndex: "d",
			  key: "d",
			  render(text, record, index) {
				return (
				  <a
					href="#"
					onClick={() => {
					  alert('这是第'+index+'列，内容为:'+text);
					}}
				  >
					一些操作
				  </a>
				);
		}}];
	
		this.data = [
			{ a: "令狐冲", b: "男", c: 41, d: "操作", key: "1" },
			{ a: "杨过", b: "男", c: 67, d: "操作", key: "2" },
			{ a: "郭靖", b: "男", c: 25, d: "操作", key: "3" }
		];

	}

	handleChange = (v) => {
		console.log(v);
		this.setState({
			inputValue : v
		})
	}

	handelDateChange = (v) => {
		console.log(v);
		this.setState({
			dateValue : v
		})
	}

	onTabChange = (activeKey) => {
        this.setState({
            activeKey,
        });
    }

	// react：界面渲染函数
	render() {
		let { form, button} = this.props;
		let { createForm } = form;
		let { createButton } = button;
		//console.log(NCBreadcrumb.Item)
		return (
			<div className = "testWrapper">
				<NCBreadcrumb>
					<NCBreadcrumbItem href="#">
						Home
					</NCBreadcrumbItem>
					<NCBreadcrumbItem>
						Library
					</NCBreadcrumbItem>
					<NCBreadcrumbItem active>
					 Data
					</NCBreadcrumbItem>
				</NCBreadcrumb>

				<NCAffix>
					<div style = {{width:1000,height:60,margin:10,padding:10,background:'#eee'}}>
						我是固钉
						<NCButton
							style = {{marginLeft:20}}
							colors = "info" 
							onClick = {()=>{
								alert("点击事件")
							}}
							
						>
							测试按钮
						</NCButton>
					</div>
				</NCAffix>

				<div>
				<NCInput 
				    value = {this.state.inputValue}
					placeholder = "请输入名称"
					onChange = {
						(v)=>{
							this.handleChange(v);
						}
					}
					style = {{width:240,margin:10}}
				>
				</NCInput>
				</div>

				<NCDatePicker
					className = "test-datePicker"
					value = {this.state.dateValue}
					onChange = {(v) => {this.handelDateChange(v)}}
				>
				</NCDatePicker>


				<div style = {{width:1000,height:250,margin:10}}>
					<NCTable
						columns = {this.columns}
						data = {this.data}
					>	
					</NCTable>
				</div>
				<div style = {{width:1000,minHeight:250,margin:10}}>
				{/* <NCTabs
				   activeKey = {this.state.activeKey}
				   onChange = {this.onTabChange}
				   title="其他信息"
				>
					<NCTabPane 
						name="页签一" 
						key="0"
						show={this.state.show1}
						>
							页签一内容
						<NCDatePicker
							className = "test-datePicker"
							value = {this.state.dateValue}
							onChange = {(v) => {this.handelDateChange(v)}}
						>
						</NCDatePicker>
					</NCTabPane>
						
					<NCTabPane 
						name="页签二" 
						key="1"
						show={this.state.show2}
					>
						页签二内容
						<NCTable
							columns = {this.columns}
							data = {this.data}
						>	
						</NCTable>
					</NCTabPane>
				</NCTabs> */}
				</div>
				<div style = {{width:1000,height:250,margin:10,background:'#ccc'}}>测试3</div>
			</div>
		);
	}
}

export default createPage({

})(Test);
