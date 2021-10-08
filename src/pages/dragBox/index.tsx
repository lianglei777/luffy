import React from 'react'
import Drag from '../../components/drag/drag'
import './index.less'

export default class DragPage extends React.Component {
    componentDidMount() {
        // 默认悬浮框居中
        const father = document.getElementById('box-content')
        let clientWidth = father?.clientWidth
        let clientHeight = father?.clientHeight
        let selectWin = document.getElementById('boxDlg')
        let curLeft = (clientWidth - selectWin.clientWidth) * 0.5 + father?.offsetLeft
        let curBottom = (clientHeight - selectWin.clientHeight) * 0.5 + father?.offsetTop
        selectWin.style.cssText = `left:${curLeft}px; top: ${curBottom}px;`
    }

    render() {
        return (
            <div className="page-wrapper">
                <div id="box-content" className="box-content">
                    <Drag childElementId={'boxDlg'} dragElementId={'dragDom'}>
                        <div id="boxDlg" className="box-wrapper">
                            <div id="dragDom" className="drag-palce">
                                鼠标点我就可以拖动
                            </div>
                        </div>
                    </Drag>
                </div>
            </div>
        )
    }
}
