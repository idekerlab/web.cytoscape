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
      events, eventActions, networkId, uiState, uiStateActions,
      styles, currentVs, currentVsActions, backgroundColorActions,
      backgroundColor, vsActions
    } = this.props

    return (

      <div>
        <ClosableAppBar
          networkId={networkId}
          networks={networks}
          uiState={uiState}
          uiStateActions={uiStateActions}
          styles={styles}
          currentVsActions={currentVsActions}
          currentVs={currentVs}
          backgroundColorActions={backgroundColorActions}
          backgroundColor={backgroundColor}
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
          styles={styles}
          currentVs={currentVs}
          currentVsActions={currentVsActions}
          backgroundColor={backgroundColor}
          vsActions={vsActions}
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
