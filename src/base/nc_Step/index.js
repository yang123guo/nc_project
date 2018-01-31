import React, { Component } from 'react';
import Step from 'bee-step';

export default class NCStep extends Component {
	render() {
		return (
			<Step {...this.props}/>
		);
	}
}