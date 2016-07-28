import React, {Component} from 'react'

import MainMenu from '../MainMenu'
import ShareDialog from '../ShareDialog'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import ShareIcon from 'material-ui/svg-icons/social/share';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import Drawer from 'material-ui/Drawer'

const dStyle = {
  padding: 10,
}


export default class ClosableAppBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      shareDialogOpen: false
    }
  }

  openMenu = () => this.setState({open: !this.state.open});

  createNameFromUrl = url => {
    const parts = url.split('/')
    return (parts[parts.length - 1]).split('?')[0]
  }

  handleShareDialogOpen = () => {
    this.setState({shareDialogOpen: !this.state.shareDialogOpen})
    console.log('Dialog state: ' + this.state.shareDialogOpen)
  }


  render() {
    const {uiState, uiStateActions, networks, networkId,} = this.props

    if (!uiState.get('showAppBar')) {
      return (
        <div>
          <IconButton
            style={{zIndex: 800}}
            iconStyle={{zIndex: 900, color: '#777777'}}
            onTouchTap={this.openMenu}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
            style={dStyle}
            width={400}
          >
            <MainMenu
              networks={networks}
              networkId={networkId}
              uiState={uiState}
              uiStateActions={uiStateActions}
            />
          </Drawer>
        </div>
      )
    }

    return (
      <div>
        <AppBar
          title={this.createNameFromUrl(networkId)}
          onLeftIconButtonTouchTap={this.openMenu}
          iconElementRight={
            <IconButton
              onTouchTap={this.handleShareDialogOpen}
            >
              <ShareIcon />
            </IconButton>
          }
        >
        </AppBar>

        <ShareDialog
          networkId={networkId}
          onTouchTap={this.handleShareDialogOpen}
          open={this.state.shareDialogOpen}
        />

        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          style={dStyle}
          width={400}
        >
          <MainMenu
            networks={networks}
            networkId={networkId}
            uiState={uiState}
            uiStateActions={uiStateActions}
          />
        </Drawer>
      </div>
    )
  }
}
