/**
 * Created by kono on 2016/07/25.
 */

import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import StyleSelector from '../StyleSelector'

import Checkbox from 'material-ui/Checkbox';
import Settings from 'material-ui/svg-icons/action/settings'
import HomeIcon from 'material-ui/svg-icons/action/home'
import StyleIcon from 'material-ui/svg-icons/image/color-lens'
import SummaryIcon from 'material-ui/svg-icons/action/info-outline'

import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';


import style from './style.css'
import classnames from 'classnames'
import logo from '../../assets/images/cytoscape-logo-orange.svg'

import Toggle from 'material-ui/Toggle';


export default class Properties extends Component {


  handleHome = event => {
    browserHistory.push('/')
  }

  render() {
    console.log('&&&&&&&&& name START')
    console.log(this.props)

    const url = this.props.currentNetwork.get('url')
    const network = this.props.networks.get(url)
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
          <Subheader>Summary</Subheader>
          <ListItem
            primaryText="Summary"
            leftIcon={<SummaryIcon />}
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                primaryText="Network Name:"
                secondaryText={name}
              />,
              <ListItem
                primaryText="Description:"
                secondaryText="N/A"
              />,
              <ListItem
                primaryText="Data Source:"
                secondaryText={url}
              />
            ]}
          />
        </List>

        <Divider />

        <List>
          <ListItem
            primaryText="Style"
            leftIcon={<StyleIcon />}
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={[

              <ListItem
                leftAvatar={
                  <Avatar
                    backgroundColor={'#EEEEEE'}
                  />
                }
                primaryText="Background Color"
              >

              </ListItem>,

              <ListItem>
                <StyleSelector className={style.subtitle}/>
              </ListItem>
            ]}
          />
        </List>

        <Divider />

        <List>
          <ListItem
            primaryText="Settings"
            leftIcon={<Settings />}
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                primaryText="Navigation buttons"
                rightToggle={<Toggle defaultToggled={true}/>}
              />,
              <ListItem
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
            onTouchTap={this.handleHome}
          />
          <ListItem primaryText="Back to home" leftIcon={<HomeIcon />}/>
        </List>
      </div>

    )
  }
}