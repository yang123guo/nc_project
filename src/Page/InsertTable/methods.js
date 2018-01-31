/**
 * Created by wangshhj on 2018/1/18.
 */
//获取当前表格所有数据(可能用不到)
export function getInsertTableValue(id) {
    return this.state.insertTable[id];
}

//重新查询后，更新表格数据
export function setInsertTableValue(id,newData) {
    let newInsertTable = {
            data:newData,
            pageInfo: {}
    };
    this.state.insertTable[id] = newInsertTable;
    this.setState({
        insertTable:this.state.insertTable
    });
}