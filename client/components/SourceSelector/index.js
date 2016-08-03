import React, {Component} from 'react'
import Paper from 'material-ui/Paper';
import UrlSource from './UrlSource'

import style from './style.css'

const NDEX_ID_REGEX = /[0-9a-f\-]{36,36}/
const URL_REGEX = /^http/

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
      case VALUES.zip:
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
            </section>
          </Paper>
        </div>

        <UrlSource
          refs="source"
          isReady={isReady}
          selected={this.state.selected}
          sources={VALUES}
          handleChange={this.handleChange}
          helperText={this.state.helperText}
          vsActions={this.props.vsActions}
          datasourceActions={this.props.datasourceActions}
          networkActions={this.props.networkActions}
        />
      </div>
    )
  }
}
