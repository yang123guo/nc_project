import React, { Component } from 'react';
import { createPage } from '../../../../src';
import Ajax from '../../../../src/api/ajax';
import { buttonClick, searchBtnClick, pageInfoClick, initTemplate } from './events';
import './index.less'



class FinanceMessageList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //默认显示第一页
        const _this = this;
        let searchVal = this.props.search.getAllSearchData('financeSearchArea');
        searchVal.page = 0;
        searchVal.size = 10;
        searchVal.sort = {
            property: "investdate",
            direction: "desc"
        }
        let data = {
            page: 0,
            size: 10,
            searchParams: {
                'searchMap': searchVal
            }
        }
        Ajax({
            data: data,
            url: '/demo-web/demo/inment/search',
            success: function (res) {
                _this.props.table.setAllTableData("financeListTable", res.data.invest);
            }
        })
    }


    render() {
        let { table, button, search } = this.props;
        let { createSimpleTable } = table;
        let { createButton } = button;
        let { NCCreateSearch, setSearchValue } = search;
        return (
            <div>
                <div className="back-link"> <a href="#/finance/finance_message/main"> {'<'}返回</a> </div>
                <div className="finance-list-content">
                    <div className="finance-list-title">
                        <span>理财信息</span>
                        {createButton('addButton', { name: '新增' })}
                    </div>
                    <div className="finance-list-search">
                        {NCCreateSearch(
                            'financeSearchArea',
                            searchBtnClick.bind(this)
                        )}
                    </div>
                    <div className="finance-list-table">
                        {createSimpleTable('financeListTable')}
                    </div>
                </div>
            </div>

        )
    }
}

export default createPage({
    initTemplate: initTemplate,
	//按钮点击事件
    onButtonClick: buttonClick,
    //分页点击事件
    handlePageInfoChange: pageInfoClick
})(FinanceMessageList);