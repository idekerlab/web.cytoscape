import React, {Component} from 'react'

import SourceSelector from '../SourceSelector'

import style from './style.css'


export default class Start extends Component {

  render() {

    return (
      <div>
        <div className={style.top}>
          <SourceSelector
            networkActions={this.props.networkActions}
            datasourceActions={this.props.datasourceActions}
            vsActions={this.props.vsActions}
          />
        </div>
      </div>
    )
  }
}
