/**
 * Created by wangshhj on 2018/1/10.
 */
import React, {Component} from 'react'
import {Row, Col ,Switch} from 'tinper-bee'

// export class NCRow extends Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         return <Row {...this.props}>{this.props.children}</Row>
//     }
// }
// export class NCCol extends Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         return <Col {...this.props}>{this.props.children}</Col>
//     }
// }
export class NCSwitch extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Switch {...this.props}/>
    }
}

