import React, {Component} from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {browserHistory} from 'react-router'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';

import * as Colors from 'material-ui/styles/colors'

import style from './style.css'

const NDEX_ID_REGEX = /[0-9a-f\-]{36,36}/
const URL_REGEX = /^http/

const NDEX_URL = 'http://ci-dev-serv.ucsd.edu:3001/ndex2cyjs/'


const labelStyle = {
  color: '#FFFFFF',
  fontWeight: 400
}

const disabledLabelStyle = {
  color: '#777777',
}


const NDEX = 'Enter NDEx ID...'
const URL = 'Enter URL of JSON file...'
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
      ready: false,
      selected: VALUES.ndex,
      helperText: NDEX,
      currentText: '',
    };

  }

  sourceTypeSelected = (event, value) => {
    this.setState({
      selected: value,
      helperText: VALUES[value],
      currentText: ''
    })
  }

  handleVisualize = event => {
    const node = this.refs.sourceUrl
    const networkUrl = node.input.value.trim()
    const url = this.createUrl(networkUrl)
    const networkId = encodeURIComponent(url)
    browserHistory.push('/networks/' + networkId)
  }

  createUrl = value => {
    let url = value

    switch(this.state.selected) {
      case VALUES.ndex:
        url = NDEX_URL + value
        break
      default:
        break
    }
    return url
  }

  handleClear = event => {
    const node = this.refs.sourceUrl
    node.input.value = ''
  }

  handleChange = (event, val) => {
    console.log(val)
    let valid = false

    switch (this.state.selected) {
      case VALUES.ndex:
        valid = this.validateNdex(val)
        break
      case VALUES.url:
        valid = this.validateUrl(val)
        break
      default:
        break
    }
    this.setState({
      ready: valid
    })
  }

  validateNdex = value => {
    return NDEX_ID_REGEX.test(value)
  }

  validateUrl = value => {
    return URL_REGEX.test(value)
  }

  render() {
    const isReady = this.state.ready

    return (
      <div className={style.selectorMain}>
        <RadioButtonGroup
          className={style.selectorBox}
          name="dataSourceType"
          defaultSelected={VALUES.ndex}
          onChange={this.sourceTypeSelected}
        >
          <RadioButton
            style={{width: '7em'}}
            value={VALUES.ndex}
            label="NDEx"
            labelStyle={labelStyle}
          />
          <RadioButton
            style={{width: '7em'}}
            value={VALUES.url}
            label="JSON"
            labelStyle={labelStyle}
          />
          <RadioButton
            style={{width: '7em'}}
            value={VALUES.zip}
            label="Zip"
            labelStyle={disabledLabelStyle}
            disabled={true}
          />
        </RadioButtonGroup>

        <div className={style.selectorBox}>
          <TextField
            className={style.bottom2}
            ref='sourceUrl'
            inputStyle={{color: '#FFFFFF'}}
            hintText={this.state.helperText}
            hintStyle={{color: '#CCCCCC'}}
            onChange={this.handleChange}
          />

          <FlatButton
            className={style.bottom2}
            label="Clear"
            style={{marginLeft: '1em'}}
            backgroundColor={Colors.teal800}
            onClick={this.handleClear}
          />
          <FlatButton
            className={style.bottom2}
            label="Visualize"
            disabled={!isReady}
            style={{marginLeft: '1em'}}
            labelStyle={{fontWeight: 600}}
            backgroundColor={Colors.orange700}
            hoverColor={Colors.orange400}
            onClick={this.handleVisualize}
          />
        </div>
      </div>
    )
  }
}
