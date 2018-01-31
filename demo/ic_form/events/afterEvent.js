export default function(props, moduleId, key, value) {
	console.log(`触发编辑后事件：key:${key},value:${value}`);
	if (key === 'userName') {
		// if (value === 'liyxt') {
		// 	props.form.setValue({ passWord: '123456a' });
		// } else if (value === '') {
		// 	props.form.setValue({ passWord: '' });
		// 	props.button.setDisabled({ getValueButton: true });
		// 	props.button.setDisabled({ getValueButton: true });
		// } else {
		// 	props.button.setDisabled({ getValueButton: false });
		// }
	}

	if (key === 'rate') {
		props.form.setFormItemsVerify('formArea1', {
			'rate': false
		});
	}
}
