import React, { Component } from 'react';
import Form from 'bee-form';
import NCFormItem from '../nc_FormItem'
class NCForm extends Component {
	render() {
		return (
			<Form {...this.props}></Form>
		);
	}
}

NCForm.NCFormItem=NCFormItem;
export default NCForm