import React, { Component } from 'react';
import Form from 'bee-form';
import moment from 'moment';
import 'bee-form/build/Form.css';
import 'tinper-bee/build/index.css';
import './nc_form.less';
const FormItem = Form.FormItem;
import Uitls from './utils';

import {
	InputItem,
	NumberItem,
	RadioItem,
	CheckboxItem,
	SelectItem,
	SwitchItem,
	TextAreaItem,
	DateTimePickerItem,
	ReferItem
} from '../../base/nc_FormItems';


/**
 * 创建表单域
 * @param meta 模板json数据
 */
export function createForm(moduleId) {
	let meta = this.state.meta[moduleId];
	let { status } = this.state;

	if (!this.state.form.hasOwnProperty(moduleId)) {
		//初始化
		this.state.form[moduleId] = {};
	}
	if (meta && meta.moduleType && meta.moduleType == 'form') {
		meta = meta.items;
		let stateInitialValue = {};
		// for(let i=0;i<meta.length;i++){
		// 	if(meta[i].initialValue){
		// 		stateInitialValue[meta[i].id] = {};
		// 		stateInitialValue[meta[i].id].value = meta[i].initialValue;
		//    	}
		// }
		//console.log(stateInitialValue)
		if (!this.state.form.hasOwnProperty(moduleId)) {
			//设置默认值
			this.state.form[moduleId] = stateInitialValue;
		}
	}

	return meta ? (
		<Form
			showSubmit={false}
			checkFormNow={false}
			useRow={true}
			className='nc-form-wrapper'
			submitCallBack={() => {
				console.log('submitCallBack');
			}}
		>
			{meta.map((item, i) => {

				switch (item.itemType) {
					case 'input':
						return (
							<FormItem
								key={i}
								inline={true}
								labelXs={2}
								labelSm={2}
								labelMd={2}
								xs={4}
								md={4}
								sm={4}
								showMast={item.required}
								labelName={item.label}
							>
								{createItem.bind(this)(moduleId, item.key, item.config)(
									<InputItem
										name={item.key}
										disabled={item.disabled}
										pagestatus={ status }
										verify={item.verify}
										isrequired={item.required || false }
										reg={item.reg}
										ischecknow={!!item.isCheckNow}
										errormessage={item.errorMessage || ''}
										type="customer"
									/>
								)}
							</FormItem>
						);
					case 'label':
						return (
							<FormItem
								key={i}
								inline={true}
								labelXs={2}
								labelSm={2}
								labelMd={2}
								xs={4}
								md={4}
								sm={4}
								showMast={item.required}
								labelName={item.label}
							>
								{createItem.bind(this)(moduleId, item.key, item.config)(
									<InputItem
										name={item.key}
										disabled={item.disabled}
										pagestatus={ status }
										verify={item.verify}
										scale={ item.scale }
										isrequired={item.required || false }
										isViewMode
										reg={item.reg}
										ischecknow={!!item.isCheckNow}
										errormessage={item.errorMessage || ''}
										type="customer"
									/>
								)}
							</FormItem>
						);
					case 'number':
						return (
							<FormItem
								key={i}
								inline={true}
								labelXs={2}
								labelSm={2}
								labelMd={2}
								xs={4}
								md={4}
								sm={4}
								showMast={item.required}
								labelName={item.label}
							>
								{createItem.bind(this)(moduleId, item.key, item.config)(
									<NumberItem
										name={item.key}
										disabled={item.disabled}
										pagestatus={ status }
										verify={item.verify}
										suffix={item.suffix}
										scale={ item.scale }
										reg={item.reg}
										isrequired={item.required || false}
										ischecknow={!!item.isCheckNow}
										errormessage={item.errorMessage}
										type="customer"
									/>
								)}
							</FormItem>
						);
					case 'textarea':
						return (
							<FormItem
								key={i}
								inline={true}
								labelXs={2}
								labelSm={2}
								labelMd={2}
								xs={4}
								md={4}
								sm={4}
								showMast={item.required}
								labelName={item.label}
							>
								{createItem.bind(this)(moduleId, item.key, item.config)(
									<TextAreaItem
										name={item.key}
										disabled={item.disabled}
										pagestatus={ status }
										verify={item.verify }
										isrequired={item.required || false}
										cols={item.cols}
										rows={item.rows}
										reg={item.reg}
										ischecknow={!!item.isCheckNow}
										errormessage={item.errorMessage}
										type="customer"
									/>
								)}
							</FormItem>
						);
					case 'radio':
						return (
							<FormItem
								key={i}
								inline={true}
								labelXs={2}
								labelSm={2}
								labelMd={2}
								xs={4}
								md={4}
								sm={4}
								showMast={item.required}
								labelName={item.label}
							>
								{createItem.bind(this)(moduleId, item.key, item.config)(
									<RadioItem
										name={item.key}
										disabled={item.disabled}
										isrequired={item.required || false}
										pagestatus={ status }
										verify={ item.verify}
										type="customer"
										items={item.options}
									/>
								)}
							</FormItem>
						);
					case 'checkbox':
						return (
							<FormItem
								key={i}
								inline={true}
								labelXs={2}
								labelSm={2}
								labelMd={2}
								xs={4}
								md={4}
								sm={4}
								showMast={item.required}
								labelName={item.label}
							>
								{createItem.bind(this)(moduleId, item.key, item.config)(
									<CheckboxItem
										name={item.key}
										disabled={item.disabled}
										isrequired={item.required || false}
										pagestatus={ status }
										verify={ item.verify}
										type="customer"
										items={item.options}
									/>
								)}
							</FormItem>
						);
					case 'select':
						return (
							<FormItem
								key={i}
								inline={true}
								labelXs={2}
								labelSm={2}
								labelMd={2}
								xs={4}
								md={4}
								sm={4}
								showMast={item.required}
								labelName={item.label}
							>
								{createItem.bind(this)(moduleId, item.key, item.config)(
									<SelectItem
										name={item.key}
										disabled={item.disabled}
										verify={ item.verify}
										isrequired={item.required || false}
										pagestatus={ status }
										items={item.options}
										type="customer"
									/>
								)}
							</FormItem>
						);
					case 'datepicker':
						return (
							<FormItem
								key={i}
								inline={true}
								labelXs={2}
								labelSm={2}
								labelMd={2}
								xs={4}
								md={4}
								sm={4}
								showMast={item.required}
								labelName={item.label}
							>
								{createItem.bind(this)(moduleId, item.key, item.config)(
									<DateTimePickerItem
										name={ item.key }
										type="customer"
										pagestatus={ status }
										disabled={item.disabled}
										isrequired={item.required || false}
										verify={ item.verify }
										format={item.format || 'YYYY-MM-DD'}
										placeholder={ item.placeholder || '请选择合适的日期!'}
									/>
								)}
							</FormItem>
						);
					case 'switch':
						return (
							<FormItem
								key={i}
								inline={true}
								labelXs={2}
								labelSm={2}
								labelMd={2}
								xs={4}
								md={4}
								sm={4}
								showMast={item.required}
								labelName={item.label}
							>
								{createItem.bind(this)(moduleId, item.key, item.config)(
									<SwitchItem
										name={ item.key }
										type="customer"
										verify={ item.verify }
										checkedChildren={'√'}
										unCheckedChildren={'×'}
										pagestatus={ status }
										disabled={item.disabled}
									/>
								)}
							</FormItem>
						);
					case 'refer':
						return (
							<FormItem
								key={i}
								inline={true}
								labelXs={2}
								labelSm={2}
								labelMd={2}
								xs={4}
								md={4}
								sm={4}
								showMast={item.required}
								labelName={item.label}
							>
								{createItem.bind(this)(moduleId, item.key, item.config)(
									<ReferItem
										name={ item.key }
										type="customer"
										refcode={ item.config.refcode}
										isrequired={item.required || false}
										pagestatus={ status }
										verify={ item.verify}
										disabled={item.disabled}
									/>
								)}
							</FormItem>
						);
					default:
						break;
				}
				
			})}
		</Form>
	) : // meta.map((item, i) => {
	// 		switch (item.type) {
	// 			case 'input':
	// 				return (
	// 					<FormItem label={item.label} key={i}>
	// 						{createItem.bind(this)(moduleId, item.id, item.config)(<NCInput type={item.inputType} />)}
	// 					</FormItem>
	// 				);
	// 			default:
	// 				break;
	// 		}
	// 	})

	null;
}

/**
 * 创建表单项
 * @param id 控件的唯一标识
 * @param initialValue 初始值
 * @param valuePropName 代表组件值的属性，如Switch的是'checked'
 * @param trigger 收集子节点值的方法
 */
export function createItem(moduleId = '', itemId = '', config = {}) {
	
	let {
		initialValue = '',
		valuePropName = 'value',
		changeTrigger = 'onChange',
		focusTrigger = 'onFocus',
		disabled = false
	} = config;

	
	//字段模板
	let curMetaItem = null;
	this.state.meta[moduleId]['items'].forEach((v, i, a) => {
		if (v.key == itemId) {
			curMetaItem = v;
		}
	})

	//字段值state
	let curFormItem = this.state.form[moduleId][itemId] = { value: curMetaItem.initialValue, ...this.state.form[moduleId][itemId] };



	if (this.state.verifyNow) {
		
	}
	
	// if (!this.state.form[moduleId].hasOwnProperty(itemId)) {
	// 	//初始化
	// 	this.state.form[moduleId][itemId] = { value: initialValue, disabled };
	// }




	
	return (Item) => {

		//@TODO devmode invalid code 
		if (itemId == 'myrefer') {
			console.log(this.state.form[moduleId], 'myrefer')
		}

		Item = {
			...Item,
			props: {
				...Item.props,
				// [valuePropName]: this.state.form[moduleId][itemId].value,
				[valuePropName]: curFormItem,
				[changeTrigger]: (obj) => {
					let finalValue;

					if (Uitls.isObject(obj)) {
						
						Uitls.emptyObject(curFormItem);

						curFormItem = Object.assign(curFormItem, obj);

						console.log(this.state, obj, curFormItem,'this.state');
						finalValue = obj.value;
						curMetaItem.verify = obj.verify;
						curFormItem.display = obj.display || null;
						curMetaItem.isCheckNow = obj.isCheckNow;
					} else {
						finalValue = obj;
					}

					//值和校验信息的更新
					curFormItem.value = finalValue ;
					curFormItem.verify = obj && obj.verify;


					this.setState(
						{
							form: this.state.form
						},
						() => {
							this.onAfterEvent(
								{ ...this.props, form: this.form, button: this.button, table: this.table },
								moduleId,
								itemId,
								finalValue
							);
						}
					);
				},
				// disabled: this.state.form[moduleId][itemId].disabled,
				show: curFormItem.show
			}
		};
		return Item;
	};
}
