import React, { Component } from 'react';
import Tabs from 'bee-tabs';
import NCTabPane from '../nc_TabPane'

class NCTabs extends Component {
	render() {
		let {children, ...others} = this.props
		return (
			<Tabs {...others}>
				{this.props.children.map((e, i)=> {
					if (e.type.name === 'NCTabPane') {
						return e
					}
				})}
			</Tabs>
		);
	}
}
NCTabs.NCTabPane = NCTabPane;

export default NCTabs;

