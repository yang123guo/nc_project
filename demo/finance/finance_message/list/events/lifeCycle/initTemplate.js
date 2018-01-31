import Ajax from '../../../../../../src/api/ajax';
export default function(props) {
	let meta = {
		financeSearchArea: {
			moduleType: 'search',
			items: [
				{
					key: 'bankname',
					label: '银行',
					itemType: 'refer',
					config: {
						refCode: 'bank'
					},
					initialValue: null
				},
				{
					key: 'investtype',
					label: '存款类型',
					itemType: 'select',
					initialValue: null,
					options: [
						{
							display: '活期',
							value: 0
						},
						{
							display: '三个月',
							value: 1
						},
						{
							display: '一年',
							value: 2
						},
						{
							display: '三年',
							value: 3
						},
						{
							display: '五年',
							value: 4
						}
					]
				},
				{
					key: 'beginmny',
					label: '起始理财金额',
					itemType: 'input',
					initialValue: null
				},
				{
					key: 'endmny',
					label: '截止理财金额',
					itemType: 'input',
					initialValue: null
				},
				{
					key: 'begindate',
					label: '起始购买日期',
					itemType: 'datepicker',
					initialValue: null
				},
				{
					key: 'enddate',
					label: '截止购买日期',
					itemType: 'datepicker',
					initialValue: null
				}
			]
		},
		financeListTable: {
			moduleType: 'table',
			pagination: {
				pageSize: 10
			},
			columns: [
				{
					label: '投资日期',
					key: 'investdate'
				},
				{
					label: '投资金额',
					key: 'investmny'
				},
				{
					label: '投资期限',
					key: 'investtype',
					itemType: 'select',
					options: [
						{
							display: '活期',
							value: 0
						},
						{
							display: '三个月',
							value: 1
						},
						{
							display: '一年',
							value: 2
						},
						{
							display: '三年',
							value: 3
						},
						{
							display: '五年',
							value: 4
						}
					]
				},
				{
					label: '年化收益率%',
					key: 'interstrate'
				},
				{
					label: '到期日',
					key: 'enddate'
				},
				{
					label: '到期收益',
					key: 'expectedinterest'
				}
			]
		}
	};

	//修改meta
	let tableMeta = meta.financeListTable;
	if (tableMeta) {
		//添加表格操作列
		let event = {
			label: '操作',
			key: 'opr',
			render(text, record, index) {
				return (
					<span>
						<i
							className="icon iconfont icon-bianji"
							onClick={() => {
								window.location.hash = `/finance/finance_message/card?type=edit&id=${record.id.value}`;
							}}
						/>
						<i
							className="icon iconfont icon-shanchu"
							onClick={() => {
								//删除数据
								const _this = this;
								Ajax({
									method: 'post',
									data: { id: record.id.value },
									url: '/demo-web/demo/inment/delete',
									success: function(res) {
										let pageInfo = props.table.getTablePageInfo('financeListTable');
										let searchVal = props.search.getAllSearchData('financeSearchArea');
										searchVal.page = 0;
										searchVal.size = pageInfo.size;
										searchVal.sort = {
											property: 'investdate',
											direction: 'desc'
										};
										let data = {
											page: 0,
											size: pageInfo.size,
											searchParams: {
												searchMap: searchVal
											}
										};
										//得到数据渲染到页面
										Ajax({
											url: '/demo-web/demo/inment/search',
											data: data,
											success: function(res) {
												props.table.setAllTableData('financeListTable', res.data.invest);
											}
										});
									}
								});
							}}
						/>
					</span>
				);
			}
		};
		tableMeta.columns.push(event);

		//设置表格详情跳转
		let investmnyItem = tableMeta.columns.find(function(elem) {
			return elem.key == 'investmny';
		});
		investmnyItem.render = (text, record, index) => {
			return (
				record.id && (
					<span>
						<a href={'#/finance/finance_message/card?type=browse&id=' + record.id.value}>
							{record.investmny.value}
						</a>
					</span>
				)
			);
		};

		//设置表格数据的%显示
		let interstrateItem = tableMeta.columns.find(function(elem) {
			return elem.key == 'interstrate';
		});
		interstrateItem.render = (text, record, index) => {
			return record.id && <span>{record.interstrate.value + '%'}</span>;
		};

		meta.financeListTable = tableMeta;
	}

	return meta;
}
