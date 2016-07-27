import React, {Component} from 'react'
import CytoscapeRenderer from './CytoscapeRenderer'
import Loading from '../Loading'


import style from './style.css'

export default class NetworkPanel extends Component {

  componentWillMount() {
    console.log('--------- Comp WILL mount---------------')
    const curNetworkUrl = this.props.currentNetwork.get('url')
    if(curNetworkUrl === undefined || curNetworkUrl === '') {
      return
    }

    this.props.downloadActions.downloadBegin()
    this.props.downloadActions.download(curNetworkUrl)
  }

  componentWillReceiveProps(nextProps) {
    console.log('-------- Got New props---------------')
    const newUrl = nextProps.currentNetwork.get('url')
    const url = this.props.currentNetwork.get('url')

    console.log(url)
    console.log(newUrl)

    if (url === '' || url !== newUrl) {
      this.props.downloadActions.downloadBegin()
      this.props.downloadActions.download(newUrl)
    }
  }

  render() {
    console.log('called: VIewer renderer---------------')
    const {commands, commandActions} = this.props
    const url = this.props.currentNetwork.get('url')
    const network = this.props.networks.get(url)
    console.log(network)

    if (network !== undefined) {
      return (
        <CytoscapeRenderer
          commands={commands}
          commandActions={commandActions}
          networkData={network}/>
      )
    } else {
      // Display loading animation if data is not available
      return (
        <Loading />
      )
    }
  }
}
