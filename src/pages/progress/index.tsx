import React, { useState } from 'react'
import './index.less'

const progress = () => {
    const [isPlay, setIsPlay] = useState(false) // 是否播放
    let [precent, setPrececent] = useState(0) // 进度
    let timer: any = null

    const handlePlay = () => {
        timer = setInterval(() => {
            if (precent === 100) {
                clearInterval(timer)
            } else {
                setPrececent((precent += 1))
            }
        }, 100)
    }

    const replay = () => {}

    return (
        <div>
            <button onClick={handlePlay}>{isPlay ? '暂停' : '播放'}</button>
            <button onClick={replay}>重播</button>
            <progress value={precent} max="100" />
        </div>
    )
}

export default progress
