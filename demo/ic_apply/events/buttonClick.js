export default function(props, id) {
	switch (id) {
		case 'setValueButton':
			props.form.setValue('form1', {
				userName: 'liyxt@yonyou.com',
				passWord: 'yonyou.com@1988'
			});
			props.button.setDisabled({
				getValueButton: false
			});
			break;
		case 'getValueButton':
			console.log(props.form.getAllValue());
			break;
		case 'getDisabledTrue':
			props.form.setDisabled('form1', {
				userName: true,
				passWord: true
			});
			break;
		case 'getDisabledFalse':
			props.form.setDisabled('form1', {
				userName: false,
				passWord: false
			});
			break;
		case 'setTab':
			props.tabs.setTabVisible("tabs1","3");
		break;
		default:
			break;
	}
}
