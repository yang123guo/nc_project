//点击加号展开内嵌表格时，业务组请求表格数据，并且返回该数据
export default function setTableBodyData (record) {    //record为点击的当前行信息
    //发送ajax请求内嵌表格数据，并return该数据
    let insertTableInfo = null;
    if(record.a == "杨过"){
        //假数据
        insertTableInfo = {
            columns:[
                { title: "用户名", dataIndex: "a", key: "a", width: 100
                },
                { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
                { title: "年龄", dataIndex: "c", key: "c", width: 200 },
            ],
            data:[
                { a: "麻花藤", b: "男", c: 41, d: "操作", key: "1" }
            ]
        };
    }else{
        insertTableInfo = {
            columns:[
                { title: "用户名", dataIndex: "a", key: "a", width: 100
                },
                { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
                { title: "年龄", dataIndex: "c", key: "c", width: 200 },
            ],
            data:[
                { a: "麻花藤", b: "男", c: 41, d: "操作", key: "1" },
                { a: "麻花藤", b: "男", c: 41, d: "操作", key: "2" },
                { a: "麻花藤", b: "男", c: 41, d: "操作", key: "3" },
                { a: "麻花藤", b: "男", c: 41, d: "操作", key: "4" }
            ]
        };
    }
    return insertTableInfo
};