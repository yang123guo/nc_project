import React, { Component } from 'react';
import { createPage } from '../../../../src';
// import { createPage } from 'nc-lightapp-front';
import {buttonClick,pageinfoClick,searchButtonClick,tableModelConfirm,initTemPlate} from './events';
import ajax from '../../../../src/api/ajax';
// import {ajax} from 'nc-lightapp-front'
import './index.less'
class List extends Component {
	// react：构造函数
	constructor(props) {
        super(props);
        this.state={
            simpleSearchArea: {
                id:"123",
                title: '银行档案',
                placeholder: '搜索名称'
            }
        }
    }
    componentDidMount() {
		let pageInfo = this.props.table.getTablePageInfo('tableBank');
        let searchParams ={searchMap:{"bankname": ""}}; 
        // console.log(pageInfo)
        let data = {
            ...pageInfo,
            page: 0,
            searchParams,
        }
        let {setAllTableData}=this.props.table
        //得到数据渲染到页面
        ajax({
			url: '/demo-web/demo/bank/query',
			data: data,
			success: function(res) {
                setAllTableData && setAllTableData('tableBank',res.data.bank)
			}
		});

	}
    render() {
		let {table,simpleSearch,button} = this.props;
        let { createSimpleTable, handleChangePageSize } = table;
        let { createSimpleSearch} = simpleSearch;
        let { createButton } = button;
        return (
            <div className="bankFilesList">
                <div> <a href="#/finance/finance_message/main"> {'<'}返回</a> </div>
                {createSimpleSearch(this.state.simpleSearchArea)}
                {createSimpleTable('tableBank')}
            </div>
        )
    }
}

export default createPage({
    //操作列
    initTemplate: initTemPlate,
    handlePageInfoChange: pageinfoClick,
	// 搜索事件
    searchButtonClick:searchButtonClick,
 
	// 按钮点击事件
    onButtonClick: buttonClick,
    // 弹出框点击确认
    tableModelConfirm: tableModelConfirm
})(List);