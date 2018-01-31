/**
 * Table组件的封装
 * yanggqm
 * 2018/01/10
 * 备注：
 * 		1、表格分为三类( 展示类简单表格  编辑性表格  主子拓展性表格)
 * 		   createSimpleTable    展示类简单表格
 * 		   createEditableTable  编辑性表格
 * 		   createExpandTable    主子扩展性表格
 */

import React, { Component } from 'react';
import Table from '../../base/nc_Table';
import FormControl from '../../base/nc_FormControl';
import Number from '../../base/nc_Number';
import Pagination from '../../base/nc_Pagination';
import Checkbox from '../../base/nc_Checkbox';
import DatePicker from '../../base/nc_DatePicker';
import Select from '../../base/nc_Select';
import Button from '../../base/nc_Button';
import Icon from '../../base/nc_Icon';
import Form from '../../base/nc_Form';
import ModelForm from './modelForm';
import NoData from './noData';

const FormItem = Form.FormItem,
	Option = Select.NCOption;

import {
	InputItem,
	NumberItem,
	RadioItem,
	CheckboxItem,
	SelectItem,
	TextAreaItem,
	DateTimePickerItem
} from '../../base/nc_FormItems';

import './index.less';

let defaultPageSize = {}, pageFlag = {};
// 默认配置信息
const CONFIG = {
	// 当默认的pagSize不是10的话，需要新建option信息
	PAGE_SIZE: {
		default: 10
	},
	// 分页最多显示几个页码
	MAX_BUTTONS: 5,
	// table渲染的时候需要进行format  TODO 需要指定的是 display和value 而不存在label
	TRANS_TYPE: [ 'select', 'radio', 'checkbox', 'refer']
};

function checkHasIndex(arr) {
	return arr.some((item) => {
		return item.key == 'numberindex';
	});
}

// 解析select
function typeFormat(type, temp, options) {
	// options里面的对应项 TODO select显示dislay
	if(isNaN(+temp)) {
		return temp
	}
	let cons = options.find((item) => item.value == temp);
	return cons && cons.display;
}

function isObj(param) {
	return Object.prototype.toString.call(param).slice(8, -1) === 'Object';
}

function scaleFormat(originObj) {
	if (isObj(originObj) && originObj['scale'] > 0) {
		return { ...originObj, value: numRounding(+originObj['value'], +originObj['scale']) };
	}
	return originObj;
}

function numRounding(value, scale) {
	// TODO 算法  数据类型
	return value.toFixed(scale);
}

// 转化传入的 meta.pagination 输出的 pageSize 为上述三种情况
function _transPagination(origin) {
	if (!origin) {
		return {};
	}
	// pageSize 可能是undefined或者数字
	let { pageSize } = origin;
	return {
		pageSize: pageSize ? +pageSize : 'default'
	};
}

export function createSimpleTable(moduleId) {
	// 获取table的meta信息 注意异步时候 meta中没有此id 为undefined
	var meta = this.state.meta[moduleId],
		maxPage = 1,
		columns;

	if (!meta) return;

	if (!this.state.table.hasOwnProperty(moduleId)) {
		// 做一步缓冲 保证moduleId写入table，并保证格式一致性
		this.state.table[moduleId] = {
			pageinfo: {},
			rows: [],
			model: null,
			origin: null,
			operType: null
		};
		defaultPageSize[moduleId] = null;
		pageFlag[moduleId] = false; 
	}

	// 如果moduleType 不是table 那么 提示并退出
	if (meta.moduleType !== 'table') {
		// TODO 警告提示
		alert(`此${moduleId}和所对应的类型不匹配`);
		//NCMessage.create({ content: `此${moduleId}和所对应的类型不匹配`, color: 'danger' });
		return false;
	}

	// 序号开关 TODO 先用true来代表 默认始终显示序号
	if (true && !checkHasIndex(meta.columns)) {
		meta.columns.unshift({
			label: '序号',
			key: 'numberindex',
			itemType: 'label',
			width: '50px'
		});
	}

	columns = meta.columns.map((item) => {
		let renderType = CONFIG.TRANS_TYPE.includes(item.itemType) ? '.display' : '.value';
		return { ...item, title: item.label, dataIndex: item.key + renderType };
	});

	let { pageinfo = {}, rows = [], model = null, origin = null, operType = null } = this.state.table[moduleId];

	let { size, totalElements, number } = pageinfo || {
		size: 0,
		totalElements: 0,
		number: 1
	};

	/**
		 * 三种情况： 得到默认的 pageSize
		 * 	1、pagination: false           不含分页信息                       undefined
		 * 	2、pagination: true/{}         含分页信息  但是分页信息是默认        'default'
		 * 	3、pagination: {pageSize: 10}  含分页信息  分页pageSize默认为10     Number(10)
		*/
	if (!pageFlag[moduleId]) {
		let { pageSize } = _transPagination(meta.pagination);
		defaultPageSize[moduleId] = pageSize;
		size = defaultPageSize[moduleId]
			? defaultPageSize[moduleId] === 'default' ? CONFIG.PAGE_SIZE['default'] : defaultPageSize[moduleId]
			: defaultPageSize[moduleId] || 10;
		if (this.state.table[moduleId].pageinfo) this.state.table[moduleId].pageinfo.size = size;
	}

	let dataRows = rows.map((item, index) => {
		// 通过meta信息对rows进行format
		let tempArr = [];
		let temp = '',
			options,
			value;

		columns &&
			columns.forEach((column) => {
				// 如果类型是 select radio checkbox 需要做format映射
				if (CONFIG.TRANS_TYPE.includes(column.itemType)) {
					// 那个key键
					temp = column.key;

					// 当前选项 TODO
					options = column.options;

					// 当前值
					value = item.values[temp]['value'];
				}

				if (temp) {
					item.values[temp]['display'] = typeFormat(column.itemType, value, options);
				}
			});

		let values = item.values,
			obj = {};
		obj.rowId = {
			display: null,
			scale: -1,
			value: item.rowId
		};

		obj.numberindex = {
			display: null,
			scale: -1,
			value: index + 1
		};

		// TODO 根据id来赋值key
		obj.key = index.toString();

		for (let key in values) {
			obj[key] = scaleFormat(values[key]);
		}
		return obj;
	});

	maxPage = Math.ceil(totalElements / size) || 1;
	
	let renderCol = columns.map(item => {
		var tempVal;
		if (origin) {
			let keyword = item.key;
			let objVal = origin[keyword]
			tempVal = isObj(objVal) && objVal.value
		}
		return { ...item, value: (tempVal || '') }
	})

	let formMeta = {
		moduleId,
		renderCol,
		id: origin ? origin.id.value : null
	}

	// console.log(defaultPageSize[moduleId])
	return (
		<div className="simple-table-wrap">
			<div className="simple-table">
				<Table columns={columns} data={dataRows} emptyText={NoData} />
			</div>
			{!!defaultPageSize[moduleId] && (
				<div className="table-pagination-group">
					<div className="page-size">
						<Select
							value={size && size.toString()}
							style={{ width: 85, marginRight: 10 }}
							onSelect={(val) => {
								pageFlag[moduleId] = true;
								this.state.table[moduleId].pageinfo.size = +val;
								this.state.table[moduleId].pageinfo.number = 1;
								this.handlePageInfoChange({ ...this.props, ...this.output });
							}}
							className="fl">
							<Option value={'10'}>10条/页</Option>
							<Option value={'20'}>20条/页</Option>
							<Option value={'50'}>50条/页</Option>
							<Option value={'100'}>100条/页</Option>
						</Select>
						<span className="fl"> 共 {totalElements} 条 </span>
					</div>

					{size >= 10 && (
						<div className="table-pagination">
							<Pagination
								prev
								next
								boundaryLinks
								items={maxPage}
								maxButtons={CONFIG.MAX_BUTTONS}
								activePage={number+1}
								onSelect={(val) => {
									pageFlag[moduleId] = true;
									this.state.table[moduleId].pageinfo.number = val;
									this.handlePageInfoChange({ ...this.props, ...this.output });
								}}
							/>
						</div>
					)}
				</div>
			)}
			<ModelForm 
				showModal={!!model}
				type={operType}
				meta={formMeta}
				closeModel={this.table.closeModel}
				tableModelConfirm={this.tableModelConfirm}
			/>
		</div>
	);
}
