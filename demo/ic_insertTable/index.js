/**
 * Created by wangshhj on 2018/1/16.
 */
import React, {Component} from 'react';
import './ic_insertTable.less'
// import { createPage } from 'build';
import Ajax from '../../src/api/ajax';
import {createPage} from '../../src';
import NCButton  from '../../src/base/nc_Button';
import {setTableBodyData, pageIndexChange, pageSizeChange, clickSearchBtn, addOperationColumn} from './events';

class IcInsertTable extends Component {
    constructor(props) {
        super(props);
        let {form, button, table, insertTable, search} = this.props;
        let {getInsertTableValue, setInsertTableValue} = insertTable;
        let {setSearchValue, setSearchValByField, getAllSearchData} = search;
        this.getInsertTableValue = getInsertTableValue;
        this.setInsertTableValue = setInsertTableValue;

        this.setSearchValue = setSearchValue;
        this.setSearchValByField = setSearchValByField;
        this.getAllSearchData = getAllSearchData;
    }

    componentWillMount() {
        //查询外层表格数据
        // Ajax({
        //     url:'',
        //     data:'',
        //     success:function (res) {
        //
        //     }
        // });
        let data = [
            {a: "令狐冲", b: "男", c: 41, dd: "操作", key: "1"},
            {a: "杨过", b: "男", c: 67, dd: "操作", key: "2"},
            {a: "郭靖", b: "男", c: 25, dd: "操作", key: "3"}
        ];
        this.setInsertTableValue('insertTable1', data);
    }

    //保存，获取表格当前数据
    saveData = () => {
        let val = this.getInsertTableValue('insertTable1');
        console.log(val)
    };

    // react：界面渲染函数
    render() {
        let {form, button, table, insertTable, search} = this.props;
        let {createButton} = button;
        let {createInsertTable, getInsertTableValue} = insertTable;
        let {NCCreateSearch} = search;
        return (
            <div className="insertTablePage" style={{"margin": "30px"}}>
                <div>嵌套类型表格</div>
                { NCCreateSearch(
                    'searchArea',
                    clickSearchBtn.bind(this)
                )}
                <div className="btnArea">
                    <NCButton className="saveBtn" colors="primary" onClick={ this.saveData.bind(this) }>保存</NCButton>
                </div>

                { createInsertTable(
                    'insertTable1', //表格id，支持一个页面多表格
                    setTableBodyData.bind(this),  //点击加号展开，设置表格数据
                    pageIndexChange.bind(this),   //点击分页时，设置表格数据（不用分页，可不传）
                    pageSizeChange.bind(this)     //切换显示条数，重新请求数据(不用切换pageSize，可不传)
                )}
            </div>
        );
    }
}

export default createPage({
    initTemplate:addOperationColumn
})(IcInsertTable);
