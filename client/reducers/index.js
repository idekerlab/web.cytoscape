import {routerReducer as routing} from 'react-router-redux'
import {combineReducers} from 'redux'
import currentNetwork from './currentnetwork'
import current_vs from './currentvs'
import visual_styles from './visualstyles'
// import commands from './commands'
import cy_commands from './cycommands'
import cy_events from './cy-events'
import ui_state from './ui-state'

import {store as netStore} from 'cy-network-store'

// Cytoscape.js network data store
const cy_network = combineReducers(netStore)

// Application states
const app_manager = combineReducers({
  current_vs: current_vs,
  current_network: currentNetwork,
  commands: cy_commands,
  cy_events: cy_events,
  ui_state: ui_state
})


export default combineReducers({
    routing,
    app_manager,
    visual_styles,
    cy_network
  }
)