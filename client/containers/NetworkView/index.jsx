import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as networkSourceActions from '../../reducers/currentnetwork'
// import * as commandActions from '../../reducers/commands'
import * as commandActions from '../../actions/commands'
import * as eventActions from '../../actions/cyjs'
import * as uiStateActions from '../../actions/ui-state'
import * as vsActions from '../../reducers/visualstyles'
import * as currentVsActions from '../../reducers/currentvs'
import * as backgroundColorActions from '../../actions/background-color'

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
    const networkId = this.props.params.uri

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <NetworkViewer
          {...this.props}
          networkId={networkId}
          className={style.main}
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
    styles: state.visual_styles,
    currentVs: state.app_manager.current_vs,
    backgroundColor: state.app_manager.background_color,
    datasource: state.app_manager.datasource,
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
    vsActions: bindActionCreators(vsActions, dispatch),
    currentVsActions: bindActionCreators(currentVsActions, dispatch),
    backgroundColorActions: bindActionCreators(backgroundColorActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkView)