/**
 * Created by wangshhj on 2018/1/10.
 */
import React, { Component } from 'react';
import {Modal} from 'tinper-bee';

export class NCModal extends Component {
    constructor (props) {
        super (props)
    }
    render () {
        return <Modal {...this.props}>{this.props.children}</Modal>
    }
}
NCModal.Header = Modal.Header;
NCModal.Title = Modal.Title;
NCModal.Body = Modal.Body;
NCModal.Footer = Modal.Footer;

