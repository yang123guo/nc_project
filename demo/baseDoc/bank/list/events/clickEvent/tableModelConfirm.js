// import {ajax} from 'nc-lightapp-front'
import ajax from '../../../../../../src/api/ajax';
import {Link, hashHistory} from 'react-router';
export default function (props, data1,opr) {
    let _url=""
    if(opr=="add"){
        _url='/demo-web/demo/bank/save'
    }else if(opr=="edit"){
        _url='/demo-web/demo/bank/update'
    }
    let data={'data':{'bank':data1.data.tableBank}}
    ajax({
        url: _url,
        data: data,
        success: function(res) {
            let pageInfo = props.table.getTablePageInfo('tableBank');
            let searchParams = { searchMap: { "bankname": "" } };
            let data = {
                ...pageInfo,
                page: 0,
                searchParams,
            }
            let { setAllTableData } = props.table
            //得到数据渲染到页面
            ajax({
                url: '/demo-web/demo/bank/query',
                data: data,
                success: function (res) {
                    setAllTableData && setAllTableData('tableBank', res.data.bank)
                }
            });
        }
    });
}