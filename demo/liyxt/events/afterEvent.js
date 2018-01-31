export default function(props, moduleId, itemId, value) {
	console.log(`触发编辑后事件：moduleId:${moduleId},itemId:${itemId},value:`, value);
	let { form: { setValue }, button: { setDisabled } } = props;
	if (itemId === 'userName') {
		if (value === 'liyxt') {
			setValue('form1', { passWord: '123456a' });
		} else if (value === '') {
			setValue('form1', { passWord: '' });
			setDisabled({ getValueButton: true });
			setDisabled({ getValueButton: true });
		} else {
			setDisabled({ getValueButton: false });
		}
	}
}
