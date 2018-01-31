import React, { Component } from 'react';
import { Element as ScrollElement} from 'react-scroll';

export default class NCScrollElement extends Component {
	render() {
		return (
			<ScrollElement
                {...this.props} 
			>
            </ScrollElement>
		);
	}
}