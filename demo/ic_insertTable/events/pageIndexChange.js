import Ajax from '../../../src/api/ajax';

//点击分页按钮时，请求下一页数据，并且返回该数据
export default function pageIndexChange(index) {
    let data = {
        pageIndex:index
    };
    let setInsertTableValue = this.setInsertTableValue;
    Ajax({
        url:'',
        data:data,
        success:function (res) {
            if(res.state){
                setInsertTableValue('insertTable1',res.data)
            }
        }
    })
}