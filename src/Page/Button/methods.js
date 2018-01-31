// 设置按钮可用性
export function setButtonDisabled(values) {
	for (let key of Object.keys(values)) {
		if (key) {
			this.state.button[key].disabled = values[key];
		}
	}
	this.setState({ button: this.state.button });
}

// 获取按钮可用性
export function getButtonDisabled(id) {
	return this.state.button[id].disabled;
}
