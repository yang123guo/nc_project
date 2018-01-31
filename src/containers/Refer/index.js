import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import './index.less';
import Qs from 'qs';
import {
	NCLoading as Loading,
	NCCollapse as Collapse,
	NCIcon as Icon,
	NCFormControl as FormControl,
	NCRow as Row,
	NCCol as Col
} from '../../base';
import toast from '../../api/toast';

class Refer extends Component {
	constructor(props) {
		super(props);
		let { isMultiSelectedEnabled } = props;
		this.state = {
			value: props.value, //参照的值
			cascaderVal: isMultiSelectedEnabled
				? props.value.map((e) => e.refname).join(',')
				: props.value.refname || '', //输入框的值
			cascader: [], //参照下拉列表的数据
			currentLevel: 0, //
			searchList: { pageInfo: { currPageIndex: 1 }, data: [] },
			historyList: [],
			isShow: false,
			searchShow: false,
			historyShow: false,
			loading: false,
			selectedpks: {}
		};
		this.suffix = String(Math.random()).split('.')[1];
		this.canload = true;
		this.interval = 0;
		this.fixTop = 0;
		this.fixLeft = 0;
		this.fixWidth = 0;
		this.parentid = '';
		this.typeCode = '';
		this.keyWords = '';
		this.detailcategory = '';
	}

	componentDidMount() {
		// this.matchPKRefJSON();
		document.body.addEventListener('click', this.close);
	}

	//计算参照下拉定位
	componentWillUpdate(nextProps, nextState) {
		let { isShow, historyShow, searchShow } = nextState;
		let { multiLevelMenu } = this.props;
		let clientHeight = document.documentElement.clientHeight,
			clientWidth = document.documentElement.clientWidth,
			inputWidth = document.getElementById('refer-input' + this.suffix).offsetWidth,
			inputHeight = document.getElementById('refer-input' + this.suffix).offsetHeight,
			selectWidth = isShow
				? multiLevelMenu.length
					? multiLevelMenu.length * inputWidth + (multiLevelMenu.length - 1) * 4
					: inputWidth
				: inputWidth,
			offsetLeft =
				document.getElementById('refer-input' + this.suffix).getBoundingClientRect().left +
				(document.documentElement.scrollLeft || document.body.scrollLeft),
			offsetTop =
				document.getElementById('refer-input' + this.suffix).getBoundingClientRect().top +
				(document.documentElement.scrollTop || document.body.scrollTop),
			top = document.getElementById('refer-input' + this.suffix).getBoundingClientRect().top,
			left = document.getElementById('refer-input' + this.suffix).getBoundingClientRect().left,
			fixTop = 0,
			fixLeft = 0;
		this.fixWidth = inputWidth;
		this.selectWidth = selectWidth;
		if (top + inputHeight + 200 > clientHeight) {
			this.fixTop = offsetTop - 200 - 4;
		} else {
			this.fixTop = offsetTop + inputHeight + 4;
		}

		if (left + selectWidth > clientWidth) {
			this.fixLeft = left + inputWidth - selectWidth;
		} else {
			this.fixLeft = offsetLeft;
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.isMultiSelectedEnabled) {
			if (nextProps.value.refpk) {
				this.setState({
					cascaderVal: nextProps.value.refname,
					value: nextProps.value,
					selectedpks: {
						[nextProps.value.refpk]: nextProps.value
					}
				});
			} else {
				this.setState({
					cascaderVal: '',
					value: {},
					selectedpks: {}
				});
			}
		} else if (this.props.isMultiSelectedEnabled) {
			if (nextProps.value.length) {
				this.state.selectedpks = {};
				this.state.cascaderVal = nextProps.value
					.map((e) => {
						this.state.selectedpks[e.refpk] = e;
						return e.refname;
					})
					.join(',');
				this.setState({
					cascaderVal: this.state.cascaderVal,
					value: nextProps.value,
					selectedpks: this.state.selectedpks
				});
			} else {
				this.setState({
					cascaderVal: '',
					value: [],
					selectedpks: {}
				});
			}
		}
	}

	//横向滚动条始终在最右侧
	componentDidUpdate() {
		//设置横向滚动时总是到最右侧
		document.querySelector(`#refer-list${this.suffix}>div`).scrollLeft = 10000;
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.close);
	}

	//请求数据
	loadData = async (level) => {
		await new Promise((resolve) => {
			this.setState(
				{
					loading: true
				},
				() => {
					let { cascader, currentLevel, cascaderVal } = this.state;
					let {
						multiLevelMenu,
						ctx,
						refModelUrl,
						refCode,
						refClientPageInfo,
						pageSize,
						clientParam,
						referFilter
					} = this.props;
					//TODO:请求参数
					// let param = {
					// 	refModelUrl: `${refModelUrl}`,
					// 	refCode: refCode,
					// 	'refClientPageInfo.pageSize': pageSize,
					// 	'refClientPageInfo.currPageIndex': cascader[level] ? cascader[level].pageInfo.currPageIndex : 0,
					// 	clientParam: JSON.stringify({
					// 		parentid: this.parentid,
					// 		detailcategory: level + 1, //当前请求的是第几级数据
					// 		maincategory: this.maincategory, //交易类型参照用到
					// 		typeCode: this.typeCode, //银行网点参照用到
					// 		keyWords: this.keyWords || '', //银行网点参照用到
					// 		referFilter, //参照过滤
					// 		...clientParam
					// 	})
					// };
					// param = Qs.stringify(param);
					let param = {
						page: 0,
						size: 10
					};
					//后台请求数据
					axios({
						url: ctx + this.props.url,
						method: 'post',
						data: param,
						headers: {
							// 'Content-type': 'application/json; charset=UTF-8'
							// 'X-Requested-With': 'XMLHttpRequest'
						}
					}).then((res) => {
						if (!res || !res.data) {
							toast({ color: 'danger', content: '请求失败' });
							return;
						}
						let data;
						data = res.data.data.map((e, i) => {
							e.refpk = e.refpk || e.id;
							return e;
						});
						cascader[level] = {
							pageInfo: { ...cascader[level].pageInfo, pageCount: res.data.page.pageCount },
							data: cascader[level].data.concat(data)
						};
						this.setState({
							cascader,
							loading: false
						});
						this.canload = true;
						resolve();
					});
				}
			);
		});
	};

	getOptions = async (item, level, e) => {
		let { cascader, currentLevel } = this.state;
		let { multiLevelMenu, hotDataSize, isTreeCanSelect } = this.props;
		this.clearSearch();
		if (typeof multiLevelMenu === 'object' && multiLevelMenu.length) {
			//点击的是分类
			if (multiLevelMenu.length > level) {
				//如果没到最后一级分类，则查询下级分类
				// cascader.length = level + 1;
				if (isTreeCanSelect) {
					this.select(item, e);
				}
				cascader[level - 1].selectedData = item;
				cascader[level] = {
					data: [],
					pageInfo: {
						currPageIndex: 1,
						pageSize: this.props.pageSize
					}
				};
				this.parentid = item.refpk;
				this.typeCode = item.refcode;
				this.keyWords = item.refname;
				await this.loadData(level);
				this.setState({
					cascader,
					currentLevel: level
				});
			} else {
				//否则选中数据
				this.select(item, e);
			}
		} else {
			//点击的是数据列，选中数据
			this.select(item, e);
		}
	};

	select = (item, e) => {
		e.stopPropagation();
		if (this.props.isMultiSelectedEnabled) {
			// 多选
			let { selectedpks, value } = this.state;
			if (item.refpk) {
				// selectedpks[item.refpk] = !selectedpks[item.refpk];
				if (selectedpks[item.refpk]) {
					// 取消选中
					// value.push(item);
					delete selectedpks[item.refpk];
				} else {
					// 选中
					// let i = value.findIndex((e) => e.refpk === item.refpk);
					// value.splice(i, 1);
					selectedpks[item.refpk] = item;
				}
				// this.props.onChange && this.props.onChange(value);
				this.setState({ selectedpks, value });
			}
		} else {
			// 单选
			let { hotDataSize, isTreeCanSelect, multiLevelMenu } = this.props;
			let { selectedpks, isShow, currentLevel } = this.state;
			this.props.onChange && this.props.onChange(item);
			if (item.refpk) {
				// 存入已选择
				selectedpks = { [item.refpk]: true };
				//存入历史记录localStorage
				let history = localStorage[this.props.refCode + this.props.multiLevelMenu.length]
					? localStorage[this.props.refCode + this.props.multiLevelMenu.length]
							.split('&&&')
							.map((e) => JSON.parse(e))
					: [];
				let index = history.findIndex((e) => e.refpk === item.refpk);
				if (index === -1) {
					history.unshift(item);
					if (history.length > hotDataSize) {
						history = history.slice(0, hotDataSize);
					}
				} else {
					let t = history.splice(index, 1);
					history.unshift(t[0]);
				}
				localStorage[this.props.refCode + this.props.multiLevelMenu.length] = history
					.map((e) => JSON.stringify(e))
					.join('&&&');
			}
			if (isShow && isTreeCanSelect && currentLevel < multiLevelMenu.length - 1) {
				this.setState({
					selectedpks
				});
			} else {
				this.setState({
					currentLevel: 0,
					isShow: false,
					searchShow: false,
					historyShow: false,
					cascader: [],
					selectedpks: {}
				});
			}
		}
	};

	search = () => {
		this.setState(
			{
				loading: true
			},
			() => {
				let { searchList, currentLevel, cascaderVal } = this.state;
				let {
					multiLevelMenu,
					ctx,
					searchUrl,
					refModelUrl,
					refCode,
					refClientPageInfo,
					pageSize,
					clientParam,
					referFilter
				} = this.props;
				let param = {
					refModelUrl: `${refModelUrl}`,
					refCode: refCode,
					'refClientPageInfo.pageSize': pageSize,
					'refClientPageInfo.currPageIndex': searchList.pageInfo.currPageIndex,
					content: JSON.stringify({
						name: cascaderVal, //搜索内容
						code: cascaderVal //搜索内容
					}),
					clientParam: JSON.stringify({
						keyWords: cascaderVal || clientParam.keyWords || '',
						// typeCode: multiLevelMenu.length ? '1' : '0',
						// accounttype: '', //银行账户用到，好像被挪到referFilter里了
						referFilter, //参照过滤
						detailcategory: multiLevelMenu.length, //搜索最末级的数据
						...clientParam
					})
				};
				param = Qs.stringify(param);
				//后台请求数据
				axios({
					url: ctx + searchUrl,
					method: 'post',
					data: param,
					headers: {
						'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					}
				})
					.then((res) => {
						if (!res || !res.data) {
							toast({ color: 'danger', content: '请求失败' });
							return;
						}
						let data = searchList.data.concat(
							res.data.data.map((e, i) => {
								e.refpk = e.refpk || e.id;
								return e;
							})
						);
						this.setState({
							searchList: {
								data,
								pageInfo: { ...searchList.pageInfo, pageCount: res.data.page.pageCount }
							},
							loading: false
						});
						// this.canload = true;
					})
					.catch((err) => {
						//alert(err.message);
					});
			}
		);
	};

	getMoreOptions = (index) => {
		let { cascader, isShow, searchList, searchShow } = this.state;
		//加载下一页
		if (isShow) {
			cascader[index].pageInfo.currPageIndex++;
			console.log('第', index + 1, '级菜单加载下一页，现在第', cascader[index].pageInfo.currPageIndex, '页');
			this.loadData(index);
		} else if (searchShow) {
			searchList.pageInfo.currPageIndex++;
			console.log('搜索结果加载下一页，现在第', searchList.pageInfo.currPageIndex, '页');
			this.search();
		}
	};

	blur = (e) => {
		e.stopPropagation();
		//如果有搜索结果，失去焦点时取第一条结果，没有结果则置空
		let { searchShow, searchList, historyShow, isShow, selectedpks, cascaderVal } = this.state;
		let { isTreeCanSelect, isMultiSelectedEnabled } = this.props;
		if (!isTreeCanSelect) {
			if (isMultiSelectedEnabled) {
				this.props.onChange && this.props.onChange(Object.values(selectedpks));
			} else {
				if (isShow && cascaderVal && Object.values(selectedpks)[0]) {
					this.select(Object.values(selectedpks)[0], e);
				} else if (searchShow && searchList.data && searchList.data.length) {
					this.select(this.state.searchList.data[0], e);
				} else {
					this.select({}, e);
				}
			}
		}
		console.log('失去焦点时校验数据的准确性');
	};

	focus = (e) => {
		//兼容onFocus事件
		e.stopPropagation();
		if (this.props.disabled) {
			return false;
		}
		let { refCode } = this.props;
		let historyList = [],
			searchShow,
			historyShow,
			//兼容onFocus事件
			value = e.target.value;
		// value = val;

		if (value) {
			searchShow = true;
			historyShow = false;
		} else {
			//显示历史记录
			searchShow = false;
			historyShow = true;
			if (localStorage[this.props.refCode + this.props.multiLevelMenu.length]) {
				historyList = localStorage[this.props.refCode + this.props.multiLevelMenu.length]
					.split('&&&')
					.map((e) => JSON.parse(e));
			}
		}
		this.setState({
			cascaderVal: value,
			searchShow,
			historyShow,
			isShow: false,
			historyList
		});

		this.interval = new Date().getTime();
		let s = setTimeout(() => {
			//停止输入0.5s后执行
			if (new Date().getTime() - this.interval >= 500) {
				if (value) {
					this.state.searchList.data = [];
					this.search();
				} else {
					//显示历史记录
					// if (localStorage[this.props.refCode + this.props.multiLevelMenu.length]) {
					// let ids = localStorage[this.props.refCode + this.props.multiLevelMenu.length]
					// 	.split('&&&')
					// 	.map((e) => `"${JSON.parse(e).refpk}"`)
					// 	.join(',');
					// this.historyList(`(${ids})`);
					// let historyList = localStorage[this.props.refCode + this.props.multiLevelMenu.length]
					// 	.split('&&&')
					// 	.map((e) => JSON.parse(e));
					// this.setState({
					// 	historyList
					// });
					// }
				}
			}
			clearTimeout(s);
		}, 500);
	};

	//分页加载
	ulScroll = (level, e) => {
		let { cascader, isShow } = this.state;
		if (!isShow) {
			return;
		}
		if (e.target.scrollTop > e.target.firstChild.clientHeight - e.target.clientHeight - 5) {
			if (cascader[level].pageInfo.currPageIndex < cascader[level].pageInfo.pageCount) {
				this.canload && this.getMoreOptions(level);
				this.canload = false;
			}
		}
	};

	close = (e) => {
		let { isShow, searchShow, historyShow } = this.state;
		let { isMultiSelectedEnabled } = this.props;
		if (!(isShow || searchShow || historyShow)) {
			return false;
		}
		if (
			!(
				e.target.matches(`#refer${this.suffix} span.icon-canzhao`) ||
				e.target.matches(`#refer${this.suffix} input.refer-input`) ||
				e.target.matches(`#refer-container${this.suffix} p.list-title`) ||
				e.target.matches(`#refer-container${this.suffix} li.refer-li`) ||
				e.target.matches(`#refer-container${this.suffix} div.refer-scroll`)
			)
		) {
			// if (!isMultiSelectedEnabled) {
			this.blur(e);
			// }
			this.setState({
				isShow: false,
				searchShow: false,
				historyShow: false,
				cascader: []
			});
		}
	};

	referClick = (e) => {
		e.stopPropagation();
		if (this.props.disabled) {
			return false;
		}
		let { cascader, currentLevel } = this.state;
		let { multiLevelMenu, clientParam } = this.props;
		this.clearSearch();
		currentLevel = 0;
		cascader = [
			{
				data: [],
				pageInfo: {
					currPageIndex: 1,
					pageSize: this.props.pageSize
				}
			}
		];
		this.setState(
			{
				cascader,
				currentLevel,
				searchShow: false,
				isShow: true,
				historyShow: false
			},
			() => {
				if (typeof multiLevelMenu === 'object' && multiLevelMenu.length > 1) {
					// 多级菜单型
					this.maincategory = Number(this.props.clientParam.maincategory);
					this.asyncLoad(e);
				} else {
					// 列表型
					if (clientParam.ids) {
						//根据id过滤，走matchBlurRefJSON方法
						this.idsFilter();
					} else {
						//走正常的commonRefsearch方法
						this.loadData(0);
					}
				}
			}
		);
	};

	idsFilter = () => {
		let { searchList, cascaderVal, cascader } = this.state;
		let { multiLevelMenu, ctx, searchUrl, refModelUrl, refCode, pageSize, clientParam, referFilter } = this.props;
		let param = {
			refModelUrl: `${refModelUrl}`,
			refCode: refCode,
			'refClientPageInfo.pageSize': pageSize,
			'refClientPageInfo.currPageIndex': searchList.pageInfo.currPageIndex,
			content: JSON.stringify({
				name: cascaderVal,
				code: cascaderVal
			}),
			clientParam: JSON.stringify({
				keyWords: cascaderVal || clientParam.keyWords || '',
				// typeCode: multiLevelMenu.length ? '1' : '0',
				// accounttype: '', //银行账户用到，好像被挪到referFilter里了
				referFilter,
				detailcategory: multiLevelMenu.length,
				...clientParam
			})
		};
		param = Qs.stringify(param);
		axios({
			url: ctx + searchUrl,
			method: 'post',
			data: param,
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then((res) => {
			if (!res || !res.data) {
				toast({ color: 'danger', content: '请求失败' });
				reject('请求失败');
				return;
			}
			let data;
			data = res.data.data.map((e, i) => {
				e.refpk = e.refpk || e.id;
				return e;
			});
			cascader[0] = {
				pageInfo: {
					currPageIndex: 1,
					pageSize: this.props.pageSize,
					pageCount: 1
				},
				data
			};
			this.setState({
				cascader,
				loading: false
			});
			this.canload = true;
		});
	};

	historyList = (ids) => {
		let { searchList, cascaderVal, cascader } = this.state;
		let { multiLevelMenu, ctx, searchUrl, refModelUrl, refCode, pageSize, clientParam, referFilter } = this.props;
		let param = {
			refModelUrl: `${refModelUrl}`,
			refCode: refCode,
			'refClientPageInfo.pageSize': pageSize,
			'refClientPageInfo.currPageIndex': searchList.pageInfo.currPageIndex,
			content: JSON.stringify({
				name: cascaderVal,
				code: cascaderVal
			}),
			clientParam: JSON.stringify({
				keyWords: cascaderVal || clientParam.keyWords || '',
				// typeCode: multiLevelMenu.length ? '1' : '0',
				// accounttype: '', //银行账户用到，好像被挪到referFilter里了
				referFilter,
				detailcategory: multiLevelMenu.length,
				...clientParam,
				ids: ids
			})
		};
		param = Qs.stringify(param);
		axios({
			url: ctx + searchUrl,
			method: 'post',
			data: param,
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then((res) => {
			if (!res || !res.data) {
				toast({ color: 'danger', content: '请求失败' });
				reject('请求失败');
				return;
			}
			let data;
			data = res.data.data.map((e, i) => {
				e.refpk = e.refpk || e.id;
				return e;
			});
			this.setState({
				historyList: data
			});
		});
	};

	queryHistory = () => {
		let { searchList, cascaderVal, cascader } = this.state;
		let { multiLevelMenu, ctx, searchUrl, refModelUrl, refCode, pageSize, clientParam, referFilter } = this.props;
		let param = {
			refModelUrl: `${refModelUrl}`,
			refCode: refCode,
			'refClientPageInfo.pageSize': pageSize,
			'refClientPageInfo.currPageIndex': searchList.pageInfo.currPageIndex,
			content: JSON.stringify({
				name: cascaderVal,
				code: cascaderVal
			}),
			clientParam: JSON.stringify({
				keyWords: cascaderVal || clientParam.keyWords || '',
				// typeCode: multiLevelMenu.length ? '1' : '0',
				// accounttype: '', //银行账户用到，好像被挪到referFilter里了
				referFilter,
				detailcategory: multiLevelMenu.length,
				...clientParam
			})
		};
		param = Qs.stringify(param);
		axios({
			url: ctx + searchUrl,
			method: 'post',
			data: param,
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then((res) => {
			if (!res || !res.data) {
				toast({ color: 'danger', content: '请求失败' });
				return;
			}
			let data;
			data = res.data.data.map((e, i) => {
				e.refpk = e.refpk || e.id;
				return e;
			});
			cascader = [
				{
					pageInfo: {
						currPageIndex: 1,
						pageSize: this.props.pageSize,
						pageCount: 1
					},
					data
				}
			];
			this.setState({
				cascader,
				loading: false
			});
			this.canload = true;
		});
	};

	asyncLoad = async function(e) {
		await this.loadData(0);
		let length = this.props.multiLevelMenu.length;
		let { cascader } = this.state;
		for (let i = 1; i < length; i++) {
			cascader[i - 1].data[0] && (await this.getOptions(cascader[i - 1].data[0], i, e));
		}
	};

	clearSearch = () => {
		this.parentid = '';
		this.typeCode = '';
		this.keyWords = '';
		this.detailcategory = '';
		this.maincategory = '';
	};

	render() {
		let {
			cascader,
			isShow,
			currentLevel,
			searchList,
			searchShow,
			cascaderVal,
			loading,
			historyShow,
			historyList,
			selectedpks
		} = this.state;
		let { fixTop, fixLeft, fixWidth, suffix } = this;
		let length = Object.keys(cascader).length;
		let {
			value,
			refName,
			refCode,
			disabled,
			refModelUrl,
			isFixed,
			multiLevelMenu,
			showLabel,
			isMultiSelectedEnabled,
			showHistory,
			ellipsis
		} = this.props;
		// let multiMenuWidth = multiLevelMenu.length ? (currentLevel + 1) * fixWidth + currentLevel * 4 : '100%';
		let multiMenuWidth = multiLevelMenu.length
			? multiLevelMenu.length * fixWidth + (multiLevelMenu.length - 1) * 4
			: fixWidth;
		return (
			<Row
				componentClass="div"
				className={`refer ${this.props.referClassName}`}
				id={'refer' + this.suffix}
				style={this.props.style}
			>
				<Loading container={document.getElementById('refer-list' + suffix)} show={loading} />
				<Loading container={document.getElementById('search-list' + suffix)} show={loading} />
				{showLabel && (
					<Col
						componentClass="span"
						className="ref-name"
						xs={3}
						style={{ position: 'relative', lineHeight: '28px' }}
					>
						{refName}
					</Col>
				)}
				<Col xs={showLabel ? 9 : 12} style={{ position: 'relative', zIndex: 0, padding: 0, lineHeight: 0 }}>
					<FormControl
						id={'refer-input' + this.suffix}
						className={`refer-input ${this.props.className}`}
						disabled={disabled || false}
						value={cascaderVal || ''}
						onChange={(value, e) => {
							this.focus(e);
						}}
						onFocus={this.focus}
						placeholder={this.props.placeholder}
					/>
					<span
						className="icon-refer"
						style={{ cursor: this.props.disabled ? 'not-allowed' : 'pointer' }}
						onClick={(e) => {
							this.referClick(e);
						}}
					/>
					{ReactDOM.createPortal(
						<div id={'refer-container' + this.suffix}>
							<Collapse
								in={isShow}
								style={{
									overflow: 'hidden',
									// width: multiLevelMenu.length ? 'auto' : fixWidth,
									// maxWidth: fixWidth,
									width: this.selectWidth,
									top: fixTop,
									left: fixLeft
								}}
								onEnter={() => {
									document.getElementById('refer' + this.suffix).style.zIndex = 9999999;
								}}
								onEntered={() => {
									document.getElementById('refer-list' + suffix).style.overflow = 'auto';
								}}
								onExit={() => {
									document.getElementById('refer-list' + suffix).style.overflow = 'hidden';
								}}
								onExited={() => {
									if (!(isShow || searchShow || historyShow)) {
										document.getElementById('refer' + this.suffix).style.zIndex = 0;
									}
								}}
							>
								<div id={'refer-list' + suffix} className="refer-cascading-list clearfix">
									<div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
										<div
											style={{
												width: multiMenuWidth,
												height: '100%',
												backgroundColor: '#eee',
												overflowY: 'hidden'
											}}
										>
											{cascader.map((list, level) => {
												if (currentLevel >= level) {
													return (
														<div
															className={'scroll-div'}
															key={level}
															style={{
																width:
																	(multiMenuWidth - currentLevel * 4) /
																	multiLevelMenu.length
															}}
														>
															<p className="list-title">
																{multiLevelMenu[level].name.join('/')}
															</p>
															<div
																className="refer-scroll"
																onScroll={(e) => {
																	this.ulScroll(level, e);
																}}
															>
																<ul
																	className="refer-cascading-item"
																	key={level}
																	style={{
																		width: multiLevelMenu.length ? 'auto' : '100%'
																	}}
																>
																	{list.data.map((item, i) => {
																		let label = multiLevelMenu[level].code
																			.map((e, i) => {
																				return item[e];
																			})
																			.join('/');
																		return (
																			<li
																				title={label}
																				className={
																					'clearfix refer-li' +
																					(selectedpks[item.refpk]
																						? ' selected'
																						: '') +
																					(list.selectedData &&
																					list.selectedData.refpk ===
																						item.refpk
																						? ' active'
																						: '')
																				}
																				key={i}
																				onClick={this.getOptions.bind(
																					this,
																					item,
																					Number(level) + 1
																				)}
																			>
																				{ellipsis &&
																				level > 0 &&
																				level === multiLevelMenu.length - 1 ? (
																					label.replace(
																						cascader[level - 1].selectedData
																							.refname,
																						'...'
																					)
																				) : (
																					label
																				)}
																				{level < multiLevelMenu.length - 1 && (
																					<Icon
																						type="uf-anglearrowpointingtoright"
																						style={{
																							position: 'absolute',
																							right: '-4px',
																							top: '50%',
																							marginTop: ' -9px'
																						}}
																					/>
																				)}
																			</li>
																		);
																	})}
																</ul>
															</div>
														</div>
													);
												} else {
													return null;
												}
											})}
										</div>
									</div>
								</div>
							</Collapse>
							<Collapse
								in={searchShow}
								style={{
									overflow: 'hidden',
									width: fixWidth,
									top: fixTop,
									left: fixLeft
								}}
								onEnter={() => {
									document.getElementById('refer' + this.suffix).style.zIndex = 9999999;
								}}
								onEntered={() => {
									document.getElementById('refer-list' + suffix).style.overflow = 'auto';
								}}
								onExit={() => {
									document.getElementById('refer-list' + suffix).style.overflow = 'hidden';
								}}
								onExited={() => {
									if (!(isShow || searchShow || historyShow)) {
										document.getElementById('refer' + this.suffix).style.zIndex = 0;
									}
								}}
							>
								<div id={'search-list' + suffix} className="refer-cascading-list refer-search">
									<div className="scroll-div">
										<p className="list-title">搜索结果</p>
										<div className="refer-scroll" onScroll={this.ulScroll}>
											<ul className="refer-cascading-item" style={{ width: '100%' }}>
												{searchList.data.map((item, i) => {
													let label = multiLevelMenu[multiLevelMenu.length - 1].code
														.map((e, i) => {
															return item[e];
														})
														.join('/');
													return (
														<li
															title={label}
															key={i}
															onClick={this.select.bind(this, item)}
															className={
																'clearfix refer-li' +
																(selectedpks[item.refpk] ? ' selected' : '')
															}
														>
															{label}
														</li>
													);
												})}
											</ul>
										</div>
									</div>
								</div>
							</Collapse>
							<Collapse
								in={showHistory && historyShow}
								style={{
									overflow: 'hidden',
									width: fixWidth,
									top: fixTop,
									left: fixLeft
								}}
								onEnter={() => {
									document.getElementById('refer' + this.suffix).style.zIndex = 9999999;
								}}
								onEntered={() => {
									document.getElementById('refer-list' + suffix).style.overflow = 'auto';
								}}
								onExit={() => {
									document.getElementById('refer-list' + suffix).style.overflow = 'hidden';
								}}
								onExited={() => {
									if (!(isShow || searchShow || historyShow)) {
										document.getElementById('refer' + this.suffix).style.zIndex = 0;
									}
								}}
							>
								<div id={'history-list' + suffix} className="refer-cascading-list refer-history">
									<div className="scroll-div">
										<p className="list-title">历史记录</p>
										<div className="refer-scroll">
											<ul className="refer-cascading-item" style={{ width: '100%' }}>
												{historyList.map((item, i) => {
													let label = multiLevelMenu[multiLevelMenu.length - 1].code
														.map((e, i) => {
															return item[e];
														})
														.join('/');
													return (
														<li
															title={label}
															className={
																'clearfix refer-li' +
																(selectedpks[item.refpk] ? ' selected' : '')
															}
															key={i}
															onClick={this.select.bind(this, item)}
														>
															{label}
														</li>
													);
												})}
											</ul>
										</div>
									</div>
								</div>
							</Collapse>
						</div>,
						document.body
					)}
				</Col>
			</Row>
		);
	}
}

Refer.propTypes = {
	value: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
	onChange: PropTypes.func.isRequired,
	isMultiSelectedEnabled: PropTypes.bool,
	refName: PropTypes.string,
	refCode: PropTypes.string,
	condition: PropTypes.object,
	isReturnCode: PropTypes.bool,
	refModelUrl: PropTypes.string,
	multiLevelMenu: PropTypes.array,
	isTreeCanSelect: PropTypes.bool,
	hotDataSize: PropTypes.number,
	ctx: PropTypes.string,
	showLabel: PropTypes.bool,
	pageSize: PropTypes.number,
	disabled: PropTypes.bool,
	referClassName: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	clientParam: PropTypes.object,
	placeholder: PropTypes.string,
	referFilter: PropTypes.object,
	showHistory: PropTypes.bool,
	url: PropTypes.string,
	searchUrl: PropTypes.string
};

Refer.defaultProps = {
	value: {},
	isMultiSelectedEnabled: false, //是否多选
	refName: '', //参照名称
	refCode: '', //参照编码
	pk_val: '', //参照过滤pk
	condition: null, //模糊搜索{name:'111',code:'111'}
	isReturnCode: false, //是否返回编码
	refModelUrl: '', //参照请求地址
	multiLevelMenu: [
		{
			name: [ '名称' ],
			code: [ 'refname' ]
		}
	], //多级菜单
	isTreeCanSelect: false, //多级菜单的树是否可选
	hotDataSize: 20,
	ctx: '/uitemplate_web', //请求上下文
	showLabel: false, //是否显示label
	pageSize: 20, //分页请求数据时每页条数
	disabled: false, //是否禁用
	referClassName: '', //参照最外层classname
	className: '', //参照input的classname
	style: {}, //参照最外层样式
	clientParam: {}, //自定义条件
	placeholder: '',
	referFilter: {},
	showHistory: true,
	url: '/iref_ctr/commonRefsearch', //查询参照数据的url
	searchUrl: '/iref_ctr/matchBlurRefJSON' //参照模糊搜索的url
};

export default Refer;

export class DemoRefer extends Component {
	render() {
		const { refCode } = this.props;
		return <Refer ctx={'/demo-web'} url={`/demo/${refCode}Ref/${refCode}page`} {...this.props} />;
	}
}
