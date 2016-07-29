import React, {Component} from 'react'

import ClosableAppBar from '../ClosableAppBar'
import NetworkPanel from '../NetworkPanel'
import PropertyPanel from '../PropertyPanel'

import Commands from '../Commands'


export default class NetworkViewer extends Component {

  render() {

    const {
      networks, networkDownload,
      downloadActions, networkActions,
      commands, commandActions,
      events, eventActions, networkId, uiState, uiStateActions
    } = this.props

    console.log('-----------****************** Parent viewer')

    return (

      <div>
        <ClosableAppBar
          networkId={networkId}
          networks={networks}
          uiState={uiState}
          uiStateActions={uiStateActions}
        />

        <NetworkPanel
          networks={networks}
          networkDownload={networkDownload}
          networkActions={networkActions}
          downloadActions={downloadActions}
          commands={commands}
          commandActions={commandActions}
          events={events}
          eventActions={eventActions}
          networkId={networkId}
        />

        <Commands
          commandActions={commandActions}
          uiState={uiState}
        />

        <PropertyPanel
          events={events}
        />

      </div>
    )
  }
}
