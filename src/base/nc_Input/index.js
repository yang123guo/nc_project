import React, { Component } from 'react';

export default class NCInput extends Component {
	render() {
		let { onChange, ...others } = this.props;
		// return <FormControl {...this.props} />;
		return <input className="u-form-control" onChange={(e) => void onChange(e.target.value, e)} {...others} />;
	}
}
