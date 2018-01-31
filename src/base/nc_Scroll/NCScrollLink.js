import React, { Component } from 'react';
import {Link as ScrollLink } from 'react-scroll';

export default class NCScrollLink extends Component {
	render() {
		let { spy = true } = this.props;
		return (
			<ScrollLink
                {...this.props} 
				spy = {spy}
			>
            </ScrollLink>
		);
	}
}