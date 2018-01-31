import React, { Component } from 'react';
import { createPage } from '../../src';
import './index.less'
import { afterEvent, buttonClick } from './events';
import NCTabs from '../../src/base/nc_Tabs'
import NCAffix from '../../src/base/nc_Affix';
const NCTabPane = NCTabs.NCTabPane;

class TestTabs extends Component {
	// react：构造函数
	constructor(props) {
		super(props);

        this.anchorConfig = {
            // 锚节点
            ANCHOR : {
                values: ['表单信息', '业务信息','其他信息'], // 锚节点的引导文字
                width: 103 // 锚节点tab的宽度
            },
            // 滚动条滚动设置
            JUMP_CONFIG : {
                offset: 50, // 50为悬浮高度
                duration: 300 // 滚动duration配置
            }
        }
        
    }

    componentDidMount () {
        this.props.anchorNav.addListenerScroll('nav1',this.anchorConfig,this.refs)		
    }

    componentWillUnmount () {
        this.props.anchorNav.removeListenerScroll('nav1',this.anchorConfig,this.refs);
    }
    

    getTabConf =()=>{
        let { createForm } = this.props.form;
        const tabsConf = {
            //activeTab:"3",
            items:[
                {title:"页签一",content:createForm('form5')},
                {title:"页签二",content:createForm('form5')},
                {title:"页签三",content:createForm('invest')}
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
                            {createAnchorNav('nav1',this.anchorConfig)}
                        </div>
                    </div>
                </NCAffix>

                <section  ref="anchor1"  style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
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

                <section  ref="anchor2"  style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
                    <div>业务信息</div>

                    {/* 使用示例1 */}
                    <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', marginTop: '20px' }}> 
                        <NCTabs>
                            <NCTabPane tab='页签1' key="1">{createForm('invest')}</NCTabPane>
                            <NCTabPane tab='页签2' key="2">{createButton('setValueButton', { name: '设值' })}</NCTabPane>
                        </NCTabs>
                    </div>
                </section>       

                <section ref="anchor3"  style={{ height:500,border: '1px solid #ccc', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
                    <div>其他信息</div>

                    <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', marginTop: '20px' }}> 
                        {/* 使用示例2 */}
                        {createButton('setTab', { name: '显示页签三' })}
                        {createTabs('tabs1',this.getTabConf())}
                    </div> 
                </section>    

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
})(TestTabs);