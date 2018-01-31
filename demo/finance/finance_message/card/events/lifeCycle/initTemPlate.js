export default function(props) {
	let meta = {
		invest_form1: {
			moduleType: 'form',
			items: [
				{
					key: 'bank',
					label: '银行',
					itemType: 'refer',
					config: {
						refCode: 'bank'
					},
					disabled: false,
					initialValue: '',
					scale: null,
					required: true,
					maxLength: null
				},
				{
					key: 'investtype',
					label: '存款类型',
					itemType: 'select',
					disabled: false,
					initialValue: '',
					col: 6,
					row: 3,
					offset: 6,
					options: [
						{
							display: '空',
							value: null
						},
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
					],
					scale: null,
					required: true,
					maxLength: null
				},
				{
					key: 'interstrate',
					label: '年化收益率%',
					disabled: false,
					itemType: 'number',
					scale: 2,
					required: true
				}
			]
		},
		invest_form2: {
			moduleType: 'form',
			items: [
				{
					key: 'investdate',
					label: '投资日期',
					itemType: 'datepicker',
					required: true,
					disabled: false
				},
				{
					key: 'investmny',
					label: '投资金额',
					itemType: 'number',
					scale: 2,
					disabled: false,
					required: true
				},
				{
					key: 'enddate',
					label: '到期日',
					itemType: 'datepicker',
					disabled: false,
					required: true
				},
				{
					key: 'expectedinterest',
					label: '到期收益',
					itemType: 'label',
					scale: 2,
					initialValue: '20'
				},
				{
					key: 'memo',
					label: '备注',
					itemType: 'textarea',
					disabled: false,
					rows: 3,
					cols: 105
				}
			]
		},
		invest_table: {
			moduleType: 'table',
			pagination: false,
			editType: 'inline', //or popover
			status: 'browse', //or edit
			lineHeight: '40px',
			columns: [
				{
					key: 'paydate',
					label: '付款日期',
					itemType: 'datepicker'
				},
				{
					key: 'paymny',
					label: '付款金额',
					itemType: 'input'
				}
			]
		}
	};

	//添加表格操作列
	let tableMeta = meta.invest_table;
	if (tableMeta) {
		let event = {
			label: '操作',
			key: 'opr',
			render(text, record, index) {
				return (
					<i
						className="icon iconfont icon-shanchu"
						onClick={() => {
							props.editTable.delRow('invest_table', index);
						}}
					/>
				);
			}
		};
		tableMeta.columns.push(event);
		meta.invest_table = tableMeta;
	}

	return meta;
}
