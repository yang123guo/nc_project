// import {ajax} from 'nc-lightapp-front'
import ajax from '../../../../../../src/api/ajax'
export default function searchButtonClick(props,value){
    //获取搜索值value,通过value模糊查询得到数据
    let pageInfo =props.table.getTablePageInfo('tableBank');//获得分页内容
    let searchParams ={searchMap:{"bankname": value||""}}; //获得模糊查询条件
    let data = {
        ...pageInfo,
        searchParams,
    }
    let {setAllTableData}=props.table
    //得到数据渲染到页面
    ajax({
        url: '/demo-web/demo/bank/query',
        data: data,
        success: function(res) {
            // if(res.data.bank){
                setAllTableData && setAllTableData('tableBank',res.data.bank)
            // }else{
            //     setAllTableData && setAllTableData('tableBank')
            // }
            
        }
    });
}