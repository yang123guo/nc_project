import React , { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import './textarea.less';

export default class TextareaItem extends Component {


	handleChange = (e) => {

	    let value = e.target.value;
	    let verify = true;
	    // let lens = value.toString().length;
	    const {max, count, onChange, isrequired} = this.props;
	    // let maxLen = max || count || 200;
	    // if(maxLen && lens >= maxLen && count >= 0) {	
	    // 	value = value.slice(0, maxLen - 1)
	    // }

	    if (isrequired && value == '') {
	    	verify = false;
	    }

	    // this.state.value = value;
		onChange && onChange({
			value: value,
			verify: verify,
			ischecknow: true
		});
	    // this.setState({
	    //     value,
	    //     cur: lens
	    // });

	}

	render() {
		let {max, pagestatus, count, value, verify = true, ischecknow, isrequired,   ...attrs} = this.props;
		// let {cur} = this.state;	
		let cur = value.value && value.value.toString().length;

		let errorMsg, errorBorder = {};
		//校验信息的控制
		if (!verify) {
			errorMsg　= <span className="input-error-message" >请输入合法的数据！</span>;
			errorBorder = {
				borderColor: 'red',
				color: 'red'
			};
		}

		// max = max ? max : (count || 200);
		max = max || count || 200;
		const countClass = classnames({
	    	'text-count': true,
	    	'isCount': count >= 0 && !!count
	    });	
	    // console.log('this.state', this.state);

	    //页面状态区分
		if ( pagestatus == 'browse') {
			return (<span style={{ lineHeight: 2.1 }}  > { value.value }</span>);
		} else {

			return (
				<div className="textarea-wrap">
					<textarea 
						maxLength={max}
						value={value.value}
						style={ errorBorder }
						{...attrs}					
						onChange={ this.handleChange }
						onBlur={ this.handleChange} >

					{value.value}
					</textarea>
					<div className={countClass}>
						<span>{cur}</span>
						<span>/{max}</span>
					</div>
					{ errorMsg　}
				</div>)
		}

	}

}

//@TODO 类型校验
TextareaItem.propTypes = {
  // suffix: PropTypes.string,
  // suffix: PropTypes.any.isRequired,
  verify: PropTypes.any.isRequired

};