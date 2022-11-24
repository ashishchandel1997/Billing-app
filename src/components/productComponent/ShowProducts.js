import React,{useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import EditRemoveProduct from './EditRemoveProduct'
import { startGetProductDetails } from '../../action/productAction'
import image from "../../image/pro.png"

const ShowProducts = () => {
    const dispatch=useDispatch()
const products=useSelector((state)=>{
    return state.product
})

useEffect(()=>{
 dispatch(startGetProductDetails())
},[dispatch])

  return (
    <div style={{marginTop:'30px'}}>
    {products.length===0?
    <div>
    <h2>No Product Found</h2>
    <h3>Add Your Product</h3>
    </div>:<div>
    <h1>Listing Products:{products.length}</h1><br/>
    <div className="main-card-container">
    <>{
   products.map((ele)=>{
            return <li key={ele._id}>
                <img src={image} alt='pic' style={{height:"150px",width:"300px"}}/><br/>
              <strong>Item:{ele.name}</strong><br/>
                <strong>Price:{ele.price}₹</strong><br></br>
                <EditRemoveProduct {...ele}/>
                    </li>
              })   
         }</>
         
      </div>
      </div>
     }
</div>
)
}

export default ShowProducts