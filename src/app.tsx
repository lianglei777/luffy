import React, { useState } from 'react'

import Progress from './components/progress/index'
import DragPage from './pages/dragBox/index'
// import Progress from './pages/progress/index'

import './app.less'

import { Menu } from 'antd'

const { SubMenu } = Menu

interface IProps {
    // name: string
    // age: number
}

const componentsMap: { [key: string]: JSX.Element | string } = {
    'group-one-process': <Progress />,
    'group-one-readFont': 'group-one-readFont',
    'group-one-dragPage': <DragPage />,
}

const menus = [
    {
        group: {
            title: '示例',
            key: 'group-one',
            items: [
                {
                    title: 'Progress动画',
                    key: 'group-one-process',
                },
                {
                    title: '读取字体',
                    key: 'group-one-readFont',
                },
                {
                    title: '拖动浮窗',
                    key: 'group-one-dragPage',
                },
            ],
        },
    },
]

const getGroup = () => {
    const views: JSX.Element[] = []

    menus.forEach((item) => {
        const {
            group: { title, key, items },
        } = item

        const element: JSX.Element[] = []
        items.forEach((el) => {
            const { title, key } = el
            element.push(<Menu.Item key={key}>{title}</Menu.Item>)
        })

        views.push(
            <Menu.ItemGroup key={key} title={title}>
                {element}
            </Menu.ItemGroup>,
        )
    })

    return views
}

const getMenu = () => {
    const [cmpkey, setCmpkey] = useState('group-one-process')

    const handleMenuClick = ({ key }) => {
        console.log('click ', key)

        setCmpkey(key)
    }

    return (
        <div className="menu-wrapper">
            <Menu
                onClick={handleMenuClick}
                style={{ width: 256, height: '100%' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" title="目录">
                    {getGroup()}
                </SubMenu>
            </Menu>

            <div className="menu-page-content">{componentsMap[cmpkey]}</div>
        </div>
    )
}

function App(props: IProps) {
    return <div className="app">{getMenu()}</div>
}

export default App
