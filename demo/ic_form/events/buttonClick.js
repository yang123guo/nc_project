export default function(props, id) {
	switch (id) {
		case 'setValueButton':
			props.form.setValue('form3',{
				userName: 'liyxt@yonyou.com'
			});
			break;
		case 'getValueButton':
			// console.log(props.form.getAllValue());
			console.log(props.form.getAllFormValue());
			break;
		case 'getDisabledTrue':
			props.form.setDisabled({
				userName: true,
				passWord: true
			});
			break;
		case 'getDisabledFalse':
			props.form.setDisabled({
				userName: false,
				passWord: false
			});
			break;
		case 'changetoEdit':
			
			props.setPageStatus('edit');
			break;
		case 'changetobrowse':

			props.setPageStatus('browse');
			break;
		case 'checknow':

			props.form.getAllRequiredItems('form3');

			break;
		default:
			break;
	}
}
