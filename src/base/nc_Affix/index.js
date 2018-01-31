import React, { Component } from 'react';
import Affix from 'bee-affix';

export default class NCAffix extends Component {
	render() {
		return (
			<Affix
                {...this.props} 
			>
            </Affix>
		);
	}
}