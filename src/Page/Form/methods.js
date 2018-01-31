import { NCMessage } from '../../base'
import Uitls from './utils';

// 获取表单所有数据
export function getAllFormValue(moduleId) {
	if (!moduleId) {
		return this.state.form;
	}

	let formData = this.state.form[moduleId];
	let values = {};
	for (let pop in formData) {
		values[pop] = formData[pop];
	}
	let data = values
	return data;
}

// 设置表单所有数据
export function setAllFormValue(moduleId, data) {
	for (let pop in data) {
		this.state.form[moduleId][pop] = data[pop]
	}
	console.log(this.state.form[moduleId])
	this.setState({ form: this.state.form });
}

//获取表单缓存数据
export function getCacheFormData(moduleId) {

	if (moduleId) {
		if (this.state.cacheform[moduleId]) {
			return Uitls.deepClone(this.state.cacheform[moduleId]);
		}
		return {};
	}
	return Uitls.deepClone(this.state.cacheform);
}

//缓存表单数据
export function setCacheFormData(moduleId, data) {
	let { cacheform } = this.state;

	//参数验证
	if (arguments.length == 2 && !Uitls.isObject(data)) {
		console.error(`${data}字段应该是空或对象！`);
	}

	if (data) {
		cacheform[moduleId] = data;
		this.setState({
			cacheform: cacheform
		});
	} else {
		this.setState({
			cacheform: data
		});
	}
}

// 清空表单所有数据
export function EmptyAllFormValue(moduleId) {
	let data = this.state.form;
	for (let pop in data[moduleId]) {
		let item = this.state.meta[moduleId].items.find(function (elem) {
			return elem.key == pop;
		});
		if (!!item.itemType) {
			data[moduleId][pop].value = '';
		}
	}
	this.setState({ form: data });
}

//获取表单中所有必输字段名
export function getAllRequiredItems(moduleId) {
	if (this.state.meta[moduleId]) {
		let itemsArr = this.state.meta[moduleId].items;
		let requiredItemsLabel = itemsArr.filter((ele) => {
			return (ele.required && ((!this.state.form[moduleId][ele.key].value)) && this.state.form[moduleId][ele.key].value !== 0);
		}).map(function (ele, index) {
			return ele.label;
		})
		if (requiredItemsLabel.length > 0) {
			NCMessage.create({ content: requiredItemsLabel + " 不能为空！", color: 'danger' });
			return false;
		}
		// return requiredItemsLabel;
		return true;
	}
}

export function isCheckNow(moduleId) {
	let arr = getAllRequiredItems.bind(this, moduleId)();
	console.log(arr)
	if (arr.length > 0) {
		return false;
	} else {
		return true
	}
	//alert('以下字段不能为空: '+arr);
}


// 获取表单中某个字段的值
export function getFormItemsValue(moduleId, data) {
	if (typeof data === 'string') {
		return this.state.form[moduleId][data].value;
	} else if (data instanceof Array) {
		let newData = [];
		const _this = this;
		newData = data.map((item, i) => {
			return _this.state.form[moduleId][item].value;
		});
		return newData;
	}
}

// 设置表单中某个字段的值
export function setFormItemsValue(moduleId, values) {
	for (let key of Object.keys(values)) {
		if (key) {
			this.state.form[moduleId][key] = this.state.form[moduleId][key] || {};
			this.state.form[moduleId][key].value = values[key];
		}
	}
	console.log(this.state.form[moduleId])
	this.setState({ form: this.state.form });
}

function setFormAttribute(moduleId, values, attribute) {
	let items = this.state.meta[moduleId].items;
	for (let key of Object.keys(values)) {
		if (key) {
			let item = items.find(function (elem) {
				return elem.key == key;
			});
			let index = items.indexOf(item);
			this.state.meta[moduleId].items[index][attribute] = values[key];
		}
	}
	this.setState({ meta: this.state.meta });
}

function getFormAttribute(moduleId, id, attribute) {
	if (typeof id === 'string') {
		let arr = this.state.meta[moduleId].items.find(function (elem) {
			return elem.key == id;
		});
		return arr[attribute];
	} else if (id instanceof Array) {
		let newData = [];
		const _this = this;
		newData = id.map((item, i) => {
			let arr = this.state.meta[moduleId].items.find(function (elem) {
				return elem.key == item;
			});
			return arr[attribute];
		});
		return newData;
	}
}

// 获取表单某个或某些字段的编辑性
export function getFormItemsDisabled(moduleId, id) {
	return getFormAttribute.bind(this, moduleId, id, 'disabled')();
}

// 设置表单编辑性
export function setFormItemsDisabled(moduleId, values) {
	setFormAttribute.bind(this, moduleId, values, 'disabled')();
}


//设置表单某些字段的必输性
export function setFormItemsRequired(moduleId, values) {
	setFormAttribute.bind(this, moduleId, values, 'required')();
}


//获取表单某些字段的必输性
export function getFormItemsRequired(moduleId, id) {
	return getFormAttribute.bind(this, moduleId, id, 'required')();
}


//设置表单某些字段的校验规则
export function setFormItemsVerify(moduleId, values) {
	setFormAttribute.bind(this, moduleId, values, 'verify')();
}


//获取表单某些字段的校验规则
export function getFormItemsVerify(moduleId, id) {
	return getFormAttribute.bind(this, moduleId, id, 'verify')();
}



// 设置表单可见
export function formShow(id) {
	// if (typeof id === 'string') {
	// 	this.state.form[id].show = true;
	// 	this.setState({ form: this.state.form });
	// } else if (id instanceof Array) {
	// 	id.map((e, i) => {
	// 		this.state.form[e].show = true;
	// 	});
	// 	this.setState({ form: this.state.form });
	// } else {
	// 	return;
	// }
}

// 设置表单隐藏
export function formHide(id) {
	// if (typeof id === 'string') {
	// 	this.state.form[id].show = false;
	// 	this.setState({ form: this.state.form });
	// } else if (id instanceof Array) {
	// 	id.map((e, i) => {
	// 		this.state.form[e].show = false;
	// 	});
	// 	this.setState({ form: this.state.form });
	// } else {
	// 	return;
	// }
}
