import React, { Component } from 'react';
// import { FormControl } from 'tinper-bee';
import moment from 'moment';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import NCDatePicker from '../nc_DatePicker';
import PropTypes from 'prop-types';
// const format = 'YYYY-MM-DD';

export default class DateTimePickerItem extends Component {

	handleChange = (e) => {
		
		const { onChange, format } = this.props;
		// this.state.value = e;
		
		if (onChange) {
			onChange( e.format(format) );
		}
	}

	render() {

		const { value, verify = true, format, locale = zhCN, pagestatus, ...others} = this.props;
		let errorMsg, errorBorder = '';
		//校验信息的控制
		if (!verify) {
			errorMsg　= <span className="input-error-message" >请输入合法的数据！</span>;
			errorBorder = 'error-border';
		}
		let displayValue = undefined;

		// defaultValue={ defaultValue }
		// return <FormControl value={ this.state.value } onChange={this.handleChange}  />
		// console.log(defaultValue, 'defaultValue');


		//页面状态区分
		if (pagestatus == 'browse') {　

			return (<span style={{ lineHeight: 2.1 }} > { value.value }</span>);

		} else {


			if (!value.value) {
				displayValue = undefined;
			} else {
				displayValue = moment(value.value)
			}



			return(<div> 
					<DatePicker format={ format }  {...others}
								locale={ locale }  
								value={ displayValue }
								className ={ errorBorder }  
								onChange={this.handleChange} />
					{ errorMsg　}

					</div>);

		}

	}
}

//@TODO 类型校验
DateTimePickerItem.propTypes = {
  // suffix: PropTypes.string,
  // suffix: PropTypes.any.isRequired,
  verify: PropTypes.any.isRequired

};