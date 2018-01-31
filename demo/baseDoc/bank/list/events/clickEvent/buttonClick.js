import {Link, hashHistory} from 'react-router';
export default function(props, id) {
	console.log(props)
    let {table}=props;
    switch (id) {
		case 'addButton'://调用table中弹出添加的卡片框方法
			props.table.openModel('tableBank', 'add');
			break;
		default:
			break;
	}
}