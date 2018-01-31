/**
 * Created by wangshhj on 2018/1/25.
 */
//获取查询区所有数据
export default function getAllSearchData (id) {
    if(!this.state.meta.hasOwnProperty(id)){
        return false
    }
    let callBackMeta = {};
    let searchInfo = this.state.meta[id];

    searchInfo.items.map((val,index) => {
        if(val.itemType == 'rangePicker' && val.initialValue ){
            let vals = val.initialValue;
            let newVal = [];
            vals.map(function (value) {
                newVal.push(value.format("YYYY-MM-DD"))
            });
            callBackMeta[val.key] = newVal;
        }else if(val.itemType == 'select' ){
            callBackMeta[val.key] = val.initialValue?val.initialValue:null;
        }else if(val.itemType == 'refer' ){
            let ref = null;
            if(val.initialValue){
                if(val.initialValue.hasOwnProperty('refpk')){
                    ref = val.initialValue.refpk
                }
            }
            callBackMeta[val.key] = ref;
        }else{
            callBackMeta[val.key] = val.initialValue?val.initialValue:null;
        }
    });
    return callBackMeta

}