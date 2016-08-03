import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import * as Colors from 'material-ui/styles/colors'
import style from './style.css'

import JSZip from '../../lib/jszip.min'
import JSZipUtils from '../../lib/jszip-utils.min'

const NDEX_URL = 'http://ci-dev-serv.ucsd.edu:3001/ndex2cyjs/'

const PRESET_STYLES_LOCATION = '../../assets/preset-styles.json'

export default class UrlSource extends Component {

  handleClear = event => {
    const node = this.refs.sourceUrl
    node.input.value = ''
  }

  handleVisualize = event => {
    const node = this.refs.sourceUrl
    const networkUrl = node.input.value.trim()

    let networkId = ''
    let url = ''
    if (networkUrl.endsWith('.zip')) {
      url = networkUrl
      this.processZip(networkUrl, this.props.vsActions, this.props.networkActions)
      networkId = encodeURIComponent(networkUrl)

    } else {
      url = this.createUrl(networkUrl)
      networkId = encodeURIComponent(url)
    }


    const vsNode = this.refs.vsUrl
    let styleUrl = vsNode.input.value.trim()

    console.log('---------- Loading style -------------')
    console.log(this.props)
    console.log(styleUrl)

    if (styleUrl === undefined || styleUrl === null || styleUrl === '') {
      console.log('---------- No need to load style -------------')
      styleUrl = PRESET_STYLES_LOCATION
    } else {
      this.props.vsActions.fetchVisualStyles(styleUrl)
    }

    this.props.datasourceActions.setNetworkSource(url)
    this.props.datasourceActions.setStyleSource(styleUrl)

    browserHistory.push('/networks/' + networkId)
  }

  processZip = (url, vsActions, networkActions) => {

    let archive = null

    new JSZip.external.Promise(function (resolve, reject) {
      console.log('%%%%%%%%%%%%%%ZIP START-------------')
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          reject(e);
        } else {
          console.log('%%%%%%%%%%%%%%ZIPo -------------')
          resolve(data);
        }
      });
    }).then(function (data) {
      console.log('%%%%%%%%%%%%%%ZIP1 -------------')
      return JSZip.loadAsync(data);
    })
      .then(zip => {
        console.log('%%%%%%%%%%%%%%ZIP -------------')
        console.log(zip)
        archive = zip
        return zip.file('style.json').async('string')
      })
      .then(function (styleStr) {
        console.log('%%%%%%%%%%%%%%ZIP final -------------')

        const styles = JSON.parse(styleStr)
        console.log(styles);
        console.log(vsActions)
        const styleMap = {}
        styles.map(vs => {
          styleMap[vs.title] = vs.style
        })
        vsActions.addStyles(styleMap)
      }).then(() => {
        const fileNames = Object.keys(archive.files)
        for(let name of fileNames) {
          if(name !== 'style.json') {
            return archive.file(name).async('string')
          }
        }
    }).then(networkStr => {
      const network = JSON.parse(networkStr)
      console.log(network);
      networkActions.addNetwork(url, network)
      console.log('---------- FINISHD#############  -------------')
    })
  }

  createUrl = value => {
    let url = value

    switch (this.props.selected) {
      case this.props.sources.ndex:
        url = NDEX_URL + value
        break
      default:
        break
    }
    return url
  }

  render() {
    return (
      <div>
        <div className={style.container}>
          <div className={style.wrapper1}>
            <TextField
              className={style.sourceText}
              ref='sourceUrl'
              inputStyle={{color: '#666666'}}
              hintStyle={{color: '#999999'}}
              hintText={this.props.helperText}
              onChange={this.props.handleChange}
            />
            <TextField
              className={style.sourceText}
              ref='vsUrl'
              inputStyle={{color: '#666666'}}
              hintText="Optional: Visual Style URL"
              hintStyle={{color: '#999999'}}
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
                disabled={!this.props.isReady}
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