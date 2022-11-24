import React  from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
 
const BillGenerator = (props) => {
  const params = useParams()
 
  const bill = useSelector((state)=>{
      return state.bill.filter(bil => bil._id === params.billId)[0]
  })
  const customer  = useSelector((state)=>{
    return state.customer.filter(cus => cus._id === bill.customer)[0]
})
const products = useSelector((state)=>{
    return state.product
})

const billProducts = bill?.lineItems.map(item =>{
   const result = products.filter(prod => prod._id === item.product)[0]
   result.quantity = item.quantity 
   result.subTotal = item.subTotal
   return result
  }) 

 
  return (
     <div style={{marginTop:'20px'}}>
         <div>
         <div>
           <div>
               <h3>Customer Name:{customer.name}</h3>
                 
               {
                billProducts.map((item,i)=>{
                   return (
                     <div key={i}>
                       <h6 >Product  - {item.name} <br/>Quantity-{item.quantity}<br/> SubTotal - {item.subTotal}</h6>
                     </div>
                   )
                })
               }
               <h4 >Total - {bill.total}</h4>
           </div>
           </div>
           </div>
            
            
     </div>
  )
}

export default BillGenerator



