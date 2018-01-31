import React, { Component } from 'react';
import Uitls from './Form/utils';
import '../public/toFixed';
import {
	createForm,
	createItem,
	getAllFormValue,
	setAllFormValue,
	getFormItemsValue,
	setFormItemsValue,
	getFormItemsDisabled,
	setFormItemsDisabled,
	setFormItemsRequired,
	getFormItemsRequired,
	setFormItemsVerify,
	getFormItemsVerify,
	EmptyAllFormValue,
	getAllRequiredItems,
	getCacheFormData,
	setCacheFormData,
	isCheckNow,
	formShow,
	formHide
} from './Form';
import { createButton, setButtonDisabled, getButtonDisabled } from './Button';
import moment from 'moment';
import { createAnchorNav, addListenerScroll, removeListenerScroll } from './AnchorNav';
import {
	createSimpleTable,
	getTablePageInfo,
	setAllTableData,
	setTableRender,
	openModel,
	closeModel,
	getAllTableData
} from './Table';
import {
	createEditTable,
	setTableData,
	getAllRows,
	setStatus,
	addRow,
	delRow,
	getChangedRows,
	edit,
	cancelEdit,
	save
} from './EditTable';

import { NCCreateSearch, setSearchValue, setSearchValByField, getAllSearchData } from './CreateSearch';
import { createSimpleSearch, getSimpleSearchValue } from './SimpleSearch';
import { createInsertTable, getInsertTableValue, setInsertTableValue } from './InsertTable';
import Qs from 'qs';

export default ({
	moduleId,
	status = 'browse',
	onAfterEvent,
	onButtonClick,
	handlePageInfoChange,
	tableModelConfirm,
	searchButtonClick,
	initTemplate
}) => (App) => {
	class Page extends Component {
		constructor(props) {
			super(props);
			this.state = {
				status,
				meta: {},
				form: {},
				cacheform: {},
				button: {},
				table: {},
				anchorNav: {},
				insertTable: {}, //嵌套类型表格
				simpleSearch: {}
			};
			this.onAfterEvent = onAfterEvent;
			this.onButtonClick = onButtonClick;
			// table组件的修改pageInfo事件
			this.handlePageInfoChange = handlePageInfoChange;
			//简单查询组件查询事件
			this.searchButtonClick = searchButtonClick;

			//以下是提供给业务组的方法
			this.meta = {
				getMeta: () => {
					return this.state.meta;
				},
				setMeta: (meta) => {
					this.setState(
						{
							meta
						},
						function() {
							console.log(this.state);
						}
					);
				}
			};
			this.form = {
				createForm: createForm.bind(this),
				createItem: createItem.bind(this),
				getAllFormValue: getAllFormValue.bind(this),
				setAllFormValue: setAllFormValue.bind(this),
				getFormItemsValue: getFormItemsValue.bind(this),
				setFormItemsValue: setFormItemsValue.bind(this),
				setFormItemsDisabled: setFormItemsDisabled.bind(this),
				getFormItemsDisabled: getFormItemsDisabled.bind(this),
				setFormItemsRequired: setFormItemsRequired.bind(this),
				getFormItemsRequired: getFormItemsRequired.bind(this),
				setFormItemsVerify: setFormItemsVerify.bind(this),
				getFormItemsVerify: getFormItemsVerify.bind(this),
				EmptyAllFormValue: EmptyAllFormValue.bind(this),
				getAllRequiredItems: getAllRequiredItems.bind(this),
				getCacheFormData: getCacheFormData.bind(this),
				setCacheFormData: setCacheFormData.bind(this),
				isCheckNow: isCheckNow.bind(this),
				show: formShow.bind(this),
				hide: formHide.bind(this)
			};
			this.editTable = {
				createEditTable: createEditTable.bind(this),
				setTableData: setTableData.bind(this),
				addRow: addRow.bind(this),
				setStatus: setStatus.bind(this),
				getAllRows: getAllRows.bind(this),
				delRow: delRow.bind(this),
				getChangedRows: getChangedRows.bind(this),
				cancelEdit: cancelEdit.bind(this),
				edit: edit.bind(this),
				save: save.bind(this)
			};
			this.button = {
				createButton: createButton.bind(this),
				setDisabled: setButtonDisabled.bind(this),
				getDisabled: getButtonDisabled.bind(this)
			};
			this.anchorNav = {
				createAnchorNav: createAnchorNav.bind(this),
				addListenerScroll: addListenerScroll.bind(this),
				removeListenerScroll: removeListenerScroll.bind(this)
			};
			this.table = {
				createSimpleTable: createSimpleTable.bind(this),
				createEditTable: createEditTable.bind(this),
				getTablePageInfo: getTablePageInfo.bind(this),
				setAllTableData: setAllTableData.bind(this),
				openModel: openModel.bind(this),
				closeModel: closeModel.bind(this),
				// getAllTableData: getAllTableData.bind(this),
				// getTableData: getTableData.bind(this),
				setTableRender: setTableRender.bind(this)
			};

			//简单搜索
			this.simpleSearch = {
				createSimpleSearch: createSimpleSearch.bind(this),
				getSimpleSearchValue: getSimpleSearchValue.bind(this)
			};
			//查询区
			this.search = {
				NCCreateSearch: NCCreateSearch.bind(this),
				setSearchValue: setSearchValue.bind(this),
				setSearchValByField: setSearchValByField.bind(this),
				getAllSearchData: getAllSearchData.bind(this)
			};
			//嵌套类型表格
			this.insertTable = {
				createInsertTable: createInsertTable.bind(this), //创建嵌套类型表格
				getInsertTableValue: getInsertTableValue.bind(this), //获取表格数据
				setInsertTableValue: setInsertTableValue.bind(this) //更新表格数据
			};
			// 统一输出给业务组使用的api
			this.output = {
				editTable: this.editTable,
				form: this.form,
				table: this.table,
				button: this.button,
				setPageStatus: this.setPageStatus,
				getPageStatus: this.getPageStatus,
				meta: this.meta,
				simpleSearch: this.simpleSearch,
				search: this.search,
				insertTable: this.insertTable,
				anchorNav: this.anchorNav
			};

			if (tableModelConfirm && typeof tableModelConfirm === 'function') {
				this.tableModelConfirm = tableModelConfirm.bind(this, this.output);
			}
		}

		componentWillMount() {
			//select、datepicker、number、input、textarea
			//radio、checkbox、switch,label

			let meta = {
				investForm: {
					moduleType: 'form',
					templet: null,
					items: [
						{
							key: 'investtype',
							label: '存款类型',
							itemType: 'select',
							disabled: false,
							visible: true,
							col: 6,
							rows: 3,
							leftOffset: 6,
							rightOffset: 6,
							scale: null,
							required: true,
							maxLength: null,
							unit: '%',
							ratio: '0.01',
							formatType: null,
							options: [
								{
									display: '活期',
									value: '0'
								},
								{
									display: '三个月',
									value: '1'
								},
								{
									display: '半年',
									value: '2'
								}
							]
						}
					]
				},
				investTable: {
					moduleType: 'table',
					pagination: false,
					columns: [
						{
							key: 'investtype',
							label: '存款类型',
							itemType: 'select',
							disabled: false,
							visible: true,
							scale: null,
							required: true,
							maxLength: null,
							unit: '%',
							ratio: '0.01',
							formatType: null,
							width: null,
							options: [
								{
									display: '活期',
									value: 0
								},
								{
									display: '三个月',
									value: 1
								},
								{
									display: '半年',
									value: 2
								}
							]
						}
					]
				},
				investSearch: {
					moduleType: 'search',
					items: [
						{
							key: 'bankname',
							label: '银行',
							itemType: 'text',
							initialValue: null
						},
						{
							key: 'investtype',
							label: '存款类型',
							itemType: 'select',
							initialValue: null,
							options: [
								{
									display: '活期',
									value: 0
								},
								{
									display: '三个月',
									value: 1
								},
								{
									display: '一年',
									value: 2
								},
								{
									display: '三年',
									value: 3
								},
								{
									display: '五年',
									value: 4
								}
							]
						},
						{
							key: 'beginmny',
							label: '起始理财金额',
							itemType: 'text',
							initialValue: null
						},
						{
							key: 'endmny',
							label: '截止理财金额',
							itemType: 'text',
							initialValue: null
						},
						{
							key: 'begindate',
							label: '起始购买日期',
							itemType: 'date',
							initialValue: null
						},
						{
							key: 'enddate',
							label: '截止购买日期',
							itemType: 'date',
							initialValue: null
						}
					]
				},
				form3: {
					moduleType: 'form',
					items: [
						{
							label: '用户名',
							key: 'userName',
							config: {},
							initialValue: '张飞',
							required: true,
							verify: true,
							reg: /^[0-9|,]*(\.\d{0,4})?$/i,
							itemType: 'input'
						},
						{
							label: '出生日期',
							key: 'birthday',
							config: {
								// disabled: true
							},
							initialValue: moment().format('YYYY-MM-DD'),
							required: true,
							verify: true,
							type: 'datepicker',
							itemType: 'datepicker'
						},
						{
							label: '备注',
							key: 'note',
							config: {},
							initialValue: '',
							cols: 50,
							rows: 6,
							required: true,
							verify: true,
							type: 'textarea',
							itemType: 'textarea'
						},
						{
							label: '参照',
							key: 'myrefer',
							config: {
								refcode: 'bank'
								// disabled: true
							},

							initialValue: '',
							cols: 50,
							rows: 6,
							required: true,
							verify: true,
							type: 'refer',
							itemType: 'refer'
						},
						{
							label: '总金额',
							key: 'allMoney',
							config: {
								// disabled: true
							},

							initialValue: '',
							required: true,
							verify: true,
							type: 'number',
							itemType: 'number'
						},
						{
							key: 'interstrate',
							label: '年化收益率%',
							itemType: 'number',
							suffix: '%',
							scale: 4,
							verify: true,
							required: true
						},
						{
							key: 'iinterstrate',
							label: '第一个年化收益率%',
							itemType: 'label',
							suffix: '%',
							initialValue: 20.00100003,
							scale: 4,
							verify: true,
							required: true
						},
						{
							key: 'investmny',
							label: '投资金额',
							itemType: 'number',
							scale: 2,
							verify: true,
							required: true
						},
						{
							label: '水果',
							key: 'fruit',
							type: 'radio',
							required: true,
							verify: true,
							config: {
								// disabled: true
							},
							initialValue: 'apple',
							itemType: 'radio',
							options: [
								{
									display: '苹果',
									value: 'apple'
								},
								{
									display: '橘子',
									value: 'orange'
								},
								{
									display: '梨',
									value: 'pear'
								},
								{
									display: '香蕉',
									value: 'banana'
								}
							]
						},
						{
							label: '蔬菜',
							key: 'vegetabless',
							itemType: 'select',
							required: true,
							verify: true,
							config: {
								// disabled: true
							},

							initialValue: 'cucumber',
							options: [
								{
									display: '茄子',
									value: 'eggplant'
								},
								{
									display: '黄瓜',
									value: 'cucumber'
								},
								{
									display: '冬瓜',
									value: ' waxgourd'
								},
								{
									display: '白菜',
									value: 'chinesecabbage'
								}
							]
						},
						{
							label: '蔬菜',
							key: 'vegetables',
							itemType: 'checkbox',
							required: true,
							verify: true,
							config: {
								// disabled: true
							},

							initialValue: 'eggplant',
							options: [
								{
									display: '茄子',
									value: 'eggplant'
								},
								{
									display: '黄瓜',
									value: 'cucumber'
								},
								{
									display: '冬瓜',
									value: ' waxgourd'
								},
								{
									display: '白菜',
									value: 'chinesecabbage'
								}
							]
						}
					]
				},
				form4: {
					moduleType: 'form',
					items: [
						{
							label: '邮箱',
							key: 'email',
							config: {
								// disabled: true
							},

							initialValue: 'email@yonyou.com',
							verify: true,
							required: true,
							itemType: 'input'
						},
						{
							label: '手机',
							key: 'teliphone',
							required: true,
							verify: true,
							config: {
								// disabled: true
							},
							initialValue: '11111000',
							itemType: 'input'
						}
					]
				},
				form5: {
					moduleType: 'form',
					required: true,
					items: [
						{
							key: 'name',
							label: '公司名称',
							itemType: 'input',
							initialValue: 'today',
							disabled: true,
							required: true,
							verify: true
						},
						{
							key: 'investDate',
							label: '投资日期',
							itemType: 'datepicker',
							initialValue: 'today',
							disabled: true,
							required: true,
							verify: true
						},
						{
							key: 'investInterval',
							label: '投资间隔',
							itemType: 'radio',
							initialValue: 'today',
							disabled: true,
							required: false,
							verify: true,
							options: [
								{
									display: '活期',
									value: '0'
								},
								{
									display: '三个月',
									value: '1'
								},
								{
									display: '半年',
									value: '2'
								}
							]
						}
					]
				}
			};

			// 初始化模板，调用业务组初始化模板的方法
			if (initTemplate && typeof initTemplate === 'function') {
				meta = initTemplate({ ...this.props, ...this.output });
				console.log(meta);
			}

			// 设置模板信息
			this.setState(
				{
					meta: meta
				},
				() => {
					console.log(this.state.meta);
				}
			);
		}

		setPageStatus = (type, id) => {
			if ([ 'edit', 'add', 'browse' ].includes(type)) {
				let { cacheform } = this.state;
				//改变页面url
				let hash = window.location.hash.split('?'),
					query = Qs.parse(hash[1]);
				query = { ...query, type, id };
				hash[1] = Qs.stringify(query);
				window.location.hash = hash.join('?');

				//浏览态到其他状态缓存表单state数据
				if (this.state.status == 'browse' && type != 'browse') {
					cacheform = Uitls.deepClone(this.state.form);
				}

				// 改变页面状态
				this.setState(
					{
						status: type,
						cacheform: cacheform
					},
					() => {
						console.log(this.state.status);
					}
				);
			}
		};
		getPageStatus = () => {
			return this.state.status;
		};

		render() {
			return <App ref="parent" {...this.props} {...this.output} />;
		}
	}
	return Page;
};
