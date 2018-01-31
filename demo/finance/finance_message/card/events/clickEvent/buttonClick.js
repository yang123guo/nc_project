import Ajax from '../../../../../../src/api/ajax';
import { NCMessage } from '../../../../../../src/base';

export default function (props, id) {
	let { form } = props;
	switch (id) {
		case 'saveButton':
			//判断前5项必输内容，保存时校验不能为空。
			let flag1 = form.getAllRequiredItems('invest_form1');
			let flag2 = form.getAllRequiredItems('invest_form2');

			//子表总和应该等于主表投资金额
			let investmny = form.getFormItemsValue('invest_form2', 'investmny');
			//获取子表金额总和
			let tableDataRows = props.editTable.getAllRows('invest_table');
			let totalMny = 0;
			for (let i = 0; i < tableDataRows.length; i++) {
				totalMny = totalMny + parseFloat(tableDataRows[i].values.paymny.value);
			}
			if (totalMny != investmny) {
				NCMessage.create({ content: "付款金额总和应该等于投资金额!", color: 'danger' });
				return;
			}

			//调用ajax保存数据
			if (flag1 && flag2) {
				let form1Data = {
					values: form.getAllFormValue('invest_form1')
				};
				let form2Data = {
					values: form.getAllFormValue('invest_form2')
				};
				let editTableData = props.editTable.getAllRows('invest_table');
				let data = {
					invest_form1: form1Data,
					invest_form2: form2Data,
					invest_table: {
						rows: editTableData
					}
				}
				Ajax({
					method: 'post',
					url: '/demo-web/demo/inment/save',
					data: { data: data },
					success: function (res) {
						props.setPageStatus('browse', props.location.query.id);
						props.editTable.setStatus('invest_table', 'browse');
						props.form.setAllFormValue("invest_form1", res.data.invest_form1.values);
						props.form.setAllFormValue("invest_form2", res.data.invest_form2.values);
						if (res.data.invest_table) {
							props.editTable.setTableData("invest_table", res.data.invest_table);
						}
					}
				});

			}
			break;
		case 'cancelButton':
			if (props.getPageStatus() != 'add') {
				//编辑返回上一次的值
				props.editTable.cancelEdit('invest_table');
				//表单返回上一次的值
				let formData = props.form.getCacheFormData();
				props.form.setAllFormValue("invest_form1", formData.invest_form1);
				props.form.setAllFormValue("invest_form2", formData.invest_form2);
			}
			//页面回退	
			history.back();
			break;
		case 'backButton':
			//浏览态返回理财信息列表???
			//hashHistory.push('/finance/finance_message/list');
			window.location.hash = '/finance/finance_message/list';
			break;
		case 'editButton':
			props.setPageStatus('edit', props.location.query.id)
			break;
		case 'addRowButton':
			props.editTable.addRow('invest_table');
			break;
		default:
			break;
	}
}
