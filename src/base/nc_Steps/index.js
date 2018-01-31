import React, { Component } from 'react';
import Step from 'bee-step';
import NCStep from '../nc_Step'
class NCSteps extends Component {
	render() {
		return (
			<Step.Steps {...this.props}></Step.Steps>
		);
	}
}
NCSteps.NCStep=NCStep;
export default NCSteps;