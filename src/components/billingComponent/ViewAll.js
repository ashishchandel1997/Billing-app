import React from 'react'
import { useSelector } from 'react-redux'
import { startDelete } from '../../action/billAction'
import { useDispatch } from 'react-redux'
const ViewAll = (props) => {
   const dispatch = useDispatch()
      const customer = useSelector((state)=>{
         return state.customer
      })

       const product = useSelector((state)=>{
         return  state.product
       })

       const bill = useSelector((state)=>{
         return  state.bill
       })

        const allCustomerBills=()=>{
           const allBills = bill.map(bill => {
            const customerDetails = customer.filter(cus => {
              return cus._id === bill.customer
            })[0]
            if(customerDetails){
              const newBill = bill.lineItems.map(item => {
                 const details = product.filter(prod => prod._id=== item.product)[0]
                 return {
                   quantity : item.quantity,
                   subTotal : item.subTotal,
                   ...details
                 } 
              })
              return {
                customerName: customerDetails.name,
                billId: bill._id,
                products: newBill,
                total: bill.total
              }
              } else {
              return {error:'Not Found'}
          }
           })
           return allBills.filter(bill => !bill.error).flat()
        }
        
        const handleRemove=(id)=>{
          const confirm = window.confirm('Are you sure?')
          if(confirm){
              dispatch(startDelete(id))
          }
      }
      const currentProductDetails = allCustomerBills()
  return (
    <div>
       <div>
         <div>
           <div>
      {
        currentProductDetails.map((ele, index) => {
          return (
            
              <div key={index} >
               <div>
              <div  >
                 <div>
                    <h4>Customer - {ele.customerName}</h4>
                    <h5>Item | Quantity | Price</h5>
                    {ele.products.map((item, ind) => {
                return (             
                    <div key={ind} className='fonts'>{`${item.name}  : ${item.quantity}  :  ${item.subTotal}`}</div>
                       )
                   })}
                    
             <h5>Total - {ele.total}</h5>
                   
              <button className="btn btn-danger btn-sm" onClick={() => {handleRemove(ele.billId)}}>delete</button><hr/>
                   
                 </div> 
              </div>
              </div>
             </div>
              
          )
      })
      }
      </div>
       </div>
      </div>
    </div>
  )
}

export default ViewAll