import React, { Component } from 'react';
import { Radio } from 'tinper-bee';
import PropTypes from 'prop-types';


export default class RadioItem extends Component {

	handleChange = value => {
		const { onChange } = this.props;
		onChange && onChange(value);
	}

	render() {


		// let { items }  = this.state;
		let {value, verify = true, isrequired, errormessage, pagestatus, items, ...others } = this.props;

				//页面状态区分
		if (pagestatus == 'browse') {　

			let displayValue;
			items.forEach( (v, i, a) => {
				if (v.value == value.value) {
					displayValue = v.display
				}
			});

			return (<span style={{ lineHeight: 2.1 }}  > { displayValue }</span>);

		} else {

			if (verify) {
				return <Radio.RadioGroup {...others}
						selectedValue={ value.value }
						onChange={ this.handleChange } >
						{ items.map((item, i) => <Radio color="info" disabled={!!item.disabled} value={item.value} key={i} >{item.display}</Radio>) }
					</Radio.RadioGroup>
			} else {
				return <Radio.RadioGroup {...others}
						selectedValue={ value.value }
						onChange={ this.handleChange } >
					{ items.map((item, i) => <Radio color="info" disabled={!!item.disabled} value={item.value} key={i} >{item.display}</Radio>) }
				</Radio.RadioGroup>
			}
		}
	
	}

}

//@TODO 类型校验
RadioItem.propTypes = {
  // suffix: PropTypes.string,
  // suffix: PropTypes.any.isRequired,
  verify: PropTypes.any.isRequired

};