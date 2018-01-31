/**
 * Created by wangshhj on 2018/1/16.
 */
import React, {Component} from "react";
import {Table, InputRender, Pagination, Col} from "tinper-bee";
import NCTable from "../../base/nc_Table";

import NCSelect from "../../base/nc_Select"
import './insertTable.less'
let NCOption = NCSelect.NCOption;

//创建嵌套类型表格
export function createInsertTable(id, setTableBodyData, pageIndexChange, pageSizeChange) {

    if(!this.state.meta){
        return false
    }
    if(!this.state.meta.hasOwnProperty('insertTable')){
        return false
    }
    this.defPageInfo = {//默认分页信息
        pageSize:10,
        pageIndex:1
    };
    let columns = this.state.meta.insertTable[id].columns;
    let data = this.state.insertTable[id].data;
    let pageInfo =  Object.assign(this.defPageInfo,this.state.insertTable[id].pageInfo);
    let pageSize = pageInfo.pageSize;
    let pageIndex = pageInfo.pageIndex;
    let totalPage = Math.ceil(data.length / pageSize);
    //初始化内嵌表格数据
    this.state.insertTable[id].bodyData = {};
    let bodyKey = null;

    this.setTableBodyData = setTableBodyData;//设置内嵌表格数据
    this.pageIndexChange = pageIndexChange; //切换分页
    this.pageSizeChange = pageSizeChange; //切换每页显示条数

    let check = (flag, obj) => {
        console.log(flag);
        console.log(obj);
    };

    //表格展开显示的内容
    let expandedRowRender = () => {
        if (JSON.stringify(this.state.insertTable[id].bodyData) !== "{}") {
            return (
                <Table
                    columns={ this.state.insertTable[id].bodyData[bodyKey].columns}
                    data={ this.state.insertTable[id].bodyData[bodyKey].data }
                    // title={currentData => <div>标题: 这是一个标题</div>}
                    // footer={currentData => <div>表尾: 我是小尾巴</div>}
                />
            );
        }
    };

    //当点击展开的时候才去请求内嵌表格数据
    let getData = (expanded, record) => {
        if (expanded) {
            bodyKey = record.key;
            let bodyData = this.setTableBodyData(record);
            this.state.insertTable[id].bodyData[bodyKey] = {};
            this.state.insertTable[id].bodyData[bodyKey] = bodyData;
        }
    };

    //切换分页
    let pageIndexChanges = (eventKey) => {
        data = this.pageIndexChange(eventKey);
        pageIndex = eventKey;
        this.setState(this.state);
    };

    //每页显示条数
    let pageSizeSelect = (val) => {
        data = this.pageSizeChange(val);
        pageSize = val;
        this.setState(this.state);
    };

    return (
        <div className="insertTable">
            <NCTable
                columns={columns}
                data={data}
                onExpand={getData.bind(this)}
                expandedRowRender={expandedRowRender.bind(this)}
                // title={currentData => <div>标题: 这是一个标题</div>}
                // footer={currentData => <div>表尾: 我是小尾巴</div>}
            />

            <Col md={12} xs={12} sm={12}>
                <NCSelect className="pageSizeDom"
                          size="lg"
                          defaultValue={pageSize}
                          style={{width: 100, marginRight: 6}}
                          onChange={pageSizeSelect.bind(this)}
                >
                    <NCOption value={5}>5条/页</NCOption>
                    <NCOption value={10}>10条/页</NCOption>
                    <NCOption value={20}>20条/页</NCOption>
                    <NCOption value={50}>50条/页</NCOption>
                    <NCOption value={100}>100条/页</NCOption>
                </NCSelect>

                {pageInfo ? <Pagination
                    className="Pagination"
                    first
                    last
                    prev
                    next
                    boundaryLinks
                    items={totalPage}   //总页数
                    maxButtons={5}  //显示最多页数按钮
                    activePage={pageIndex}
                    onSelect={pageIndexChanges.bind(this)}
                /> : ""}
            </Col>
        </div>
    );
}

