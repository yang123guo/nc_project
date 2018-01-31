import React, { Component } from 'react';
import Checkbox from 'bee-checkbox';
import { Radio } from 'tinper-bee';
import PropTypes from 'prop-types';



export default class CheckboxItem  extends Component {


	handleChange = (value, index) => {
		
		// this.state.boxs[index]['checked'] = value;
		// this.setState();
		let { onChange } = this.props;

		if (onChange) {
			onChange(value);
		}
		// this.props.onChange(this.state.boxs[0].value);
	}

	render() {
		// let { boxs, keyName }  = this.state;
		let { options, items, id, value, pagestatus } = this.props;
		// console.log('value, defaultValue', value, defaultValue);

		if (pagestatus == 'browse') {
			return (<span style={{ lineHeight: 2.1 }}  > { value.value }</span>);
		} else {
			return <div>
				{ items.map((box, i) =>  <Checkbox  colors="info" 
													checked={ box.checked } 
													onChange={ (e) => {this.handleChange(e, i) }} 
													key={i} name={ id } >
											{ box.display }
										</Checkbox>
				) }		
			</div>
			
		}
	}
}

//@TODO 类型校验
CheckboxItem.propTypes = {
  // suffix: PropTypes.string,
  // suffix: PropTypes.any.isRequired,
  verify: PropTypes.any.isRequired

};