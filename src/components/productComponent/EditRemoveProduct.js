import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { startDeleteProduct } from '../../action/productAction'
import ProductsForm from './ProductsForm'

const EditRemoveProduct = (props) => {
    const {_id,name,price}=props
    const [toggle,setToggle]=useState(false)
    const dispatch=useDispatch()

    const handleToggle=()=>{
        setToggle(!toggle)
    }
    const handleDelete=()=>{
        const confirm=window.confirm("Are you sure?")
        if(confirm){
            dispatch(startDeleteProduct(_id))
        }
    }
        
  return (
    <div >
    {
        toggle?<>
        <ProductsForm editId={_id} editName={name} editPrice={price} handleToggle={handleToggle}/>
        </>:
        <><button className="btn btn-primary" style={{marginRight:'10px'}} onClick={handleToggle}>edit</button>
        <button className="btn btn-primary"  onClick={handleDelete}>delete</button>
        </>
    }
</div>
  )
}

export default EditRemoveProduct