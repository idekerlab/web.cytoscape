import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import CytoscapeRenderer from './CytoscapeRenderer'
import Loading from '../Loading'

import ErrorIcon from 'material-ui/svg-icons/alert/error-outline'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import FlatButton from 'material-ui/FlatButton'

import style from './style.css'


export default class NetworkPanel extends Component {

  handleBack = () => {
    browserHistory.push('/start')
  }

  componentWillMount() {
    this.props.downloadActions.downloadBegin()

    const networkLocation = this.props.networkId
    if (networkLocation.endsWith('zip')) {
      // Do nothing.  Network already loaded.
    } else {
      this.props.downloadActions.download(networkLocation)
    }
  }

  render() {
    const {
      commands, commandActions, events, networkDownload,
      eventActions, networkId, styles, currentVs,
      backgroundColor, vsActions, currentVsActions
    } = this.props

    let errorMsg = networkDownload.get('error')

    let failed = false

    if (errorMsg === null || errorMsg === undefined) {
      failed = false
    } else {
      failed = true
    }

    const network = this.props.networks.get(networkId)

    if (failed) {
      return (
        <div className={style.container}>
          <h1>A Problem Occurred While Downloading Data</h1>
          <h2>Possible Causes:</h2>
          <h3>Invalid URL</h3>
          <h3>Invalid NDEx ID</h3>
          <h3>Remote server is down</h3>
          <ErrorIcon
            color={'#ff0033'}
            style={{width: '40%', height: '40%'}}
          />

          <FlatButton
            label="Back to Data Source Selector"
            labelPosition='after'
            labelStyle={{fontWeight: 700}}
            icon={<BackIcon/>}
            onClick={this.handleBack}
          />
        </div>
      )
    } else if (network !== undefined) {
      return (
        <CytoscapeRenderer
          rendId="mainView"
          commands={commands}
          commandActions={commandActions}
          events={events}
          eventActions={eventActions}
          networkData={network}
          styles={styles}
          currentVs={currentVs}
          currentVsActions={currentVsActions}
          backgroundColor={backgroundColor}
          vsActions={vsActions}
        />
      )
    } else {
      // Display loading animation if data is not available
      return (
        <Loading />
      )
    }
  }
}