import React, { useEffect } from 'react'
import { startGetUserInfo } from '../../action/usersAction'
import { useDispatch, useSelector } from 'react-redux'

const AccountDetail = (props) => {

    const dispatch = useDispatch()
    const users = useSelector((state)=>{
      return    state.user
   })
     
     useEffect(()=>{
        dispatch(startGetUserInfo())
     },[dispatch])
  
     
    return (
      <div className='showaccount' >
          <h2> User Info  </h2>
          <h3>Account -- {users.username}</h3>
          <h3> Email  -- {users.email}</h3>
      </div>
    )
  }
  
  export default AccountDetail
