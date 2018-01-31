import React, { Component } from 'react';

export default class FormItem extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.children.props.value !== this.props.children.props.value ||
			nextProps.children.props.disabled !== this.props.children.props.disabled
		);
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log(this.props.label, ': updated');
	}

	render() {
		let children = this.props.children;
		if (this.props.children instanceof Array) {
			children = [ ...this.props.children ];
		}
		return (
			<div style={{ display: this.props.show === false ? 'none' : 'block' }}>
				<span style={{ display: 'inline-block', width: '80px' }}>{`${this.props.label}：`}</span>
				{children}
			</div>
		);
	}
}
