
import Ajax from '../../../../../../src/api/ajax';
import NCMessage from '../../../../../../src/base/nc_Message'
//点击查询，获取查询区数据
export default function clickSearchBtn(val) {
    let { enddate, begindate, endmny, beginmny } = val;

    //点击查询按钮时，校验日期和金额
    if (enddate && begindate) {
        if (contrastDate(begindate, enddate)) {
            NCMessage.create({ content: "截止日期应晚于起始日期", color: 'danger' });
            return;
        }
    }

    if (endmny && beginmny) {
        if (parseFloat(endmny) < parseFloat(beginmny)) {
            //交换数值
            this.props.search.setSearchValByField('financeSearchArea', "endmny", beginmny);
            this.props.search.setSearchValByField('financeSearchArea', "beginmny", endmny);
        }
    }
    let pageInfo = this.props.table.getTablePageInfo('financeListTable')

    val.page = 0;
    val.size = pageInfo.size;
    val.beginmny = parseFloat(beginmny);
    val.endmny = parseFloat(endmny);
    val.sort = {
        property: "investdate",
        direction: "desc"
    }
    let data = {
        page: 0,
        size: pageInfo.size,
        searchParams: {
            searchMap: val
        }
    }

    //校验通过后，条件查询请求
    const _this = this;
    Ajax({
        method: 'post',
        data: data,
        url: '/demo-web/demo/inment/search',
        success: function (res) {
            _this.props.table.setAllTableData("financeListTable", res.data.invest);
        }
    })

};

//判断格式为'YYYY-MM-DD'的两个日期大小
function contrastDate(date1, date2) {
    return ((
        new Date(date1.replace(/-/g, "\/"))) > (new Date(date2.replace(/-/g, "\/"))
        ));
}