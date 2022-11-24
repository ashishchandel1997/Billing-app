import React from 'react'
import BillForm from './BillForm'
import { useHistory } from 'react-router-dom'

const BillContainer = (props) => {
    const history=useHistory()
    const handleViewAll=()=>{
        history.push('/bills/all')
    }
    return (
     <div className='col-md-12'>
          <h2>Billing Details</h2>
          <BillForm  props={props} />
          <button className="btn btn-info btn-sm" onClick={handleViewAll}>viewAll</button>
    
     </div>
    )
}

export default BillContainer