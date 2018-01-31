//设置表格数据
export function setTableData(id, data) {
	if (data) {
		data.rows = data.rows.map((e, i) => {
			e.rowId = e.rowId || i;
			return e;
		});
		this.setState({
			table: {
				...this.state.table,
				[id]: data
			}
		});
	}
}

//获取表格数据
export function getAllRows(id) {
	return this.state.table[id].rows.filter((e) => e.status != 3);
}

//编辑表格
export function setStatus(id, status, callback) {
	if ([ 'edit', 'browse' ].includes(status)) {
		this.state.meta[id].status = status;
		this.setState(
			{
				meta: this.state.meta
			},
			function() {
				callback && callback.call(this, id, status, this.cacheTableData, this.state.table[id]);
				if (status !== 'edit') {
					delete this.cacheTableData;
				}
			}
		);
	} else {
		console.warn(`unknown status: ${status}, status should be 'edit' or 'browse'`);
	}
}

//编辑表格
export function edit(id, cb) {
	this.state.meta[id].status = 'edit';

	// 存缓存数据，做‘取消’用
	if (this.cacheTableData === undefined) {
		this.cacheTableData = JSON.parse(JSON.stringify(this.state.table[id]));
	}

	this.setState(
		{
			meta: this.state.meta
		},
		function() {
			cb && cb.call(this);
		}
	);
}

//取消编辑
export function cancelEdit(id, cb) {
	this.state.meta[id].status = 'browse';
	setTableData.call(this, 'invest_table', this.cacheTableData);
	this.setState(
		{
			meta: this.state.meta
		},
		function() {
			cb && cb.call(this);
			delete this.cacheTableData;
		}
	);
}

//TODO:保存
export function save(id, cb) {
	let changedRows = getChangedRows.call(this, id),
		allRows = getAllRows.call(this, id);
	cb && cb(changedRows, allRows);
}

//新增行
export function addRow(id, index) {
	//index ? 在指定位置新增一行 : 在最后新增一行
	edit.call(this, id);
	let newRow = {
		rowId: new Date().getTime(),
		status: 2, //0123 => 原始、修改、新增、删除
		values: {}
	};
	this.state.meta[id].columns.forEach((e) => {
		newRow.values[e.key] = {
			display: null,
			scale: -1,
			value: null
		};
	});
	index = index === undefined ? this.state.table[id].rows.length : index;
	// this.state.table[id].rows.splice(index, 0, newRow);
	this.state.table[id].rows.splice(index, 0, newRow);
	this.setState({
		table: this.state.table
	});
}

//删除行
export function delRow(id, index) {
	index = index === undefined ? this.state.table[id].rows.length : index;
	while (this.state.table[id].rows[index].status == 3) index++;
	if (this.state.table[id].rows[index].status == 2) {
		// 如果是之前新增的行，则直接从数据里删除
		this.state.table[id].rows.splice(index, 1);
	} else {
		// 否则将行状态改为3
		this.state.table[id].rows[index].status = 3;
	}
	this.setState({
		table: this.state.table
	});
	return this.state.table[id].rows[index].status;
}

//获取变化行的信息
export function getChangedRows(id) {
	//TODO:判断修改的行，值是否和改之前一样，如果一样，把status设为0
	return getAllRows.call(this, id).filter((e) => {
		return e.status == 1 || e.status == 2 || e.status == 3;
	});
}
