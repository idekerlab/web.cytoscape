import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as networkSourceActions from '../../reducers/currentnetwork'
// import * as commandActions from '../../reducers/commands'
import * as commandActions from '../../actions/commands'
import * as eventActions from '../../actions/cyjs'
import * as uiStateActions from '../../actions/ui-state'

import NetworkViewer from '../../components/NetworkViewer'
import {networkDownloadActions, networkActions} from 'cy-network-store'

import style from './style.css'
import {teal700} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// Theme settings
const muiTheme = getMuiTheme({
  appBar: {
    color: teal700,
  }
})

/**
 * Base component for the network viewer page.
 */
class NetworkView extends Component {

  render() {
    console.log("*** Viewer Container ***")
    console.log(this.props)
    const networkId = this.props.params.uri

    const {
      networks, networkDownload,
      downloadActions, networkActions, currentNetwork,
      commands, commandActions, events, eventActions,
      uiState, uiStateActions
    } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <NetworkViewer
          className={style.main}
          networks={networks}
          networkDownload={networkDownload}
          networkActions={networkActions}
          downloadActions={downloadActions}
          currentNetwork={currentNetwork}
          commands={commands}
          commandActions={commandActions}
          events={events}
          eventActions={eventActions}
          uiState={uiState}
          uiStateActions={uiStateActions}
          networkId={networkId}
        />
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    networks: state.cy_network.networks,
    networkDownload: state.cy_network.networkDownload,
    currentNetwork: state.app_manager.current_network,
    commands: state.app_manager.commands,
    events: state.app_manager.cy_events,
    uiState: state.app_manager.ui_state,
  }
}

function mapDispatchToProps(dispatch) {

  return {
    downloadActions: bindActionCreators(networkDownloadActions, dispatch),
    networkActions: bindActionCreators(networkActions, dispatch),
    networkSourceActions: bindActionCreators(networkSourceActions, dispatch),
    commandActions: bindActionCreators(commandActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch),
    uiStateActions: bindActionCreators(uiStateActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkView)