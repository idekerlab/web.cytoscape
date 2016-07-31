import React, {Component} from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {browserHistory} from 'react-router'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

const paperStyle = {
  height: 300,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const paperSelected = {
  height: 300,
  width: 300,
  margin: 20,
  borderWidth: 3,
  textAlign: 'center',
  display: 'inline-block'
};

import * as Colors from 'material-ui/styles/colors'

import style from './style.css'

const NDEX_ID_REGEX = /[0-9a-f\-]{36,36}/
const URL_REGEX = /^http/

const NDEX_URL = 'http://ci-dev-serv.ucsd.edu:3001/ndex2cyjs/'


const labelStyle = {
  color: '#666666',
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
      shadow: 1,
      cardBg: '#FFFFFF'
    };

  }

  onMouseOver = () => this.setState({shadow: 2});
  onMouseOut = () => this.setState({shadow: 1});
  onCardClick = () => this.setState({cardBg: 'red'});

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

    switch (this.state.selected) {
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

        <div className={style.selectorBox}>
          <h1 className={style.title}> Select Data Source</h1>
        </div>

        <div className={style.selectorBox}>
          <Paper className={style.source}
                 style={{backgroundColor: this.state.cardBg}}
                 onMouseOver={this.onMouseOver}
                 onMouseOut={this.onMouseOut}
                 onClick={this.onCardClick}
                 zDepth={this.state.shadow}>

          </Paper>

          <Paper className={style.source}
                 onMouseOver={this.onMouseOver}
                 onMouseOut={this.onMouseOut}
                 zDepth={this.state.shadow}/>
          <Paper className={style.source}
                 onMouseOver={this.onMouseOver}
                 onMouseOut={this.onMouseOut}
                 zDepth={this.state.shadow}/>
        </div>

        <div className={style.container}>
          <div className={style.wrapper1}>
            <div className={style.sourceBox}>
              <RadioButtonGroup
                name="dataSourceType"
                defaultSelected={VALUES.ndex}
                onChange={this.sourceTypeSelected}>
                <RadioButton
                  className={style.radio1}
                  value={VALUES.ndex}
                  label="NDEx"
                  labelStyle={labelStyle}
                />
                <RadioButton
                  className={style.radio1}
                  value={VALUES.url}
                  label="JSON"
                  labelStyle={labelStyle}
                />
                <RadioButton
                  className={style.radio1}
                  value={VALUES.zip}
                  label="Zip"
                  labelStyle={disabledLabelStyle}
                  disabled={true}
                />
              </RadioButtonGroup>
            </div>

            <div className={style.actionBox}>
              <TextField
                className={style.sourceText}
                ref='sourceUrl'
                inputStyle={{color: '#777777'}}
                hintText={this.state.helperText}
                hintStyle={{color: '#CCCCCC'}}
                onChange={this.handleChange}
              />

              <FlatButton
                className={style.bottom2}
                label="Clear"
                style={{marginLeft: '1em', flex: 1}}
                backgroundColor={Colors.teal800}
                onClick={this.handleClear}
              />
              <FlatButton
                className={style.bottom2}
                label="Visualize"
                disabled={!isReady}
                style={{marginLeft: '1em', flex: 1}}
                labelStyle={{fontWeight: 600}}
                backgroundColor={Colors.orange700}
                hoverColor={Colors.orange400}
                onClick={this.handleVisualize}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
