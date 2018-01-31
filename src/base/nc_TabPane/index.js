import React, { Component } from 'react';
import Tabs,{TabPane} from 'bee-tabs';

export default class NCTabPane extends Component {
	render() {
		return (
			<TabPane {...this.props}></TabPane>
		);
	}
}