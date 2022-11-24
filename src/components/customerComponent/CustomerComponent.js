import React from 'react'
import CustomerDetailsForm from './CustomerDetailsForm'
import ShowCustomerDetails from './ShowCustomerDetails'

const CustomerComponent = () => {
  return (
    <div className="d-flex justify-content-between" style={{marginTop:'20px'}}>
        <div ><ShowCustomerDetails/></div> 
        <div >  <CustomerDetailsForm/></div> 
    </div>
  )
}

export default CustomerComponent