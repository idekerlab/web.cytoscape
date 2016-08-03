import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import * as networkSourceActions from '../../reducers/currentnetwork'
import * as currentVsActions from '../../reducers/currentvs'
import * as backgroundColorActions from '../../actions/background-color'
import * as vsActions from '../../reducers/visualstyles'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TopPage from '../../components/TopPage'

import style from './style.css'
import * as Colors from 'material-ui/styles/colors'

const PRESET_STYLES_LOCATION = '../../assets/preset-styles.json'

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


  prepareParams = () => {

  }


  componentWillMount() {
    const queryParams = this.props.location.query
    const networkId = queryParams.url
    const styleName = queryParams.style
    const backgroundColor = queryParams.bgcolor

    if (networkId !== undefined) {
      // Prepare params
      if(styleName !== undefined) {
        console.log('setting STYLE2')
        console.log(styleName)
        this.props.currentVsActions.setCurrentVs(styleName)
      }

      if(backgroundColor !== undefined) {
        console.log('setting BG2')
        console.log(backgroundColor)
        this.props.backgroundColorActions.setBackgroundColor(backgroundColor)
      }

      // First, load style
      this.props.vsActions.fetchVisualStyles(PRESET_STYLES_LOCATION)

      // Redirect to network page
      const encodedId = encodeURIComponent(networkId)
      browserHistory.push('/networks/' + encodedId)
    } else {
      // Load preset styles
      this.props.vsActions.fetchVisualStyles(PRESET_STYLES_LOCATION)
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
    currentVsActions: bindActionCreators(currentVsActions, dispatch),
    backgroundColorActions: bindActionCreators(backgroundColorActions, dispatch),
    vsActions: bindActionCreators(vsActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entrance)