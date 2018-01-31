/**
 * Created by wangshhj on 2018/1/23.
 */
//设置查询区具体某个字段数据
export default function setSearchValByField (searchId,field,data) {
    if(this.state.meta.hasOwnProperty(searchId)){
        this.state.meta[searchId].items.find((val) => {
            if(val.key == field){
                val.initialValue = data
            }
        });
        this.setState({
            meta:this.state.meta
        })
    }
}