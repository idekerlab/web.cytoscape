import React, {Component} from 'react'

import ClosableAppBar from '../ClosableAppBar'
import  {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import NetworkPanel from '../NetworkPanel'

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

    const details = events
    let label = details.get('selected')
    console.log(details.get('selected'))
    if(details === '') {
      label = 'N/A'
    } else {
      label = details.get('selected').name
    }

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

        <Drawer
          width={300}
          openSecondary={true}
          open={true}>
          <Toolbar>
            <ToolbarTitle text="Properties"/>
          </Toolbar>
          <h1>Data</h1>
          <h2>
            {label}
          </h2>
        </Drawer>
      </div>
    )
  }
}
