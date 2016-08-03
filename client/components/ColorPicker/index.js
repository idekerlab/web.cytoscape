import React, {Component} from 'react'
import Avatar from 'material-ui/Avatar'
import {SketchPicker} from 'react-color'
import Popover from 'material-ui/Popover';
import {ListItem} from 'material-ui/List';

import ColorChooserIcon from 'material-ui/svg-icons/image/colorize'

import style from './style.css'


export default class ColorPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }


  handleTouchTap = (event) => {
    // This prevents ghost click.
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
  }


  handleChange = color => {
    console.log('New Color:**')
    console.log(color)
    // TODO:  is the the best way to encode color?
    const colorStr = 'rgb(' + color.rgb.r + ',' + color.rgb.g + ',' + color.rgb.b + ')'
    this.props.backgroundColorActions.setBackgroundColor(colorStr)
  };

  render() {
    const backgroundColor = this.props.backgroundColor.get('backgroundColor')


    return (
      <ListItem
        key={this.props.key}
        onTouchTap={this.handleTouchTap}
        primaryText="Background Color"
        leftIcon={<ColorChooserIcon/>}
        rightAvatar={
          <Avatar
            backgroundColor={backgroundColor}
          />
        }>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <SketchPicker
            color={ backgroundColor }
            onChange={ this.handleChange }
          />
        </Popover>
      </ListItem>


    )
  }
}
