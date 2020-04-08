import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import post from './post'

// this component combines all 'reducers' into the elevated state with redux        ////////////////

export default combineReducers({
    alert,
    auth,
    profile,
    post
})