import React, {Component} from 'react'
import classnames from 'classnames'

import style from './style.css'
import github from '../../assets/images/github.svg'


export default class Footer extends Component {

  render() {
    return (
      <footer className={classnames(style.topFooter, style.grid, style.boxGrid)}>
        <a href="">&copy; 2016 The Cytoscape Consortium</a>
        <a href='https://github.com/idekerlab/web.cytoscape' target='_blank'>
          <img className={style.iconStyle} src={github} />
        </a>
      </footer>
    )
  }
}


