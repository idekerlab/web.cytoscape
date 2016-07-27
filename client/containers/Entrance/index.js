import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as networkSourceActions from '../../reducers/currentnetwork'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TopPage from '../../components/TopPage'

import style from './style.css'
import * as Colors from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.orange800,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.fullWhite,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    pickerHeaderColor: Colors.cyan500,
  },
  appBar: {
    color: 'rgba(0,0,0,0.0)'
  }
});

class Entrance extends Component {

  render() {
    const {currentNetwork, networkSourceActions} = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <TopPage
          className={style.main}
          currentNetwork={currentNetwork}
          networkSourceActions={networkSourceActions}
        />
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentNetwork: state.app_manager.current_network,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    networkSourceActions: bindActionCreators(networkSourceActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entrance)