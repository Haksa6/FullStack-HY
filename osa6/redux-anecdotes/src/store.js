import { applyMiddleware, combineReducers, createStore } from "redux"
import anecdoteReducer from "./reducers/anecdoteReducer"
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from "./reducers/notficationReducer"
import thunk from 'redux-thunk'
import filterReducer from "./reducers/filterReducer"



const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk) ),
)




export default store