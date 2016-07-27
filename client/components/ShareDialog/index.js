import React, {Component} from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';


import logo from '../../assets/images/cytoscape-logo-orange.svg'
import style from './style.css'

import ShareIcon from 'material-ui/svg-icons/social/share';


const contentStyle = {
  width: '400px',
};



export default class ShareDialog extends Component {
  constructor(props) {
    super(props);
    console.log('-----------CONST######==========')
    console.log(props)

  }

  componentWillUpdate(nextProps, nextState) {
    console.log('-----------Froparent==========')
    console.log(this.props)
    console.log(nextProps)
    console.log(nextState)

  }

  handleClose = () => {
  }

  render() {

    console.log('************dialog')
    console.log(this.props)

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.onTouchTap}
      />,
      <FlatButton
        icon={<ShareIcon />}
        label="Share"
        primary={true}
        onTouchTap={this.props.onTouchTap}
      />
    ];

    return (
      <Dialog
        contentStyle={contentStyle}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleClose}>

        <div className={style.grid}>

          <img className={style.logo} src={logo}/>
          <h2 className={style.title}>
            Share Visualization
          </h2>
          <TextField
            className={style.url}
            id="text-field-default"
            defaultValue="Encoded URL will be displayed here..."
          />

        </div>

      </Dialog>
    );
  }
}
