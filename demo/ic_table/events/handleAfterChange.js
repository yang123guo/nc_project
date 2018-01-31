import getTableData from "./sendAjax";
export default function(props) {
	let pageInfo = props.table.getTablePageInfo('tableArea1')
	let keyWords = null; // 通过第三方方法获得
	getTableData(pageInfo, keyWords, props.table.setAllTableData);
}


