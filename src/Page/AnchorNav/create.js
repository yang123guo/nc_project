import React, { Component } from 'react';
import './index.less';
import {scrollToDis,setScrollBar} from './methods';

export function createAnchorNav(id,config) {
    if (!this.state.anchorNav.hasOwnProperty(id)) {
        //初始化
		this.state.anchorNav[id] = {
            distance: 0, // tabBar移动距离
            isClicked: false, // tab锚点点击标志位
            chooseIndex: 0, // tab锚点点击序号
        };
    }
    const {distance,chooseIndex} = this.state.anchorNav[id];
    const tranStyle = {
        transform: `translate3d(${distance}px,0,0)`,
        WebkitTransform: `translate3d(${distance}px,0,0)`,
        MozTransform: `translate3d(${distance}px,0,0)`
    };

	return (
		<ul className="anchorTabs cf" onClick={(e)=>{
                scrollToDis.bind(this,e,id,config)();
            }}>
            {
                config.ANCHOR.values.map((item, index) => {
                    return (
                        <li 
                            className={index == chooseIndex? 'active' : 'anchorTabsItem'}
                            key={index}
                            onClick={setScrollBar.bind(this,id,config,index)}
                            >
                            {item}
                        </li>
                    )
                })
            }
            <li className="scrollBar tabs-nav-animated"  style={tranStyle}></li>
        </ul>
	);
}