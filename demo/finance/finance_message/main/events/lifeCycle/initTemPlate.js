
export default function(props) {
    
     let meta = {
        tableArea1: {
            moduleType: 'table',
            pagination: false,
            columns: [
                {
                    label: '投资日期/到期日',
                    key: 'investToEndData'
                },
                {
                    label: '投资金额',
                    key: 'investmny'
                },
                {
                    label: '投资期限',
                    key: 'investtype',
                    itemType: 'select',
                    options: [
                        {
                            display: '活期',
                            value: 0
                        },
                        {
                            display: '三个月',
                            value: 1
                        },
                        {
                            display: '半年',
                            value: 2
                        }
                    ]
                },
                {
                    label: '年化收益率%',
                    key: 'interstrate',
                },

                {
                    label: '到期收益',
                    key: 'expectedinterest',
                }
            ]
        }
     };

     let tableMeta = meta.tableArea1;
     if (tableMeta) {
         tableMeta.columns = tableMeta.columns.map((item, key) => {
             if (item.key == "investToEndData") {
                 item.render = (text, record, index) => {
                     if (record.investtype.value == "0") {
                         return (
                             <span>
                                 {record.investdate.value}<br />--
                             </span>
                         )
                     } else {
                         return (
                             <span>
                                 {record.investdate.value}<br />{record.enddate.value}
                             </span>
                         )
                     }
                 }
             }
             if (item.key == "investmny") {
                 item.render = (text, record, index) => {
                     return (
                         <span>
                             <a href={"#/finance/finance_message/card?type=browse&id=" + record.id.value}>{record.investmny.value}</a>
                         </span>
                     )
                 }
             }
             if (item.key == "interstrate") {
                 item.render = (text, record, index) => {
                     return (
                         <span>
                             {record.interstrate.value}%
                         </span>
                     )
                 }
             }
             return item
         });
         meta.tableArea1 = tableMeta;
     }
     console.log(meta)
     return meta;
 
 }