import React, {Component} from 'react'
import CytoscapeRenderer from './CytoscapeRenderer'
import Loading from '../Loading'


export default class NetworkPanel extends Component {

  componentWillMount() {
    this.props.downloadActions.downloadBegin()
    this.props.downloadActions.download(this.props.networkId)
  }

  render() {
    const {
      commands, commandActions, events,
      eventActions, networkId, styles, currentVs,
      backgroundColor, vsActions, currentVsActions} = this.props

    const network = this.props.networks.get(networkId)
    if (network !== undefined) {
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