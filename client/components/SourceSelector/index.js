import React, {Component} from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';

import * as Colors from 'material-ui/styles/colors'

import style from './style.css'

const labelStyle = {
  color: '#FFFFFF',
  fontWeight: 400
}


const NDEX = 'Enter NDEx ID...'
const URL = 'Enter URL of Cytoscape.js JSON...'
const ZIP = 'Enter URL of zip archive...'

const VALUES = {
  'ndex': NDEX,
  'url': URL,
  'zip': ZIP
}

export default class SourceSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      helperText: NDEX,
      currentText: '',
    };

  }

  sourceTypeSelected = (event, value) => {
    console.log(event)
    console.log(value)

    this.setState({
      helperText: VALUES[value],
      currentText: ''
    })
  }

  handleVisualize = event => {
    console.log("Handling---------------------")
    console.log(this.refs)
    const node = this.refs.sourceUrl
    const networkUrl = node.input.value.trim()
    console.log(networkUrl)
    this.props.networkSourceActions.setCurrentNetwork(networkUrl)
    browserHistory.push('/network')
  }

  render() {
    console.log("PROP ---------------------")
    console.log(this.props)

    return (
      <div className={style.selectorMain}>

        <RadioButtonGroup
          className={style.selectorBox}
          name="dataSourceType"
          defaultSelected="ndex"
          onChange={this.sourceTypeSelected}
        >
          <RadioButton
            style={{width: '7em'}}
            value="ndex"
            label="NDEx"
            labelStyle={labelStyle}
          />
          <RadioButton
            style={{width: '7em'}}
            value="url"
            label="JSON"
            labelStyle={labelStyle}
          />
          <RadioButton
            style={{width: '7em'}}
            value="zipped"
            label="Zip"
            labelStyle={labelStyle}
          />
        </RadioButtonGroup>

        <div className={style.selectorBox}>
          <TextField
            className={style.bottom2}
            ref='sourceUrl'
            inputStyle={{color: '#FFFFFF'}}
            hintText={this.state.helperText}
            hintStyle={{color: '#CCCCCC'}}
          />

          <FlatButton
            className={style.bottom2}
            label="Clear"
            style={{marginLeft: '1em'}}
            backgroundColor={Colors.teal800}
          />
          <FlatButton
            className={style.bottom2}
            label="Visualize"
            style={{marginLeft: '1em'}}
            backgroundColor={Colors.orange700}
            hoverColor={Colors.orange400}
            onClick={this.handleVisualize}
          />
        </div>

      </div>
    )
  }
}

