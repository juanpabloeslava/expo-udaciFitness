import { createStore } from 'redux'
import rootReducer from '../reducers'
import rootMiddleware from '../middleware'

const store = createStore(rootReducer, rootMiddleware)

export default store