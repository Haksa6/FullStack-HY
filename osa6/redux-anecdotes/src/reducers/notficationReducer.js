const notificationReducer = (state = null, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const notificationChange = notification => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: null 
      })
    },5000)
  }
}



export default notificationReducer