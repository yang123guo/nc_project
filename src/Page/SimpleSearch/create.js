import React, { Component } from 'react';
import NCFormControl  from '../../base/nc_FormControl';
import NCIcon from '../../base/nc_Icon'
import {setSimpleSearchValue} from './methods'
import './index.less'
// import createButton from '../Button';
export function createSimpleSearch(searchModelValue) {
    let { createButton } = this.button;
    var meta = searchModelValue;
    if(!meta) return;
    let {
        id,
        title,
        buttons=[{id:"addButton",name:"新增"}],
        placeholder="查询条件",
    } = meta|| {};
    
    if (!this.state.simpleSearch.hasOwnProperty(id)) {
		//初始化
		this.state.simpleSearch[id]={"inputValue":""};
    }
    return (
        <div className="bd-header">
        {meta&&<div>
            <div className="bd-header-title">{title}</div>
            {buttons.map((item,key)=>{
                return createButton(item.id, { name: item.name})
            })}
            <span className="bd-header-search">
                <NCFormControl type="search"
                onSearch={this.searchButtonClick.bind(this,{ ...this.props,table: this.table},this.state.simpleSearch[id].inputValue)}
                placeholder={placeholder} 
                value={this.state.simpleSearch[id].inputValue}
                onChange={(value)=>{setSimpleSearchValue.call(this,id,value)}}
                />
                <span className="uf uf-search searchbutton" onClick={this.searchButtonClick.bind(this,{ ...this.props,table: this.table},this.state.simpleSearch[id].inputValue)}></span>
                {/* <NCIcon type="uf-search" className="searchbutton" onClick={this.searchButtonClick.bind(this,{ ...this.props,table: this.table},this.state.simpleSearch[id].inputValue)}/> */}
            </span>
            </div>
        }
        </div>
    )
}