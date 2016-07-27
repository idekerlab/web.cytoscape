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

  createUrl = networkId => {
    const fullUrl = window.location.href
    const base = fullUrl.split('/networks')[0]
    return base + '/?url=' + networkId
  }


  render() {

    console.log('************dialog')

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.onTouchTap}
      />,
      <FlatButton
        icon={<ShareIcon />}
        label="Close"
        primary={true}
        onTouchTap={this.props.onTouchTap}
      />
    ];

    const url = this.createUrl(this.props.networkId)

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
            ref='urlText'
            className={style.url}
            fullWidth={true}
            floatingLabelFixed={true}
            floatingLabelStyle={{color: 'orange'}}
            floatingLabelText="Copy this url to share:"
            id="text-field-default"
            defaultValue={url}
          />

        </div>

      </Dialog>
    );
  }
}
