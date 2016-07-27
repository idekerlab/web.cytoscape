import React, {Component} from 'react'
import style from './style.css'
import classnames from 'classnames'


import FloatingActionButton from 'material-ui/FloatingActionButton'
import FitContent from 'material-ui/svg-icons/maps/zoom-out-map'
import ZoomIn from 'material-ui/svg-icons/action/zoom-in'
import ZoomOut from 'material-ui/svg-icons/action/zoom-out'

export default class Commands extends Component {

  handleZoomIn = event => {
    console.log("zoom in---------------------")
    this.props.commandActions.setCommand('zoomIn')
    // console.log(event)
    // console.log(value)
    // console.log(this.refs)
    // const node = this.refs
    // const networkUrl = node.input.value.trim()
    // console.log(networkUrl)
    // this.props.networkSourceActions.setCurrentNetwork(networkUrl)
    // browserHistory.push('/network')
  }

  handleZoomOut = event => {
    console.log("zoom out---------------------")
    this.props.commandActions.setCommand('zoomOut')
    // console.log(event)
    // console.log(value)
    // console.log(this.refs)
    // const node = this.refs
    // const networkUrl = node.input.value.trim()
    // console.log(networkUrl)
    // this.props.networkSourceActions.setCurrentNetwork(networkUrl)
    // browserHistory.push('/network')
  }

  handleFit = event => {
    console.log("Fit Button pressed---------------------")
    // console.log(event)
    // console.log(value)
    // console.log(this.refs)
    // const node = this.refs
    // const networkUrl = node.input.value.trim()
    // console.log(networkUrl)
    this.props.commandActions.setCommand('fit')
    // browserHistory.push('/network')
  }

  render() {

    return (
      <div className={classnames(style.bar, style.grid)}>
        <FloatingActionButton
          className={style.command}
          onTouchTap={this.handleZoomIn}
        >
          <ZoomIn />
        </FloatingActionButton>
        <FloatingActionButton
          className={style.command}
          onTouchTap={this.handleZoomOut}
        >
          <ZoomOut />
        </FloatingActionButton>
        <FloatingActionButton
          className={style.command}
          onTouchTap={this.handleFit}
        >
          <FitContent />
        </FloatingActionButton>
      </div>
    )
  }
}

