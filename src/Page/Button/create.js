import React, { Component } from 'react';
import Button from 'bee-button';

export function createButton(id, config = {}) {
	let { disabled = false, name = '' } = config;
	if (!this.state.button.hasOwnProperty(id)) {
		//初始化
		this.state.button[id] = { disabled };
	}
	return (
		<Button
			disabled={this.state.button[id].disabled}
			onClick={this.onButtonClick.bind(
				this,
				{
					...this.props,
					...this.output
				},
				id
			)}
		>
			{name}
		</Button>
	);
}
