// const { createStore, applyMiddleware, combineReducers, compose } = Redux
// const thunk = ReduxThunk.default

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { ticketReducer } from './reducer/ticket.reducer.js'
import { userReducer } from './reducer/user.reducer.js'
import { eventReducer } from './reducer/event.reducer.js'

const rootReducer = combineReducers({
    ticketModule: ticketReducer,
    eventModule: eventReducer,
    userModule: userReducer
    
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))



