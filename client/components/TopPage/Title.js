import React, {Component} from 'react'

import {browserHistory} from 'react-router'
import FlatButton from 'material-ui/FlatButton';

import * as Colors from 'material-ui/styles/colors'

import logo from '../../assets/images/cytoscape-logo-white.svg'
import style from './style.css'


export default class Title extends Component {

  handleStart = () => {
    browserHistory.push('/start')
  }

  render() {
    const {currentNetwork, networkSourceActions} = this.props

    return (
      <div className={style.title}>

        <div className={style.row1}>
          <div className={style.logoCol}>
            <img
              className={style.logoIcon}
              src={logo}
              alt="Cytoscape Logo"
            />
          </div>
          i

          <div className={style.col2}>
            <div className={style.titleText}>
              cy.next &beta;
            </div>
            <div className={style.description}>
              Next generation platform for network authoring, analysis,
              visualization, and sharing
            </div>

            <div className={style.buttonLocation}>
              <FlatButton
                className={style.start}
                backgroundColor={Colors.teal500}
                hoverColor={Colors.teal200}
                label="Start"
                onClick={this.handleStart}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

