
import React, { Component } from 'react';
import Breadcrumb from 'bee-breadcrumb';
import NCBreadcrumbItem from './nc_BreadcrumbItem'

class NCBreadcrumb extends Component {
	render() {
		return (
			<Breadcrumb
                {...this.props} 
			>
            </Breadcrumb>
		);
	}
}
NCBreadcrumb.NCBreadcrumbItem = NCBreadcrumbItem;
export default NCBreadcrumb