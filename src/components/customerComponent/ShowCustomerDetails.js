import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { startGetCustomerDetails } from '../../action/customerAction'
import EditRemoveCustomer from './EditRemoveCustomer'


const ShowCustomerDetails = () => {
    const dispatch=useDispatch()
    const customers=useSelector((state)=>{
        return state.customer
       })
    
    useEffect(()=>{
        dispatch(startGetCustomerDetails())
     },[dispatch])
  
    
  return (
    <div  className='showCustomerDetail' style={{marginLeft:'100px'}}>
        {customers.length===0?
        <div>
        <h2>No Customers Found</h2>
        <h3>Add Your First Customer</h3>
        </div>:<div>
        <h1>Listing Customers:{customers.length}</h1>
        <ul>{
            customers.map((ele)=>{
                return <li key={ele._id}>
                    Customer Name:<strong><u>{ele.name}</u></strong><br/>
                    Customer Phone:<strong>{ele.mobile}</strong><br/>
                    Customer email:<strong>{ele.email && ele.email}</strong>
                    <EditRemoveCustomer {...ele}/>
                                </li>
                })   
             }
         </ul>
        </div>}
       
    </div>
  )
}

export default ShowCustomerDetails