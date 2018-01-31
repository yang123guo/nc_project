import Axios from "axios";

export default function (pageInfo, keyWords, callback) {
    let _this = this;
    let params = {
        ...pageInfo,
        keyWords
    }

    Axios.post('/demo-web/demo/invest/query', params)
    .then(function (res) {
        let { status } = res;
        if (status === 200) {
            callback && callback('tableArea1',res.data.data.invest)
        }
    });
}