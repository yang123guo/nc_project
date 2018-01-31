import React, { Component } from 'react';
import { DemoRefer as Refer } from 'containers/Refer';
import PropTypes from 'prop-types';

export default class ReferItem extends Component {
	handleChange = (value) => {
		const { onChange, isrequired = false } = this.props;
		let verify = true;

		if (isrequired && !value.refname) {
			verify = false;
		}

		value.verify = verify;
		value.display = value.refname;
		value.value = value.refpk;

		// this.setState({
		// 	value: value
		// });

		onChange && onChange(value);
	};

	render() {
		let { disabled, value = {}, pagestatus, refcode = 'bank', verify = true, ...others } = this.props;

		let errorMsg,
			errorBorder = '';

		//校验信息的控制
		if (!verify) {
			errorMsg = <span className="input-error-message">请输入合法的数据！</span>;
			errorBorder = 'error-border';
		}
		value.refpk = value.refpk || value.value || null;
		value.refname = value.refname || value.display || null;

		// let curValue = {};

		// value={ this.state.value }

		if (pagestatus == 'browse') {
			return <span style={{ lineHeight: 2.1 }}> {value.refname}</span>;
		} else {
			return (
				<div>
					{' '}
					<Refer
						refCode={ refcode }
						{...others}
						value={value}
						disabled={!!disabled}
						className={ errorBorder }
						onChange={this.handleChange}
					/>
					{errorMsg}
				</div>
			);
		}
	}
}

//@TODO 类型校验
ReferItem.propTypes = {
	// suffix: PropTypes.string,
	// suffix: PropTypes.any.isRequired,
	verify: PropTypes.any.isRequired,
	value: PropTypes.object
};
