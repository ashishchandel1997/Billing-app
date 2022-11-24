import React from 'react'
import  ReactDOM  from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import { Provider } from 'react-redux';
import ConfigureStore from './store/ConfigureStore';
import { startGetUserInfo } from './action/usersAction';
import { startGetCustomerDetails } from './action/customerAction';
import { startGetProductDetails } from './action/productAction';
import { startGetBill } from './action/billAction.js';

const store = ConfigureStore()
console.log('store')

 store.subscribe(()=>{
    // console.log('updated' , store.getState())
 })

 if(localStorage.hasOwnProperty('token')){
   store.dispatch(startGetUserInfo())
   store.dispatch(startGetCustomerDetails())
   store.dispatch(startGetProductDetails())
   store.dispatch(startGetBill())
 }

const rootHandle=document.getElementById('root')

ReactDOM.render(
<BrowserRouter> <Provider store={store}>
     <App />
     </Provider></BrowserRouter>,rootHandle)