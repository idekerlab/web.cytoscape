import React, {Component} from 'react'
import { Link } from 'react-router'

import classnames from 'classnames'

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import AppBar from 'material-ui/AppBar'

import Title from './Title'
import Footer from './Footer'

import style from './style.css'

import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';


const menuStyle = {
  backgroundColor: 'rgba(200, 200, 200, 0.9)',
  boxShadow: "none",
  display: 'inline-block',
  float: 'left',
  fontWeight: 400,
  margin: '16px 32px 16px 0',
}

export default class TopPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {

    const { currentNetwork, networkSourceActions } = this.props

    return (
      <div className={style.top}>

        <AppBar
          style={{boxShadow: 'none'}}
          onLeftIconButtonTouchTap={this.handleTouchTap}
        >
        </AppBar>

        <Title
          currentNetwork={currentNetwork}
          networkSourceActions={networkSourceActions}
        />

        <Popover
          style={menuStyle}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
            <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
            <MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
            <Divider />
            <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
            <MenuItem primaryText="Download" leftIcon={<Download />} />
            <Divider />
            <MenuItem primaryText="Remove" leftIcon={<Delete />} />

          </Menu>
        </Popover>

        <Footer/>
      </div>
    )
  }
}
