import {createStore , combineReducers , applyMiddleware} from 'redux'
import  thunk from 'redux-thunk'
import userReducer from '../reducer/userReducer'
import customerReducer from '../reducer/customerReducer'
import productReducer from '../reducer/productReducer'
import billReducer from '../reducer/billReducer'

const configureStore=()=>{

   const store = createStore(combineReducers({
        user : userReducer,
        customer : customerReducer,
        product:productReducer,
        bill : billReducer 
   }),applyMiddleware(thunk))
   return store
}

export default configureStore