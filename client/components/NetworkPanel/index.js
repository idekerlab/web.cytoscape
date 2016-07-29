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
      eventActions, networkId } = this.props

    const network = this.props.networks.get(networkId)
    if (network !== undefined) {
      return (
        <CytoscapeRenderer
          commands={commands}
          commandActions={commandActions}
          events={events}
          eventActions={eventActions}
          networkData={network}/>
      )
    } else {
      // Display loading animation if data is not available
      return (
        <Loading />
      )
    }
  }
}