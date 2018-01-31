/**
 * Created by wangshhj on 2018/1/23
 */
//添加表格操作列
export default function addOperationColumn(meta) {
    let metas = {
        searchArea: {
            moduleType: 'search',
            items: [{
                key: 'bankname',
                label: '银行',
                itemType: 'refer',
                initialValue: null
            },
                {
                    key: 'investtype',
                    label: '存款类型',
                    itemType: 'select',
                    initialValue: null,
                    options: [{
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
                        },
                        {
                            display: '三年',
                            value: 3
                        },
                        {
                            display: '五年',
                            value: 4
                        }
                    ]
                },
                {
                    key: 'beginmny',
                    label: '起始理财金额',
                    itemType: 'input',
                    initialValue: null
                },
                {
                    key: 'endmny',
                    label: '截止理财金额',
                    itemType: 'input',
                    initialValue: null
                },
                {
                    key: 'begindate',
                    label: '起始购买日期',
                    itemType: 'datePicker',
                    initialValue: null
                },
                {
                    key: 'enddate',
                    label: '截止购买日期',
                    itemType: 'datePicker',
                    initialValue: null
                }
            ]
        },
        insertTable: {
            insertTable1: {
                // pagination: false,
                columns: [
                    {
                        title: '用户名',
                        dataIndex: 'a',
                        key: 'a',
                        width: 100
                    },
                    {
                        id: '123',
                        title: '性别',
                        dataIndex: 'b',
                        key: 'b',
                        width: 100
                    },
                    {
                        title: '年龄',
                        dataIndex: 'c',
                        key: 'c',
                        width: 200
                    },
                    {
                        title: "操作",
                        dataIndex: "d",
                        key: "d",
                        render(text, record, index) {
                            if(record.a == "令狐冲"){
                                return (
                                    <span
                                        onClick={() => {
                                            alert("这是第" + index + "列，内容为:" + JSON.stringify(record));
                                        }}
                                    >
                          新增
                                            </span>
                                );
                            }else{
                                return (
                                    <span
                                        onClick={() => {
                                            alert("这是第" + index + "列，内容为:" + JSON.stringify(record));
                                        }}
                                    >
                          修改
                                            </span>
                                );
                            }

                        }
                    }
                ]
            }
        },
    }
    return metas
}