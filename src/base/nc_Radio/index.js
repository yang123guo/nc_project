/**
 * Created by wangshhj on 2018/1/10.
 */
import React, {Component} from 'react'
import {Radio} from 'tinper-bee'
const {RadioGroup} = Radio;

class NCRadioGroup extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <RadioGroup {...this.props}>{this.props.children}</RadioGroup>
    }
}

export class NCRadio extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Radio {...this.props}>{this.props.children}</Radio>
    }
}

NCRadio.NCRadioGroup = NCRadioGroup;
