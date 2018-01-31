import Axios from 'axios';
export default function(props, id) {
	let {form}=props;
	switch (id) {
		case 'saveButton':
			//判断前5项必输内容，保存时校验不能为空。
			let flag = form.isCheckNow('invest');
			//调用ajax保存数据
			let data = form.getAllFormValue('invest');
			if(flag){
				Axios({
					method: 'post',
					url: '/demo-web/demo/invest/save',
					data: {data:data}
				})
					.then((res) => {
						console.log(res)
					})
			}
			
			break;
		case 'cancelButton':
		    form.EmptyAllFormValue('invest')
			//表单清空
			break;
		default:
			break;
	}
}
