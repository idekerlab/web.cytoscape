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
    return (
      <div className={style.title}>

        <div className={style.logoCol}>
          <img
            className={style.logoIcon}
            src={logo}
            alt="Cytoscape Logo"
          />
        </div>

        <div className={style.col2}>
          <section className={style.titleText}>
            cy.next &beta;
          </section>

          <section className={style.description}>
            Next generation platform for network authoring, analysis,
            visualization, and sharing
          </section>

          <section className={style.start}>

            <FlatButton
              className={style.startButton}
              backgroundColor={Colors.teal500}
              hoverColor={Colors.teal300}
              label="Start"
              onClick={this.handleStart}
            />
          </section>
        </div>
      </div>
    )
  }
}

