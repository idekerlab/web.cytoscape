import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import ClosableAppBar from '../ClosableAppBar'
import NetworkPanel from '../NetworkPanel'
import PropertyPanel from '../PropertyPanel'
import Errorbar from 'material-ui/Snackbar';

import Commands from '../Commands'

import style from './style.css'

export default class NetworkViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 1000000,
      open: false,
    };
  }

  handleActionTouchTap = () => {
    this.setState({
      open: false,
    });
    browserHistory.push('/start')
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    const error = nextProps.networkDownload.get('error')
    if(error !== null && error !== undefined) {
      this.state.open = true
    }
  }

  render() {

    const {
      networks, networkDownload,
      downloadActions, networkActions,
      commands, commandActions,
      events, eventActions, networkId, uiState, uiStateActions,
      styles, currentVs, currentVsActions, backgroundColorActions,
      backgroundColor, vsActions, datasource
    } = this.props

    let errorMsg = networkDownload.get('error')
    if(errorMsg === null || errorMsg === undefined) {
      errorMsg = 'N/A'
    } else {
      errorMsg = 'ERROR: ' + errorMsg
    }

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
          datasource={datasource}
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


        <Errorbar
          className={style.errorbar}
          open={this.state.open}
          message={errorMsg}
          action='Back'
          bodyStyle={{
            backgroundColor: 'rgba(0,0,0,0)',
            fontWeight: 700,
          }}
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
        />

      </div>
    )
  }
}
