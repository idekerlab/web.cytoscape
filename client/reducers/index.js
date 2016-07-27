import {routerReducer as routing} from 'react-router-redux'
import {combineReducers} from 'redux'
import currentNetwork from './currentnetwork'
import current_vs from './currentvs'
import visual_styles from './visualstyles'
import commands from './commands'

import {store as netStore} from 'cy-network-store'

// Cytoscape.js network data store
const cy_network = combineReducers(netStore)

// Application states
const app_manager = combineReducers({
  current_vs: current_vs,
  current_network: currentNetwork,
  commands: commands
})


export default combineReducers({
    routing,
    app_manager,
    visual_styles,
    cy_network
  }
)