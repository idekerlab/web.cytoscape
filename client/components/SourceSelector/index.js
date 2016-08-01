import React, {Component} from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {browserHistory} from 'react-router'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import logo from '../../assets/images/cytoscape-logo-orange.svg'

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

const baseStyle = {
  backgroundColor: 'white',
  color: '#999999'
}

const selectedStyle = {
  backgroundColor: '#C7E6E2',
  color: '#333333'
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
      selectedStyle: style.source,
      cardNdex: selectedStyle,
      cardUrl: baseStyle,
      cardZip: baseStyle,
    };

  }

  onMouseOver = () => this.setState({shadow: 2});
  onMouseOut = () => this.setState({shadow: 1});

  resetSelection = () => {
    this.setState({
      cardNdex: baseStyle,
      cardUrl: baseStyle,
      cardZip: baseStyle,
    })
  }

  onNdexCardClick = () => {
    this.resetSelection()
    this.setState({
      helperText: NDEX,
      currentText: '',
      selected: VALUES.ndex,
      cardNdex: selectedStyle
    })
  }
  onUrlCardClick = () => {
    this.resetSelection()
    this.setState({
      helperText: URL,
      currentText: '',
      selected: VALUES.url,
      cardUrl: selectedStyle
    })
  }
  onZipCardClick = () => {
    this.resetSelection()
    this.setState({
      helperText: ZIP,
      currentText: '',
      selected: VALUES.zip,
      cardZip: selectedStyle
    })
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

        <div className={style.container}>
          <div className={style.title}>
            Select Data Source
          </div>
        </div>

        <div className={style.selectorBox}>
          <Paper
            className={style.source}
            style={this.state.cardNdex}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            onClick={this.onNdexCardClick}
            zDepth={this.state.shadow}>

            <h2>NDEx ID</h2>
            <section>
              Unique ID of NDEx network
            </section>
          </Paper>

          <Paper
            className={style.source}
            style={this.state.cardUrl}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            onClick={this.onUrlCardClick}
            zDepth={this.state.shadow}
          >
            <h2>Cytosvape.js JSON</h2>
            <section>
              URL of JSON file in Cytoscape.js format
            </section>

          </Paper>
          <Paper
            className={style.source}
            style={this.state.cardZip}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            onClick={this.onZipCardClick}
            zDepth={this.state.shadow}>
            <h2>Zipped Archive</h2>
            <section>
              Zipped file exported from Cytoscape 3
              <br />
              (Coming Soon...)
            </section>
          </Paper>
        </div>

        <div className={style.container}>
          <div className={style.wrapper1}>
            <TextField
              className={style.sourceText}
              ref='sourceUrl'
              inputStyle={{color: '#777777'}}
              hintText={this.state.helperText}
              hintStyle={{color: '#CCCCCC'}}
              onChange={this.handleChange}
            />

          </div>
        </div>

        <div className={style.container}>
          <div className={style.wrapper1}>

            <div className={style.actionBox}>
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
