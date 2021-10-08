import React from 'react'
import MourseEvent from './index.js'

const mourseEvent = new MourseEvent()
export default class Drag extends React.Component {
    constructor(prop) {
        super(prop)
    }

    componentDidMount() {
        const { childElementId, dragElementId } = this.props
        mourseEvent.mouesInit(this, childElementId, dragElementId)
    }

    render() {
        return <React.Fragment>{this.props.children}</React.Fragment>
    }
}
