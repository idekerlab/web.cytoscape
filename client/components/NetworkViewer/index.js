import React, {Component} from 'react'

import AppBar from 'material-ui/AppBar'
import  {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import MainMenu from '../MainMenu'
import IconButton from 'material-ui/IconButton';
import ShareIcon from 'material-ui/svg-icons/social/share';
import NetworkPanel from '../NetworkPanel'
import ShareDialog from '../ShareDialog'

import Commands from '../Commands'


const dStyle = {
  padding: 10,
};


const iconStyle = {
  width: 40,
  height: 40
}


export default class NetworkViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      shareDialogOpen: false
    }
  }

  openMenu = () => this.setState({open: !this.state.open});

  handleHome() {
    console.log("Back to home")
  }

  handleShareDialogOpen = () => {
    this.setState({shareDialogOpen: !this.state.shareDialogOpen})
    console.log('Dialog state: ' + this.state.shareDialogOpen)
  };

  handleClose = () => this.setState({open: false});

  render() {

    const {
      networks, networkDownload,
      downloadActions, networkActions,
      currentNetwork, commands, commandActions
    } = this.props
    console.log('-----------p54')
    console.log(this.props)

    return (

      <div>
        <AppBar
          title={'Data Source: ' + currentNetwork.get('url')}
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


        <NetworkPanel
          networks={networks}
          networkDownload={networkDownload}
          networkActions={networkActions}
          downloadActions={downloadActions}
          currentNetwork={currentNetwork}
          commands={commands}
          commandActions={commandActions}
        />

        <Commands
          commandActions={commandActions}
        />


        <ShareDialog
          onTouchTap={this.handleShareDialogOpen}
          open={this.state.shareDialogOpen}/>

        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          style={dStyle}
          width={400}
        >
          <MainMenu
            networks={networks}
            currentNetwork={currentNetwork}
          />
        </Drawer>

        <Drawer width={300} openSecondary={true} open={false}>
          <Toolbar>
            <ToolbarTitle text="Properties" />
          </Toolbar>
        </Drawer>
      </div>
    )
  }
}
