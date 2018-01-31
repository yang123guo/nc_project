
import { getMonth, getYear } from '../../../../../../src/api/date';

export default function (props, moduleId, key) {
	let { form } = props;
	// // 选择“存款类型”为活期时
	if (key === 'investtype') {
		// 选择“存款类型”为活期时,“到期日”清空并不可编辑，改变到期日不是必输项
		let value = form.getFormItemsValue(moduleId, 'investtype');
		if (value == 0) {
			form.setFormItemsValue('invest_form2', { 'enddate': null });
			form.setFormItemsDisabled('invest_form2', { 'enddate': true });
			form.setFormItemsRequired('invest_form2', { 'enddate': false });
			form.setFormItemsValue('invest_form2', { 'expectedinterest': null });
		} else {
			// “存款类型”为非活期时，自动计算“到期日”，仍允许用户手工修改​，改变到期日为必输项
			form.setFormItemsDisabled('invest_form2', { 'enddate': false });
			form.setFormItemsRequired('invest_form2', { 'enddate': true })
			calEndDate(form);
		}
	}

	if (key === 'investdate') {
		calEndDate(form);
	}

	//自动计算预计收益
	if (key === 'investmny' || key === 'interstrate' || key === 'investtype') {
		calExpectedinterest();
	}



	//自动计算“到期日”方法
	function calEndDate(form) {
		let investdate = form.getFormItemsValue('invest_form2', 'investdate');
		let investtype = form.getFormItemsValue('invest_form1', 'investtype');
		if (investdate && investtype) {
			let enddate;
			if (investtype == 1) {
				//三个月
				enddate = getMonth(investdate, 3, 'YYYY-MM-DD');
			} else if (investtype == 2) {
				//一年
				enddate = getYear(investdate, 1, 'YYYY-MM-DD');
			}else if (investtype == 3) {
				//一年
				enddate = getYear(investdate, 3, 'YYYY-MM-DD');
			}else if (investtype == 4) {
				//一年
				enddate = getYear(investdate, 5, 'YYYY-MM-DD');
			}
			form.setFormItemsValue('invest_form2', { 'enddate': enddate });
		}

	}

	//计算预计收益
	function calExpectedinterest() {
		let investtypeArr = [0.25, 0.5, 3, 5];
		let investmny = form.getFormItemsValue('invest_form2', 'investmny');
		let interstrate = form.getFormItemsValue('invest_form1', 'interstrate');
		let investtype = form.getFormItemsValue('invest_form1', 'investtype');
		if (investtype == 0) {
			form.setFormItemsValue('invest_form2', { 'expectedinterest': null });
		} else if (investmny && interstrate && investtype) {
			let expectedinterest = parseFloat(investmny) * investtypeArr[investtype - 1] * parseFloat(interstrate) / 100;
			let number = Math.round(expectedinterest * Math.pow(10, 2)) / Math.pow(10, 2);
			form.setFormItemsValue('invest_form2', { 'expectedinterest': expectedinterest });
		} else {
			form.setFormItemsValue('invest_form2', { 'expectedinterest': null });
		}
	}
}
