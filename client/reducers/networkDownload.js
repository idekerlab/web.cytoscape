import {Map} from 'immutable'
import 'whatwg-fetch'

import {addNetwork} from './networks'

const DOWNLOAD_BEGIN = 'DOWNLOAD_BEGIN'
const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS'
const DOWNLOAD_ERROR = 'DOWNLOAD_ERROR'

const defaultState = Map({
  downloading: false,
  error: null
})

export default function downloadState(state = defaultState, action) {
  switch (action.type) {
    case DOWNLOAD_BEGIN:
      return state.merge({
        downloading: true
      })
    case DOWNLOAD_SUCCESS:
      return state.merge({
        downloading: false
      })
    case DOWNLOAD_ERROR:
      return state.merge({
        downloading: false,
        error: action.error
      })
    default:
      return state
  }
}

/*Set the downloading flag*/
export function downloadBegin() {
  return {type: DOWNLOAD_BEGIN}
}

/*Send network to the networks store and remove the downloading flag*/
export function downloadSuccess(networkUrl, data) {
  return dispatch => {
    dispatch(addNetwork(networkUrl, data))
    dispatch({type: DOWNLOAD_SUCCESS})
  }
}

/*Set an error field if a download did not complete successfully*/
export function downloadError(error) {
  return {type: DOWNLOAD_ERROR, error}
}

/*Download the network from the given url*/
export function download(networkUrl) {
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return dispatch =>
    fetch(networkUrl, {
      method: 'get',
      headers: headers
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((data) => dispatch(downloadSuccess(networkUrl, data)))
      } else {
        const error = new Error(response)
        error.response = response
        dispatch(downloadError(error))
        throw error
      }
    }).catch(error => {
      window.alert('Network ' + networkUrl + ' download failed, reason:', error)
    })
}