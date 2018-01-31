import ReactDOM from 'react-dom';
import ToastModal from '../containers/ToastModal';

export default (props) => {
	props = props || {};
	let isShow = document.getElementsByClassName('toast-zijinyun-project')[0];
	//阻止连续多次点击时页面出现多个toast弹框
	if (isShow) {
		return false;
	}
	let div = document.createElement('div');
	div.className = 'toast-zijinyun-project';
	document.getElementById('app').appendChild(div);
	const toasts = ReactDOM.render(<ToastModal {...props} />, div);
	return toasts;
};
