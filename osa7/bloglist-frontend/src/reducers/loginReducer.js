import loginService from '../services/login'
import storage from '../utils/storage'
import { notificationChange } from './notificationReducer'

const loginReducer = (state = null, action) => {
  switch(action.type){
  case 'INITUSER':
    return action.data
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return action.data
  default:
    return state
  }
}
export const initializeUser = () => {
  return async dispatch => {
    const data = storage.loadUser()
    dispatch({
      type: 'INITUSER',
      data
    })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const data = await loginService.login({
        username, password
      })
      dispatch(notificationChange(`${data.name} welcome back!`, 5000, 'success'))
      storage.saveUser(data)
      dispatch({
        type: 'LOGIN',
        data
      })
    } catch(exception) {
      dispatch(notificationChange('wrong username/password', 5000, 'error'))
    }
  }
}
export const logout = () => {
  return async dispatch => {
    const data = null
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT',
      data
    })
  }
}


export default loginReducer