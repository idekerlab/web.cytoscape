import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as vsActions from '../../reducers/visualstyles'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Start from '../../components/Start'
import * as datasourceActions from '../../actions/datasource'

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

class StartPage extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Start {...this.props} />
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    visualStyles: state.visual_styles,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    vsActions: bindActionCreators(vsActions, dispatch),
    datasourceActions: bindActionCreators(datasourceActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartPage)