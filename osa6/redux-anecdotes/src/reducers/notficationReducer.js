

const notificationReducer = (state = null, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

let timerID = null

export const notificationChange = (notification, timer) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    clearTimeout(timerID)
    timerID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: null 
      })
    },timer)
  }
}



export default notificationReducer