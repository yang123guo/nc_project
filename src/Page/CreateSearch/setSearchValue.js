//设置查询区数据
export default function setSearchValue (id,data) {
    this.state.meta[id] = data;
    this.setState({
        meta:this.state.meta
    })
}