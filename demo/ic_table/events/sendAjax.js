import Axios from "axios";

export default function (pageInfo, keyWords, callback) {
    let _this = this;
    let params = {
        ...pageInfo,
        keyWords
    }

    Axios.post('tableData', params)
    .then(function (res) {
       
        callback && callback('tableArea1', res.data.bank )
    });
}