import React, { Component } from 'react';
// import { FormControl } from 'tinper-bee';
import FormControl from 'bee-form-control';
import PropTypes from 'prop-types';
import Utils from '../../Page/Form/utils';


export default class InputItem extends Component {


	handleChange = (e) => {
		// const { onChange, processChange  } = this.props;
		const { onChange, reg = /\S/, isrequired = false } = this.props;
		let verify = true, value = e;

		// let value = e.target.value;

		// if (processChange ) {
		// 	e = processChange(this.state, e);
		// }
	
		if (!reg.test(value) && value != '') {
			verify = false;
		}

		if (isrequired && value == '') {
			verify = false;
		}


		if (onChange) {
			// onChange(this.removeThousands(e || ''));
			onChange({
				value: value,
				verify: verify,
				isCheckNow: true
			});
		}

	}
	handleBlur = (e) => {
		// const { onChange, processChange  } = this.props;
		const { onChange, reg = /\S/ , isrequired = false} = this.props;
		let verify = true, value = e.target.value;

		// let value = e.target.value;

		// if (processChange ) {
		// 	e = processChange(this.state, e);
		// }
	
		if (!reg.test(value) && value != '') {
			verify = false;
		}

		if (isrequired && value == '') {
			verify = false;
		}


		if (onChange) {
			// onChange(this.removeThousands(e || ''));
			onChange({
				value: value,
				verify: verify,
				isCheckNow: true
			});
		}

	}

	
	render() {

		const {
			defaultValue,
			type,
			isViewMode,
			onChange,
			value,
			scale,
			verify = true,
			ischecknow,
			isrequired,
			pagestatus,
			...others
		} = this.props;
		let errorMsg, errorBorder = '';

		//校验信息的控制
		if (!verify) {
			errorMsg　= <span className="input-error-message" >请输入合法的数据！</span>;
			errorBorder = 'error-border';
		}
		
		if (scale) {
			value.value = Utils.formatDot(value.value, scale);
		}

		//页面状态区分
		if ( pagestatus == 'browse') {
			return (<span style={{ lineHeight: 2.1 }}  > { value.value }</span>);
		} else {
			return (isViewMode ?  <span style={{ lineHeight: 2.1 }}  > { value.value }</span> :
				<div> 
					<FormControl    autoComplete="off"   { ...others } 
									value={ value.value }
									className={ errorBorder }  
									onChange={ this.handleChange } 
									onBlur={ this.handleBlur }   />
						{ errorMsg　}
				</div>)
		}

	}
}

//@TODO 类型校验
InputItem.propTypes = {
  // suffix: PropTypes.string,
  // suffix: PropTypes.any.isRequired,
  verify: PropTypes.any.isRequired,
  isrequired:PropTypes.bool

};