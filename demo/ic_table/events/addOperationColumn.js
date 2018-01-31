
import {Link, hashHistory} from 'react-router';
//添加表格操作列
export default function addOperationColumn(meta) {
    let tableMeta = meta.tableArea1;
    if (tableMeta) {
        let event = {
            title: "操作",
            key: "opr",
            render(text, record, index) {
                return (
                    <span>
                        <span
                            onClick={() => {
                                hashHistory.push('/finance/finance_message/card?type=edit?id=')
                            }}
                        >
                            修改 
                        </span>
                        <span
                            onClick={() => {
                                alert("删除" + JSON.stringify(record));
                            }}
                        >
                             删除
                        </span>
                    </span>
               );
            }
        };
        tableMeta.columns.push(event);
        return tableMeta
    }
}