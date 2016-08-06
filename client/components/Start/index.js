import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui/svg-icons/action/home'
import HelpIcon from 'material-ui/svg-icons/action/help-outline'
import {teal500} from 'material-ui/styles/colors'
import SourceSelector from '../SourceSelector'
import style from './style.css'


export default class Start extends Component {

  handleHome = event => {
    console.log('back!')
    browserHistory.push('/')
  }

  handleHelp = event => {
    console.log('help!')
    browserHistory.push('/')
  }

  render() {
    return (
      <div>
        <AppBar
          title={'Select Data Source'}
          titleStyle={{fontWeight: 400}}
          style={{boxShadow: 'none', backgroundColor: teal500}}
          iconElementLeft={
            <IconButton onTouchTap={this.handleHome}>
              <HomeIcon />
            </IconButton>
          }
          iconElementRight={
            <IconButton
              onTouchTap={this.handleHelp}
            >
              <HelpIcon />
            </IconButton>
          }
        />
        <div className={style.container}>
          <div className={style.centered}>
            <SourceSelector {...this.props}
            />
          </div>
        </div>
      </div>
    )
  }
}
