export default function(props, id) {
	switch (id) {
		case 'setValueButton':
			props.form.setValue({
				userName: 'liyxt@yonyou.com',
				passWord: 'yonyou.com@1988'
			});
			break;
		case 'getValueButton':
			console.log(props.form.getAllValue());
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
		case 'setTab':
			props.tabs.setTabVisible("tabs1","3");
		break;
		default:
			break;
	}
}


