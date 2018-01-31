import React, { Component } from 'react';
import Switch  from 'bee-switch';
import  'bee-switch/build/Switch.css';
import PropTypes from 'prop-types';

export default class SwitchItem extends Component {

	handleChange = (value) => {
		const { onChange } = this.props;

		// this.setState({
		// 	value: value
		// });

		if (onChange) {
			onChange(value);
		}
	}


	render() {

		const { value, onChange, pagestatus,  ...others} = this.props;

				//页面状态区分
		if ( pagestatus == 'browse') {
			return (<span style={{ lineHeight: 2.1 }}  > { value.value }</span>);
		} else {
			
			return <Switch  { ...others }  checked={ value.value }  onChange={ this.handleChange } /> 
		}

	}
}

//@TODO 类型校验
SwitchItem.propTypes = {
  // suffix: PropTypes.string,
  // suffix: PropTypes.any.isRequired,
  verify: PropTypes.any.isRequired

};