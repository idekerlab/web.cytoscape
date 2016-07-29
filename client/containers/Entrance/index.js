import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
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

  componentWillMount() {
    const queryParams = this.props.location.query
    const networkId = queryParams.url
    if (networkId !== undefined) {
      // Redirect to network page
      const encodedId = encodeURIComponent(networkId)
      browserHistory.push('/networks/' + encodedId)
    }
  }

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