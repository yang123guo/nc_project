import React, { Component } from 'react';
import Breadcrumb from 'bee-breadcrumb';

export default class NCBreadcrumbItem extends Component {
	render() {
		return (
			<Breadcrumb.Item
                {...this.props} 
			>
            </Breadcrumb.Item>
		);
	}
}