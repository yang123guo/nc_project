import jump from 'jump.js';


 // 监听滚动
export function addListenerScroll (id,config,refs)  {	
    window.addEventListener('scroll', scrollEventDo.bind(this,id,config,refs) ,false)				
}
// 取消监听滚动
export function removeListenerScroll (id,config,refs) {
    window.removeEventListener('scroll', scrollEventDo.bind(this,id,config,refs), false)
}

// 执行滚动事件
export function scrollEventDo(id,config,refs) {
    //console.log("监听滚动条");

    if(!this.state.anchorNav[id].isClicked) {
        if(Object.keys(refs).length>0){
            let index = getItemIndex.bind(this,config,refs)();
            setScrollBar.bind(this,id,config,index)();	
        }
    }		
}

// scrollBar事件
export function setScrollBar (id,CONFIG,index) {
    let distance = parseInt(index * CONFIG.ANCHOR.width);
    let AnchNav = this.state.anchorNav;
    AnchNav[id].distance = distance;
    AnchNav[id].chooseIndex = index;
    this.setState({
        anchorNav:AnchNav
    })
}


// 获得区域的序号
function getItemIndex(CONFIG,refs){
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop,		
        firstTop = refs.anchor1.offsetTop,
        fixedTop = scrollTop  + CONFIG.JUMP_CONFIG.offset;		
    let [heightPrev, heightNext] = new Array(2).fill(0);
    const LEN = CONFIG.ANCHOR.values.length;

    for(let i = 0; i < LEN; i++) {
        heightPrev = refs[`anchor${(i + 1)}`].offsetTop;				
        heightNext = (i <= LEN - 2) ? refs[`anchor${(i + 2)}`].offsetTop : null;

        if(fixedTop <= firstTop) {
            return 0;
        }
        if(heightPrev <= fixedTop && (heightNext && heightNext > fixedTop)) {
            return i;
        }else if(!heightNext) {
            return (LEN - 1)
        }			
    }		
}


// 点击滚动到位置
export function scrollToDis (e,id,CONFIG) {
    let text = e.target.innerHTML;
    this.state.anchorNav[id].isClicked = true;
    if(!text) {
        return;
    }
    let index = CONFIG.ANCHOR.values.findIndex(value => value == text)
    if(index >= 0){

        setScrollBar.bind(this,id,CONFIG,index)();

        // 滚动条滚到指定区域
        let ele = this.refs.parent.refs[`anchor${index + 1}`]
        let _this = this;
        jump(ele, {
            duration: CONFIG.JUMP_CONFIG.duration,
            offset: - CONFIG.JUMP_CONFIG.offset,
            callback: () => {
                _this.state.anchorNav[id].isClicked = false;
            }
        })
    }		
}


