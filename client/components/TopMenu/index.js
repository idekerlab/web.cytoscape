import React, {Component} from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import * as Colors from 'material-ui/styles/colors'

import DeveloperIcon from 'material-ui/svg-icons/action/build'
import DocIcon from 'material-ui/svg-icons/action/description'
import logo from '../../assets/images/cytoscape-logo-white.svg'
import github from '../../assets/images/github-white.svg'

const menuStyle = {
  backgroundColor: Colors.teal500,
  boxShadow: 'none',
  display: 'inline-block',
  float: 'left',
  fontWeight: 400,
  margin: '16px 32px 16px 0',
}

const itemStyle = {
  color: 'red',
  fontWeight: 400,
}

export default class TopMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const open = this.props.open

    return (
      <Popover
        style={menuStyle}
        open={open}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.props.closeAction}
      >
        <Menu>
          <MenuItem
            primaryText="About this application"
            leftIcon={
              <img src={logo} />
            }
            href="http://www.cytoscape.org/"
          />
          <MenuItem
            primaryText="User Documents"
            leftIcon={<DocIcon color="white" />}
            href="https://github.com/idekerlab/web.cytoscape/wiki"
          />
          <MenuItem
            primaryText="Developer Documents"
            leftIcon={<DeveloperIcon color="white"/>}
            href="https://github.com/idekerlab/web.cytoscape/wiki"
          />
          <MenuItem
            primaryText="Source Code"
            leftIcon={<img src={github} />}
            href="https://github.com/idekerlab/web.cytoscape"
          />
        </Menu>
      </Popover>
    );
  }
}