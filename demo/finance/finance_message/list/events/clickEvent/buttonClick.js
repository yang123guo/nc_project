
export default function (props, id) {
	switch (id) {
		case 'addButton':
			window.location.hash = '/finance/finance_message/card?type=add';
			break;
		default:
			break;
	}
}