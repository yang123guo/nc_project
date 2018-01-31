import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'tinper-bee';
import './index.less';

export default class ToastModal extends Component {
	static defaultProps = {
		duration: 3,
		color: 'success',
		content: '成功了, 哈哈哈',
		title: '出错了'
	};
	constructor() {
		super();
	}

	componentDidMount() {
		this.closeTimer = setTimeout(() => {
			this.closeToast();
		}, this.props.duration * 1000);
	}

	//删除toast弹框
	closeToast = () => {
		let element = document.getElementsByClassName('toast-zijinyun-project')[0];
		if (element) {
			ReactDOM.unmountComponentAtNode(element);
			clearTimeout(this.closeTimer);
			this.closeTimer = null;
			document.getElementById('app').removeChild(element);
		}
	};

	render() {
		let { color, content, title } = this.props;
		if (color === 'info') {
			title = '温馨提示';
		} else if (color === 'warning') {
			title = '请注意';
		}
		let className = `toast-modal ${color}`;
		let toastIcon = (color) => {
			let iconName = 'icon-tishianniuchenggong';
			if (color === 'danger') {
				iconName = 'icon-tishianniuguanbi';
			} else if (color === 'warning') {
				iconName = 'icon-tishianniuzhuyi';
			} else if (color === 'info') {
				iconName = 'icon-tishianniutixing';
			}
			let name = `toast-icon iconfont ${iconName} ${color}`;
			return <Icon className={name} />;
		};
		let closeIcon = () => {
			return (
				<Icon
					className="close-icon iconfont icon-guanbi"
					onClick={() => {
						this.closeToast();
					}}
				/>
			);
		};
		let showContent = (color, content, title) => {
			return (
				<div className="toast-box">
					<div className="toast-title">{color !== 'success' ? title : content}</div>
					{color !== 'success' && <div className="toast-content">{content}</div>}
				</div>
			);
		};
		return (
			<div className="toast-mask-modal" ref="toast_mask">
				<div className={className} ref="toast">
					{toastIcon(color)}
					{showContent(color, content, title)}
					{closeIcon()}
				</div>
			</div>
		);
	}
}
