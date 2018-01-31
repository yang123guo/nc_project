//切换每页显示条数时，重新请求数据，并且返回
export default function pageSizeChange (pageSize) {
    console.log(pageSize)
    return this.data
}