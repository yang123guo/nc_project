
export default function(props) {
    
     let meta = {
        tableBank: {
            moduleType: 'table',
            pagination: {
                pageSize: 10
            },
            columns: [
                {
                    label: '银行编码',
                    key: 'orgid',
                    itemType: 'input'
                },
                {
                    label: '银行名称',
                    key: 'bankname',
                    itemType: 'input',
                },
                {
                    label: '期限',
                    key: 'investmny',
                    itemType: 'checkbox',
                    options: [
                        {
                            "display": "活期",
                            "value": false
                        },
                        {
                            "display": "三个月",
                            "value": false
                        },
                        {
                            "display": "半年",
                            "value": false
                        }
                    ]
                },
                {
                    label: '时间',
                    key: 'investdate',
                    itemType: 'switch',
                }
            ]
        }
     };

     //操作列
    let tableMeta = meta.tableBank;
    if (tableMeta) {
        let event = {
            label: "操作",
            key: "opr",
            itemType: 'label',
            render(text, record, index) {
                return (
                    <div>
                        <i className="icon iconfont icon-bianji" onClick={() => {

                            props.table.openModel('tableBank', 'edit', record)
                        }}>
                        </i>
                    </div>
                );

            }
        };
        tableMeta.columns.push(event);
        meta.tableBank = tableMeta;
    }
 
     return meta;
 
 }