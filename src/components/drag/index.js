class mouesEvent {
    constructor() {
        this._self = null

        this.operateDiv = null
        this.operateDom = null

        // 鼠标当前选中的 dom 节点
        this.selectWin = null
        // 是否允许异动
        this.allowMove = false

        // 鼠标按下时的 x 坐标
        this.dragClientX = 0
        // 鼠标按下时的 Y 坐标
        this.dragClientY = 0

        // 选中窗口 x 轴最大偏移距离
        this.maxOffsetX = 0
        // 选中窗口 y 轴最大偏移距离
        this.maxOffsetY = 0

        // 父窗口 x 坐标
        this.fatherX = 0
        // 父窗口 Y 坐标
        this.fatherY = 0

        this.fatherClientWidth = 0
        this.fatherClientHeight = 0

        // 当前点击位置 距离 选中 窗口 左边界的距离
        this.toBorderX = 0
        // 当前点击位置 距离 选中 窗口 上边界的距离
        this.toBorderY = 0
    }

    // 初始化方法
    mouesInit(self, wrapperElementId, dragElementId) {
        this._self = self

        this.operateDiv = dragElementId
        this.operateDom = wrapperElementId

        this.mouseLisEvent()
    }

    // 判断原生是否是指定元素的或者指定元素的子集
    closest(el, selector) {
        let matchesSelector = el.matches // || el.webkit
        while (el) {
            if (matchesSelector.call(el, `#${selector}`)) {
                break
            }
            el = el.parentElement
        }

        return el
    }

    selectWindows = (e) => {
        let winDom = false

        if (this.closest(e.target, this.operateDiv)) {
            this.selectWin = document.getElementById(this.operateDom)
            winDom = true
        }

        return winDom
    }

    // 绑定鼠标事件
    mouseLisEvent() {
        document.addEventListener('mousedown', (e) => {
            if (!this.selectWindows(e)) {
                return
            }
            this.dragMouseDown(e)
        })

        document.addEventListener('mousemove', (e) => {
            this.dragMouseMove(e)
        })

        document.addEventListener('mouseup', (e) => {
            this.dragMouseUp(e)
        })
    }

    dragMouseDown = (e) => {
        e.preventDefault()

        this.dragClientX = e.clientX // father.clientX
        this.dragClientY = e.clientY // father.clientY

        const father = document.getElementById('box-content')

        this.fatherClientWidth = father.clientWidth
        this.fatherClientHeight = father.clientHeight

        this.fatherX = father.offsetLeft
        this.fatherY = father.offsetTop

        // 上下左右最大移动距离
        this.maxOffsetX = this.fatherClientWidth - this.selectWin.clientWidth
        this.maxOffsetY = this.fatherClientHeight - this.selectWin.clientHeight

        let divLeft = this.selectWin.getBoundingClientRect().x // window.getComputedStyle(this.selectWin, null).getPropertyValue('left')
        let divBottom = this.selectWin.getBoundingClientRect().y // window.getComputedStyle(this.selectWin, null).getPropertyValue('bottom')

        this.toBorderX = e.clientX - divLeft
        this.toBorderY = e.clientY - divBottom

        this.allowMove = true
    }

    dragMouseMove = (e) => {
        let offsetX = 0
        let offsetY = 0
        let curLeft = 0
        let curTop = 0

        if (!this.allowMove) {
            return
        }

        // 当前选中窗口 相对 父窗口移动的x，y距离
        offsetX = e.clientX - this.fatherX
        offsetY = e.clientY - this.fatherY

        // 向右移动超过了最大移动距离
        if (offsetX >= this.maxOffsetX) {
            curLeft = this.fatherX + this.maxOffsetX
        }
        // 向左移动超过了左边界
        else if (offsetX <= 0) {
            curLeft = this.fatherX
        } else {
            // 要减去 this.toBorderX，比如按选中窗口 X 坐标 会移动到鼠标位置
            curLeft = this.fatherX + offsetX - this.toBorderX
        }

        // 向上超过了最大距离
        if (offsetY >= this.maxOffsetY) {
            curTop = this.fatherY + this.maxOffsetY
        }
        // 向下超过了下边界
        else if (offsetY <= 0) {
            curTop = this.fatherY
        } else {
            // 要减去 this.toBorderX，比如按选中窗口 Y 坐标 会移动到鼠标位置
            curTop = this.fatherY + offsetY - this.toBorderY
        }

        // 设置选中窗口位置
        this.selectWin.style.cssText = `left:${curLeft}px; top: ${curTop}px;`
    }

    dragMouseUp = (e) => {
        this.selectWin = null
        this.allowMove = false

        this.dragClientX = 0
        this.dragClientY = 0

        this.maxOffsetX = 0
        this.maxOffsetY = 0

        this.fatherX = 0
        this.fatherY = 0

        this.toBorderX = 0
        this.toBorderY = 0
    }
}

export default mouesEvent
