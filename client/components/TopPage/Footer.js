import React, {Component} from 'react'
import style from './style.css'


export default class Footer extends Component {

  render() {
    return (
      <footer className={style.topFooter}>
        <a href='http://www.cytoscape.org/' target='_blank'>
          &copy; 2016 The Cytoscape Consortium
        </a>
      </footer>
    )
  }
}


