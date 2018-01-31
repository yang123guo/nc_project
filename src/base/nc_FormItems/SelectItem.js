import React, { Component } from 'react';
import Select from 'bee-select';
const Option = Select.Option;
import PropTypes from 'prop-types';

export default class SelectItem extends Component {

	handleChange = value => {
		const { onChange } = this.props;
		// this.setState({
		// 	value: value
		// });
		if (onChange) {
			onChange(value);
		}

	}

	render() {

		// let { items }  = this.state;
		let { value,  items, pagestatus, ...others } = this.props;

		// console.log('SelectItem', defaultValue, 'value',value, items);
		//页面状态区分
		if ( pagestatus == 'browse') {
			let displayValue;
			items.forEach((v, i, a) => {
				if (v.value == value.value) {
					displayValue = v.display
				}
			});
			return (<span style={{ lineHeight: 2.1 }}  > { displayValue }</span>);
		} else {
			return  <Select   {...others} value={ value.value } onChange={ this.handleChange } >
						{ items.map((item, i) => <Option value={item.value}  key={i} > {item.display} </Option>) }
	                </Select>
			
		}


	}

}

//@TODO 类型校验
SelectItem.propTypes = {
  // suffix: PropTypes.string,
  // suffix: PropTypes.any.isRequired,
  verify: PropTypes.any.isRequired

};