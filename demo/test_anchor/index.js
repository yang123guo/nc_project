import React, { Component } from 'react';
import { createPage } from '../../src';
import './index.less'
import { afterEvent, buttonClick } from './events';
import NCTabs from '../../src/base/nc_Tabs_test'
import NCAffix from '../../src/base/nc_Affix';
import { Element as ScrollElement, Link as ScrollLink } from 'react-scroll';
const NCTabPane = NCTabs.NCTabPane;

class TestAnchor1 extends Component {
	// react：构造函数
	constructor(props) {
		super(props);
    }

    getTabConf =()=>{
        let { createForm } = this.props.form;
        const tabsConf = {
            //activeTab:"3", 
            items:[
                {title:"页签一",content:createForm('form1')},
                {title:"页签二",content:createForm('form2')},
                {title:"页签三",content:createForm('form2')}
            ]
        };
        return  tabsConf;
    } 

	// react：界面渲染函数
	render() {
        let { form, button ,tabs,anchorNav} = this.props;
		let { createForm } = form;
        let { createButton } = button;
        let { createTabs } = tabs;
        let {createAnchorNav} = anchorNav;

		return (
			<div className="test-wrapper">

                <NCAffix>
                    <div className = "test-nav">
                        <div className="left">单据1</div>
                        <div className="right"></div>

                        <div className="middle">
                            <ul>
                                <ScrollLink
                                    to='forminfo'
                                    spy={true}
                                    smooth={true}
                                    duration={300}
                                    offset={-50}
                                >
                                    <li>表单信息</li>
                                </ScrollLink>
                                <ScrollLink
                                    to='businfo'
                                    spy={true}
                                    smooth={true}
                                    duration={300}
                                    offset={-50}
                                >
                                    <li>业务信息</li>
                                </ScrollLink>
                                <ScrollLink
                                    to='otherinfo'
                                    spy={true}
                                    smooth={true}
                                    duration={300}
                                    offset={-50}
                                >
                                    <li>其他信息</li>
                                </ScrollLink>
                            </ul>
                        </div>
                        
                    </div>
                </NCAffix>

                <ScrollElement name='forminfo'>
                    <section style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
                        <div>表单信息</div>

                        {/* 创建表单 */}
                        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
                            {createForm('form1')}
                        </div>
                        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
                            {createForm('form2')}
                        </div>
                        {/* 创建按钮 */}
                        {createButton('setValueButton', { name: '设值' })}
                        {createButton('getValueButton', { name: '取值' })}
                        {createButton('getDisabledTrue', { name: 'input禁用', disabled: true })}
                        {createButton('getDisabledFalse', { name: 'input可用' })}
                    </section>
                </ScrollElement>    
                
                <ScrollElement name='businfo'>
                    <section style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
                        <div>业务信息</div>

                        {/* 使用示例1 */}
                        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', marginTop: '20px' }}> 
                            <NCTabs>
                                <NCTabPane tab='页签1' key="1">{createButton('setValueButton', { name: '设值' })}</NCTabPane>
                                <NCTabPane tab='页签2' key="2">{createButton('setValueButton', { name: '设值' })}</NCTabPane>
                            </NCTabs>
                        </div>
                    </section>       
                </ScrollElement>    

                <ScrollElement name='otherinfo'>
                    <section style={{ height:700,border: '1px solid #ccc', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
                        <div>其他信息</div>

                        <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', marginTop: '20px' }}> 
                            {/* 使用示例2 */}
                            {createButton('setTab', { name: '显示页签三' })}
                            {createTabs('tabs1',this.getTabConf())}
                        </div> 
                    </section>    
                </ScrollElement>   

			</div>
		);
	}
}

export default createPage({
    //模板id
	moduleId: '100', //或者 [ '001', '002', '003' ]
	// 编辑后事件
	onAfterEvent: afterEvent,
	// 按钮点击事件
	onButtonClick: buttonClick
})(TestAnchor1);