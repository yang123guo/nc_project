import React, { Component } from 'react';
import DatePicker from 'bee-datepicker';
import moment from 'moment';
import './index.less';

export default class NCDatePicker extends Component {
	render() {
		let { format = 'YYYY-MM-DD', value, onChange, ...others } = this.props;
		return (
			<DatePicker
				format={format}
				value={value ? moment(value) : null}
				onChange={(v) => {
					this.props.onChange && this.props.onChange(v.format(format));
				}}
				{...others}
			/>
		);
	}
}
