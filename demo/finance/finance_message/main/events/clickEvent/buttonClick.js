
export default function(props, id) {
    switch (id) {
		case 'skipToBank'://“银行”按钮，跳转到银行档案
			window.location.hash='/baseDoc/bank/list';
			break;
        case 'skipToAllMessage'://“全部”按钮，跳转到列表页面
			window.location.hash='/finance/finance_message/list'
			break;
		default:
			break;
	}
}