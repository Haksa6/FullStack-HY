

const notificationReducer = (state = null, action) => {
  switch(action.type){
  case 'SET_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

let timerID = null

export const notificationChange = (notification, timer, type) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: notification,
        type: type
      }
    })
    clearTimeout(timerID)
    timerID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: null
      })
    },timer)
  }
}



export default notificationReducer