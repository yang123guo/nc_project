// import {ajax} from 'nc-lightapp-front'
import ajax from '../../../../../../src/api/ajax'
export default function(props) {
    let searchValue=props.simpleSearch.getSimpleSearchValue('123')//获得模糊查询条件
    let pageInfo = props.table.getTablePageInfo('tableBank')
    let searchParams ={searchMap:{"bankname": searchValue||""}}; 
	let data = {
        ...pageInfo,
        searchParams
    }
    let {setAllTableData}=props.table
    //得到数据渲染到页面
    ajax({
        url: '/demo-web/demo/bank/query',
        data: data,
        success: function(res) {
			setAllTableData('tableBank',res.data.bank)
        }
    });
}


