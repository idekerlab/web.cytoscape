import React, {Component} from 'react'
import classnames from 'classnames'

import style from './style.css'

import IconButton from 'material-ui/IconButton'

export default class Footer extends Component {

  render() {
    return (
      <footer className={classnames(style.topFooter, style.grid, style.boxGrid)}>
        <a href="">&copy; 2016 The Cytoscape Consortium</a>
        <a href="">
          <img className={style.iconStyle} src='../../assets/images/github.svg'/>
        </a>
      </footer>
    )
  }
}


