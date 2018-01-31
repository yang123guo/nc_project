export default function(props, id) {
	switch (id) {
		case 'setAllValueButton':
			props.form.setAllFormValue('form5',{
				name: 'liyxt@yonyou.com',
				investDate:'2018-1-1',
				investInterval:'1'
			});
			break;
		case 'getAllValueButton':
			console.log(props.form.getAllFormValue());
			break;
		case 'setNameValueButton':
			props.form.setFormItemsValue('form5',{
				name: 'liyxt@yonyou.com'
			});
			break;
	
		case 'getNameValueButton':
			console.log(props.form.getFormItemsValue('form5','name'));
			break;
		case 'setNameDisabledTrue':
			props.form.setFormItemsDisabled('form5', {
				name : true
			});
			break;
		case 'setNameDisabledFalse':
			props.form.setFormItemsDisabled('form5', {
				name : false
			});
			break;
		case 'getNameDisabled':
			console.log(props.form.getFormItemsDisabled('form5', 'name'));
		break;
		case 'setNameVerify':
			props.form.setFormItemsVerify('form5', {
				name : false
			});
		break;
		default:
			break;
	}
}
