import React, {Component} from 'react'
import classnames from 'classnames'

import style from './style.css'
import SourceSelector from '../SourceSelector'

import logo from '../../assets/images/cytoscape-logo-white.svg'

export default class Title extends Component {

  render() {
    const {currentNetwork, networkSourceActions} = this.props

    return (
      <div className={classnames(style.title, style.grid)}>
        <div className={classnames(style.box1, style.grid, style.boxGrid)}>
          <div>
            <img
              className={classnames(style.logo)}
              src={logo}
              alt="Cytoscape Logo"
            />
          </div>

          <div className={style.gridCell}>
            <h1>
              cy.next &beta;
            </h1>
            <p className={classnames(style.description)}>
              Next generation platform for network authoring, analysis,
              visualization, and sharing
            </p>
          </div>

          <div className={style.gridCell2}>
            <SourceSelector
              currentNetwork={currentNetwork}
              networkSourceActions={networkSourceActions}
            />
          </div>
        </div>
      </div>
    )
  }
}

