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


export default class NetworkViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      shareDialogOpen: false
    }
  }

  openMenu = () => this.setState({open: !this.state.open});


  handleShareDialogOpen = () => {
    this.setState({shareDialogOpen: !this.state.shareDialogOpen})
    console.log('Dialog state: ' + this.state.shareDialogOpen)
  };

  handleClose = () => this.setState({open: false})

  createNameFromUrl = url => {
    const parts = url.split('/')
    console.log(parts)
    return (parts[parts.length-1]).split('?')[0]
  }

  render() {

    const {
      networks, networkDownload,
      downloadActions, networkActions,
      currentNetwork, commands, commandActions,
      events, eventActions, networkId
    } = this.props
    console.log('-----------****************** Parent viewer')
    console.log(this.props)

    return (

      <div>
        <AppBar
          title={'Network: ' + this.createNameFromUrl(networkId)}
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
          commands={commands}
          commandActions={commandActions}
          events={events}
          eventActions={eventActions}
          networkId={networkId}
        />

        <Commands
          commandActions={commandActions}
        />


        <ShareDialog
          networkId={networkId}
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
            networkId={networkId}
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
