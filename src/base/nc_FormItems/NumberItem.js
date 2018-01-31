import React, { Component } from 'react';
// import { FormControl } from 'tinper-bee';
import FormControl from 'bee-form-control';
import PropTypes from 'prop-types';

const defaultReg = /^[0-9|,]*(\.\d{0,4})?$/i;
export default class NumberItem extends Component {

	handleChange = (e) => {
		const {
			onChange,
			processChange,
			scale = 4,
			value,
			reg = new RegExp('^[0-9|,]*(\\.\\d{0,' + scale + '})?$', 'i')
		} = this.props;
		let allowReg = new RegExp('^[0-9|,]*(\\.\\d{1,' + scale + '})?$', 'i');
		// if (!reg) {
		// 	reg = /^[0-9|,]*(\.\d{0,scale})?$/i;
		// }
		let verify = true,  aimValue = this.removeThousands(e || '');
		// const { onChange　} = this.props;
		// let value = e.target.value;
		// console.log('handleChangehandleChange');

		// if (processChange ) {
		// 	e = processChange(this.state, e);
		// }
	
		if (!reg.test(aimValue) && aimValue != '') {
			aimValue = value.value;
		}

		if (!allowReg.test(aimValue) && aimValue != '') {
			verify = false;
		}

		if (onChange) {
			// onChange(this.removeThousands(e || ''));
			onChange({
				value: aimValue,
				verify: verify,
				isCheckNow: true
			});
		}
	}

	handleBlur = (e) => {
		const {
			onChange,
			processChange,
			scale = 4,
			value,
			reg = new RegExp('^[0-9|,]*(\\.\\d{0,' + scale + '})?$', 'i'),
			isrequired = false
		} = this.props;

		let allowReg = new RegExp('^[0-9|,]*(\\.\\d{1,' + scale + '})?$', 'i');
		// if (!reg) {
		// 	reg = /^[0-9|,]*(\.\d{0,scale})?$/i;
		// }
		let verify = true,  aimValue = this.removeThousands(e || '');
		// const { onChange　} = this.props;
		// let value = e.target.value;
		// console.log('handleChangehandleChange');

		// if (processChange ) {
		// 	e = processChange(this.state, e);
		// }
	
		if (!reg.test(aimValue) && aimValue != '') {
			aimValue = value.value;
		}

		if (!allowReg.test(aimValue) && aimValue != '') {
			verify = false;
		}

		if (isrequired && aimValue == '' ) {
			verify = false;
		}

		if (onChange) {
			// onChange(this.removeThousands(e || ''));
			onChange({
				value: aimValue,
				verify: verify,
				isCheckNow: true
			});
		}
	}


	
	//精度千分位处理
	formatAcuracy(value, len = 2) {
		// return this.toThousands(formatVal);
		if (value === null || value === undefined) {
			return value;
		}

		return this.commafy(this.formatDot(value, len));
	}

	//移除千分位
	removeThousands(val) {
		return val ? val.toString().replace(/\,/gi, '') : val;
	}



	//数字转换成千分位 格式
	commafy(num) {
		let pointIndex, intPart, pointPart;

		if (isNaN(num)) {
			return '';
		}

		num = num + '';
		if (/^.*\..*$/.test(num)) {
			pointIndex = num.lastIndexOf('.');
			intPart = num.substring(0, pointIndex);
			pointPart = num.substring(pointIndex + 1, num.length);
			intPart = intPart + '';
			let re = /(-?\d+)(\d{3})/;
			while (re.test(intPart)) {
				intPart = intPart.replace(re, '$1,$2');
			}
			num = intPart + '.' + pointPart;
		} else {
			num = num + '';
			let re = /(-?\d+)(\d{3})/;
			while (re.test(num)) {
				num = num.replace(re, '$1,$2');
			}
		}
		return num;
	}

	// 精度处理
	formatDot(value, len　 = 6) {
		let formatVal, dotSplit, val;

		val = (value || 0).toString();

		dotSplit = val.split('.');

		if (dotSplit.length > 2 || !value) {
			return value;
		}

		if (val.indexOf('.') > -1) {
			formatVal = val.substring(0, val.indexOf('.') + len + 1);
		} else {
			formatVal = val;
		}

		return formatVal;
	}



	render() {

		const {
			defaultValue,
			type,
			isViewMode,
			onChange,
			value,
			isrequired,
			verify = true,
			scale = 4,
			ischecknow,
			pagestatus,
			suffix,
			...others
		} = this.props;
		let suffixDecorator = '';
		let errorMsg, errorBorder = {};

		if (suffix) {
			suffixDecorator = <span style={{lineHeight: '30px'}} >{suffix}</span>;
		}


		//校验信息的控制
		if (!verify) {
			errorMsg　= <span className="input-error-message" >请输入合法的数据！</span>;
			errorBorder = 'error-border';
		}

		value.value = this.formatDot(value.value, scale);

		//页面状态区分
		if ( pagestatus == 'browse') {
			return (<span style={{ lineHeight: 2.1 }}  > { this.commafy(value.value) }{suffixDecorator}</span>);
		} else {

			return (isViewMode ?  <span style={{ lineHeight: 2.1 }}  > { value.value }</span> :
				 <div style={{display: 'inline-block'}}>
				 	<FormControl    className='number-formcontrol'
				 				    autoComplete="off"   { ...others } 
				 				    value={ this.commafy(value.value) }
				 				    className={errorBorder}  
				 				    onChange={ this.handleChange } 
				 				    onBlur={ this.handleBlur }   />
				 		{suffixDecorator}
				 		{ errorMsg　}
				 	</div>)
			
		}
	}
}

//@TODO 类型校验
NumberItem.propTypes = {
  // suffix: PropTypes.string,
  // suffix: PropTypes.any.isRequired,
  verify: PropTypes.any.isRequired

};
