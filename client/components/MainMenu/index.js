import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import classnames from 'classnames'

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Settings from 'material-ui/svg-icons/action/settings'
import HomeIcon from 'material-ui/svg-icons/action/home'
import StyleIcon from 'material-ui/svg-icons/image/color-lens'
import SummaryIcon from 'material-ui/svg-icons/action/info-outline'
import Avatar from 'material-ui/Avatar'
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import Toggle from 'material-ui/Toggle';

import StyleSelector from '../StyleSelector'

import style from './style.css'
import logo from '../../assets/images/cytoscape-logo-orange.svg'


// TODO: Split into smaller sub-menus
export default class MainMenu extends Component {

  handleHome = event => {
    browserHistory.push('/')
  }

  render() {
    let url = this.props.networkId
    let network = undefined

    if(url === undefined || url === null || url === '') {
      // URL is not available
      url = ''
    } else {
      network = this.props.networks.get(url)
    }

    let name = 'N/A'
    if (network !== undefined) {
      const data = network.get('data')
      if (data !== undefined) {
        if (data.name !== undefined) {
          name = data.name
        }
      }
    }

    return (
      <div>
        <div className={classnames(style.grid, style.top)}>
          <img
            className={style.icon}
            src={logo}
          />
          <h1 className={style.title}>
            cy.next <i>&beta;</i>
          </h1>
        </div>

        <Divider />

        <List>
          <ListItem
            key={1}
            primaryText="Summary"
            leftIcon={<SummaryIcon />}
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                key={1}
                primaryText="Network Name:"
                secondaryText={name}
              />,
              <ListItem
                key={2}
                primaryText="Description:"
                secondaryText="N/A"
              />,
              <ListItem
                key={3}
                primaryText="Data Source:"
                secondaryText={url}
              />
            ]}
          />
        </List>

        <Divider />

        <List>
          <ListItem
            key={1}
            primaryText="Style"
            leftIcon={<StyleIcon />}
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={[

              <ListItem
                key={1}
                leftAvatar={
                  <Avatar
                    backgroundColor={'#EEEEEE'}
                  />
                }
                primaryText="Background Color"
              >
              </ListItem>,

              <ListItem key={2}>
                <StyleSelector className={style.subtitle}/>
              </ListItem>
            ]}
          />
        </List>

        <Divider />

        <List>
          <ListItem
            key={1}
            primaryText="Settings"
            leftIcon={<Settings />}
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                key={1}
                primaryText="Navigation buttons"
                rightToggle={<Toggle defaultToggled={true}/>}
              />,
              <ListItem
                key={2}
                primaryText="Toolbar"
                rightToggle={<Toggle defaultToggled={true}/>}
              />
            ]}
          />
        </List>

        <Divider />

        <List>
          <ListItem
            primaryText="Help"
            leftIcon={<HelpIcon />}
          />
          <ListItem
            primaryText="Back to home"
            leftIcon={<HomeIcon />}
            onTouchTap={this.handleHome}
          />
        </List>
      </div>

    )
  }
}
