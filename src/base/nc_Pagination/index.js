import React, { Component } from 'react';
import Pagination from 'bee-pagination';

export default class NCPagination extends Component {
	render() {
		return (
			<Pagination {...this.props}/>
		);
	}
}