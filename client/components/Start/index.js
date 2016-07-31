import React, {Component} from 'react'

import SourceSelector from '../SourceSelector'

import style from './style.css'


export default class Start extends Component {

  render() {

    const {currentNetwork, networkSourceActions} = this.props

    return (
      <div>
        <div className={style.top}>
          <SourceSelector />
        </div>
      </div>
    )
  }
}
