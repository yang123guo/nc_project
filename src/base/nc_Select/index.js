/**
 * Created by wangshhj on 2018/1/10.
 */
import React, { Component } from "react";
import {Select, Option} from "tinper-bee";

class NCSelect extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return <Select {...this.props}>{this.props.children}</Select>
    }
}

class NCOption extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return <NCOption {...this.props}>{this.props.children}</NCOption>
    }
}

NCSelect.NCOption = NCOption

export default NCSelect