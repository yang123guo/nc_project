import React, { Component } from 'react';
import Loading from 'bee-loading';
import 'bee-loading/build/Loading.css';

export default class NCLoading extends Component {
	render() {
		return <Loading {...this.props} />;
	}
}
