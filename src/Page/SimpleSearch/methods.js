// 改变查询表单中的值
export function setSimpleSearchValue(id,value) {
    this.state.simpleSearch[id].inputValue=value;
    this.setState({
        simpleSearch:this.state.simpleSearch
    })
    // this.searchOnChange.bind(this,{ ...this.props,table: this.table},this.state.simpleSearch[id].inputValue)()
}
export function getSimpleSearchValue(id){
    return this.state.simpleSearch[id].inputValue
}