import React, { Component } from 'react';
import Input from '../nc_Input';
import FormControl from 'bee-form-control';
import PropTypes from 'prop-types';

const propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired
};

class NCNumber extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleChange = (value) => {
		let { onChange, scale } = this.props;
		let flag = this.numCheck(value, scale);
		if (!flag) return false;
		onChange && onChange(value);
	};

	handleBlur = () => {
		let { onChange, onBlur, max, min, value } = this.props;
		if (min < max) {
			if (Number(value) < min) {
				value = String(min);
			}
			if (Number(value) > max) {
				value = String(max);
			}
		}
		onChange && onChange(value);
		onBlur && onBlur(value);
	};

	numCheck = (num, scale = 0) => {
		if (scale < 0 || Number.isNaN(Number(scale))) scale = 0;
		let reg = new RegExp(`^\\d+\\.?\\d{0,${parseInt(scale)}}$`, 'g');
		let flag = reg.test(num);
		return flag || num === '';
	};

	render() {
		let { onChange, onBlur, scale, ...others } = this.props;
		return <Input onChange={this.handleChange} onBlur={this.handleBlur} {...others} />;
	}
}

NCNumber.propTypes = propTypes;

export default NCNumber;
