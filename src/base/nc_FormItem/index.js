import React, { Component } from 'react';
import {FormItem} from 'bee-form';

export default class NCFormItem extends Component {
	render() {
		return (
			<FormItem {...this.props}></FormItem>
		);
	}
}