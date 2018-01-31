import clone from '../../public/deepClone';
// import clone from 'public/deepClone';   uba.config中简写配置


// 当前页码重置为1
export function resetTablenumber(callback) {
	this.state.table.pageinfo.number = 1;
	this.setState(
		{
			table: this.state.table
		},
		() => {
			callback && callback(this.state.table);
		}
	);
}

// 获取pageinfo对象的方法
export function getTablePageInfo(moduleId) {
	// 给个默认值 TODO
	let { number, size } = this.state.table[moduleId] ? this.state.table[moduleId].pageinfo : { number: 1, size: 10 };
	return {
		page: number > 0 ? number - 1 : 0,
		size
	};
}

// 设置表格组件数据并渲染
export function setAllTableData(moduleId, data) {
	if (!data) {
		data = {
			pageinfo : {
				number: 0,
				size: 10
			}, 
			rows :[]
		}
	}
	this.setState({
		table: {
			...this.state.table,
			[moduleId]: data
		}
	});
}

// 新增功能
export function openModel(moduleId, type, record) {
	if (!moduleId) return;
	let data = clone(this.state.table[moduleId]);
	data.model = true;
	if(type == 'edit') {
		data.origin = record;
	}else if(type == 'add') {
		data.origin = null;
	}
	data.operType = type;
	this.setState({
		table: {
			...this.state.table,
			[moduleId]: data 
		}
	});
}

export function closeModel(moduleId) {
	// console.log(this.state.table, moduleId)
	let data = clone(this.state.table[moduleId]);
	data.model = false;

	this.setState({
		table: {
			...this.state.table,
			[moduleId]: data
		}
	});
}

// 得到行数据
export function getRowTableData() {}

//设置表格某一列的 render
export function setTableRender(moduleId, key, render) {
	if (this.state.meta[moduleId]) {
		let obj = this.state.meta[moduleId].columns.find(function(elem) {
			return elem.key == key;
		});
		let index = this.state.meta[moduleId].columns.indexOf(obj);
		this.state.meta[moduleId].columns[index].render = render;
		this.setState({
			meta: this.state.meta
		});
	}
}

export function setTableColumn(moduleId, data) {
	if (!moduleId) return;
	this.setState({
		meta: {
			...this.state.meta,
			[moduleId]: data
		}
	});
}

export function setTableColumnMeta(moduleId, data) {
	if (!moduleId) return;
	this.setState({
		meta: {
			...this.state.meta,
			[moduleId]: data
		}
	});
}

export function getAllTableData(moduleId) {
	if (!moduleId) return;
	return clone(this.state.table[moduleId]);
}
