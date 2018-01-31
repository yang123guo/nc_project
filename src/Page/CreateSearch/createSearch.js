/**
 * Created by wangshhj on 2018/1/11.
 */
import React, { Component } from 'react';
import NCSelect from '../../base/nc_Select';
import { FormControl, Con, Row, Col } from 'tinper-bee';
import NCIcon from '../../base/nc_Icon';
import NCButton from '../../base/nc_Button';
import NCDatePicker from '../../base/nc_DatePicker';
import DatePicker from 'bee-datepicker';
import './createSearch.less';
import moment from 'moment';
const NCOption = NCSelect.NCOption;

import { DemoRefer as Refer } from '../../../src/containers/Refer';

const { RangePicker } = DatePicker;

let ConstSearchInfo = {};
export default function NCCreateSearch(id, clickSearchBtn) {
	if (!this.state.meta) {
		return false;
	}
	if (!(this.state.meta[id] && JSON.stringify(this.state.meta[id]) !== '{}')) {
		return false;
	}
	let searchInfo = this.state.meta[id];
	if (!ConstSearchInfo.hasOwnProperty(id)) {
		searchInfo.hideSearch = searchInfo.items.length > 6; //查询区大于一行，隐藏多余行
		searchInfo.isShowSearchBtn = searchInfo.items.length > 6; //是否显示三角按钮
		ConstSearchInfo[id] = JSON.stringify(searchInfo);
	}

	//更新查询区数据
	let setStateEve = (callBack) => {
		this.state.meta[id] = searchInfo;
		this.setState(
			{
				meta: this.state.meta
			},
			function() {
				if (callBack) {
					callBack();
				}
			}
		);
	};

	//input输入改变,更新state
	let onValueChanges = (index, val) => {
		searchInfo.items[index].initialValue = val;
		setStateEve();
	};

	//select改变，更新state
	let onSelectedChange = (index, val) => {
		if (val == '-1') {
			searchInfo.items[index].initialValue = null;
		} else {
			searchInfo.items[index].initialValue = val;
		}
		setStateEve();
	};

	//查询按钮事件
	let clickSearch = () => {
		let callBackMeta = {};
		searchInfo.items.map((val, index) => {
			if (val.itemType == 'rangePicker' && val.initialValue) {
				let vals = val.initialValue;
				let newVal = [];
				vals.map(function(value) {
					newVal.push(value.format('YYYY-MM-DD'));
				});
				callBackMeta[val.key] = newVal;
			} else if (val.itemType == 'select') {
				callBackMeta[val.key] = val.initialValue ? val.initialValue : null;
			} else if (val.itemType == 'refer') {
				let ref = null;
				if (val.initialValue) {
					if (val.initialValue.hasOwnProperty('refpk')) {
						ref = val.initialValue.refpk;
					}
				}
				callBackMeta[val.key] = ref;
			} else {
				callBackMeta[val.key] = val.initialValue ? val.initialValue : null;
			}
		});
		if (clickSearchBtn) {
			clickSearchBtn(callBackMeta);
		}
	};

	//重置按钮事件
	let resetEvent = () => {
		searchInfo = JSON.parse(ConstSearchInfo[id]);
		searchInfo.items.find((val) => {
			if (val.field == 'RangDate' && !val.value) {
				val.value = '';
			}
		});
		this.state.meta[id] = searchInfo;
		setStateEve();
	};

	//日期选择事件
	let onDateChange = (index, date) => {
		searchInfo.items[index].initialValue = date;
		setStateEve();
	};

	//区间类型日期事件
	let onRangDateChange = (index, date) => {
		searchInfo.items[index].initialValue = date;
	};

	let onDateSelect = (data) => {};

	//参照更改事件
	let referChangeEve = (index, val) => {
		searchInfo.items[index].initialValue = val;
		setStateEve();
	};

	//生成查询表单
	let createDom = (value) => {
		return value.map((data, index) => {
			let type = data.itemType;
			let md = 2;
			let sm = 3;
			let xs = 4;
			switch (type) {
				case 'refer':
					return (
						<Col md={md} xs={xs} sm={sm} key={index} className="searchChild">
							<Refer
								refCode={'bank'}
								placeholder={data.label}
								value={data.initialValue ? data.initialValue : ''}
								onChange={referChangeEve.bind(this, index)}
							/>
						</Col>
					);
				case 'input':
					return (
						<Col md={md} xs={xs} sm={sm} key={index} className="searchChild">
							<FormControl
								value={data.initialValue ? data.initialValue : ''}
								placeholder={data.label}
								onChange={onValueChanges.bind(this, index)}
							/>
						</Col>
					);
					break;
				case 'select':
					return (
						<Col md={md} xs={xs} sm={sm} key={index} className="searchChild">
							<NCSelect
								value={data.initialValue ? data.initialValue : undefined}
								style={{ marginRight: 6 }}
								placeholder={data.label}
								onChange={onSelectedChange.bind(this, index)}
							>
								<NCOption key={-1} value={-1} style={{ color: '#00b39e' }}>
									清空
								</NCOption>
								{data.options.map((val, index) => {
									return (
										<NCOption key={index} value={String(val.value)}>
											{val.display}
										</NCOption>
									);
								})}
							</NCSelect>
						</Col>
					);
					break;
				case 'datepicker':
					const format = 'YYYY-MM-DD';
					return (
						<Col md={md} xs={xs} sm={sm} key={index} className="searchChild">
							<NCDatePicker
								format={format}
								onSelect={onDateSelect}
								onChange={onDateChange.bind(this, index)}
								// locale={zhCN}
								value={data.initialValue}
								placeholder={data.label}
							/>
						</Col>
					);
					break;
				case 'rangepicker':
					const Rangformat = 'YYYY-MM-DD';
					let date = data.initialValue ? data.initialValue : '';
					let newDate = [];
					if (date.length > 1) {
						date.map((val) => {
							newDate.push(moment(val));
						});
					}
					return (
						<Col md={md} xs={xs} sm={sm} key={index} className="searchChild">
							<RangePicker
								format={Rangformat}
								onSelect={onDateSelect}
								onChange={onRangDateChange.bind(this, index)}
								// defaultValue={data.initialValue}
								defaultValue={newDate}
								placeholder={data.label}
							/>
						</Col>
					);
					break;
			}
		});
	};

	//查询区多于一行，隐藏
	let showMoreSearch = (props) => {
		if (!props) {
			return false;
		}
		return (
			<Col className="showMoreSearch">
				<NCIcon
					className=""
					type={searchInfo.hideSearch ? 'angle-arrow-down uf-arrow-down' : 'angle-arrow-down uf-arrow-up'}
					onClick={showSearchArea.bind(this)}
				/>
			</Col>
		);
	};

	//显示查询区隐藏行
	let showSearchArea = () => {
		if (searchInfo.hideSearch) {
			searchInfo.hideSearch = false;
		} else {
			searchInfo.hideSearch = true;
		}
		setStateEve();
	};

	//生成查询、重置按钮
	let createButton = () => {
		return (
			<Col md={2} sm={4} xs={6} className="NC_searchBtnArea">
				<button className="searchBtn" onClick={clickSearch}>
					查询
				</button>
				<div className="resetSearchBtn" onClick={resetEvent.bind(this)}>
					重置
				</div>
				{showMoreSearch(searchInfo.isShowSearchBtn)}
			</Col>
		);
	};

	return (
		<Row id={id ? id : 'searchArea_1'} className="NC_CreateSearch">
			<Col md={10} sm={8} xs={6} className={searchInfo.hideSearch ? 'hideMore' : ''}>
				{createDom(searchInfo.items)}
			</Col>
			{createButton()}
		</Row>
	);
}
