import React, { Component } from 'react';
import Table from '../../base/nc_Table';
import FormControl from '../../base/nc_FormControl';
import Number from '../../base/nc_Number';
import Checkbox from '../../base/nc_Checkbox';
import DatePicker from '../../base/nc_DatePicker';
import Select from '../../base/nc_Select';
const Option = Select.NCOption;

export function createEditTable(moduleId) {
	// 获取table的meta信息 注意异步时候 meta中没有此id 为undefined
	var meta = this.state.meta[moduleId],
		columns,
		that = this;

	if (!meta || meta.moduleType !== 'table') return;

	if (!this.state.table.hasOwnProperty(moduleId)) {
		// 做一步缓冲 保证moduleId写入table，并保证格式一致性
		this.state.table[moduleId] = {
			pageinfo: {},
			rows: []
		};
	}

	let defaultWidth = 100 / meta.columns.length + '%',
		defaultHeight = '40px';

	columns = meta.columns.map((item) => {
		item.width = item.width || defaultWidth;
		item.title = item.title || item.label;
		delete item.lable;
		var render = (text, record, index) => {
			let editItem, value, display;
			switch (item.itemType) {
				case 'input':
					editItem = <FormControl />;
					break;
				case 'number':
					editItem = <Number />;
					break;
				case 'checkbox':
					editItem = <Checkbox />;
					break;
				case 'select':
					value = record.values[item.key].value;
					display =
						record.values[item.key].display || item.options[record.values[item.key].value || 0].display;
					editItem = (
						<Select value={value}>
							{item.options.map((e, i) => {
								return <Option value={e.value}>{e.display}</Option>;
							})}
						</Select>
					);
					break;
				case 'datepicker':
					editItem = <DatePicker />;
					break;
				case 'refer':
					value = {
						refname: record.values[item.key].display,
						refpk: record.values[item.key].value
					};
					editItem = <Refer />;
					break;
				default:
					break;
			}
			function createTableItem(config = {}) {
				let {
					initialValue = '',
					valuePropName = 'value',
					changeTrigger = 'onChange',
					focusTrigger = 'onFocus',
					disabled = false
				} = config;
				if (!editItem) return null;
				return {
					...editItem,
					props: {
						...editItem.props,
						[valuePropName]:
							value || record.values[item.key].display || record.values[item.key].value || '',
						[changeTrigger]: (value) => {
							let i = this.state.table[moduleId].rows.findIndex((e) => e.rowId === record.rowId);
							this.state.table[moduleId].rows[i].values[item.key].value = value.value || value;
							// 把status置为1，标识修改
							this.state.table[moduleId].rows[i].status = 1;
							this.setState(
								{
									table: this.state.table
								},
								() => {
									this.onAfterEvent(
										{ ...this.props, ...this.output },
										moduleId,
										item.key,
										this.state.table[moduleId].rows[i].values[item.key]
									);
								}
							);
						}
					}
				};
			}
			//编辑态且该列可编辑 or
			return item.itemType !== 'label' && meta.status === 'edit' ? (
				createTableItem.call(that)
			) : (
				<div>
					{record.values[item.key] ? (
						display || record.values[item.key].display || record.values[item.key].value
					) : (
						''
					)}
				</div>
			);
		};

		return { render, ...item };
	});
	return (
		<Table data={this.state.table[moduleId].rows.filter((e) => e.status != 3)} columns={columns} rowKey={'rowId'} />
	);
}
