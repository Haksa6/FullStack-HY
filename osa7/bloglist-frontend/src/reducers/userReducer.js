import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch(action.type){
  case 'INITUSERS':
    return action.data
  default:
    return state
  }
}
export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITUSERS',
      data: users
    })
  }
}

export default userReducer