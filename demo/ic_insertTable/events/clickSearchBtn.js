import Ajax from '../../../src/api/ajax';
import Qs from 'qs';
import { ajax } from '../../../src';
import axios from 'axios';

//点击查询，获取查询区数据
export default function clickSearchBtn (val) {
    console.log(val);
    let url = 'http://10.11.115.82:8081/demo-web/demo/inment/searchByCondition';
    let data = {
        "page": 0,
        "size": 10,
        "searchParams": {
            "searchMap": {
                // "bankname": "工",
                // "beginmny": 100,
                // "endmny":10000,
                // "begindate": "2018-01-02",
                // "enddate": "2018-02-12",
                // "page":0,
                // "size":10,
                // "sort":{
                //     "property": "investdate",
                //     "direction": "desc"
                // }
            }
        }
    }

    // ajax({
    //     url: url,
    //     data:data,
    //     success:function (res) {
    //         console.log(res)
    //     },
    //     error:function (res) {
    //         console.log(res)
    //     }
    // });



    //模拟数据
    let newData = [
        { a: "红眼", b: "男", c: 41, d: "操作", key: "1" },
        { a: "鬼泣", b: "男", c: 67, d: "操作", key: "2" },
        { a: "剑圣", b: "男", c: 25, d: "操作", key: "3" }
    ];
    this.setInsertTableValue("insertTable1",newData)

    this.setSearchValByField('searchArea',"bankname",'哇咔咔');
    let a = this.getAllSearchData("searchArea")
    console.log(a)

};