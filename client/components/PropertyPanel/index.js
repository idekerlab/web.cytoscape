import React, {Component} from 'react'

import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';



export default class PropertyPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    const details = nextProps.events
    let data = details.get('selected')
    if (data !== null) {
      this.setState({
        open: true
      })
    } else {
      this.setState({
        open: false
      })
    }
  }


  render() {

    let data = this.props.events.get('selected')
    let name = 'N/A'
    let keys = []

    if (data !== null) {
      name = data.name
      keys = Object.keys(data)
    }

    return (
      <Drawer
        width={250}
        openSecondary={true}
        open={this.state.open}>
        <Toolbar>
          <ToolbarTitle text="Properties"/>
        </Toolbar>
        <List>
          {
            keys.map(keyVal => {
              return <ListItem
                secondaryText={keyVal}
                primaryText={data[keyVal]}
              />
            })
          }
        </List>
      </Drawer >
    )
  }
}