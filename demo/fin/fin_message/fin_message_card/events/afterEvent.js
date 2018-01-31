export default function(props,moduleId, key) {
	let { form } = props;
	//获取相应存款类型的值
	let value=form.getFormItemsValue(moduleId,key)
	// 选择“存款类型”为活期时
	if (key === 'investtype') {
		//选择“存款类型”为活期时,“到期日”清空并不可编辑，改变到期日不是必输项
		if (value == 0) {
			form.setFormItemsValue(moduleId,{'enddate':null});
			form.setFormItemsDisabled(moduleId,{'enddate': true});
			form.setFormItemsRequired(moduleId,{'enddate': false})
		} else {
			// “存款类型”为非活期时，自动计算“到期日”，仍允许用户手工修改​，改变到期日为必输项
			form.setFormItemsDisabled(moduleId,{'enddate': false});
			form.setFormItemsRequired(moduleId,{'enddate': true})
			calEndDate(form);	
		}
	}
	if (key === 'investdate') {
			calEndDate(form);
	}
	//自动计算“到期日”方法
	function calEndDate(form) {
		let investdate = form.getFormItemsValue(moduleId,'investdate');
		let investtype = form.getFormItemsValue(moduleId,'investtype');
		if(investdate&&investtype){
			let date;
			if (investtype==1) {
				//三个月
				let date1= new Date(investdate);
				let date1Y=date1.getFullYear();
				let date1M=date1.getMonth()+4;
				if(date1M>12){
					date1Y+=1;
					date1M-=12;
				}
				let date1D=date1.getDate();
				date =date1Y+"-"+date1M+"-"+date1D;
	
			} else if (investtype==2) {
				//半年
				let date1= new Date(investdate);
				let date1Y=date1.getFullYear();
				let date1M=date1.getMonth()+7;
				if(date1M>12){
					date1Y+=1;
					date1M-=12;
				}
				let date1D=date1.getDate();
				date =date1Y+"-"+date1M+"-"+date1D;			
			}
			
			form.setFormItemsValue(moduleId,{'enddate':date});
		}
		
	}
}
