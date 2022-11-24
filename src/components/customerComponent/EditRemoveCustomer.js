import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import CustomerDetailsForm from './CustomerDetailsForm'
import { startDeleteCustomer } from '../../action/customerAction'

const EditRemoveCustomer = (props) => {
    const{_id,name,mobile,email}=props
    const [toggle,setToggle]=useState(false)
    const dispatch=useDispatch()

    const handleToggle=()=>{
        setToggle(!toggle)
    }
    const handleDelete=()=>{
        const confirm=window.confirm("Are you sure?")
        if(confirm){
            dispatch(startDeleteCustomer(_id))
        }
        
    }
  return (
    <div>
        {
            toggle?<>
            <CustomerDetailsForm editId={_id} editName={name} editMobile={mobile} editEmail={email} handleToggle={handleToggle}/>
            </>:
            <><button className="btn btn-primary" style={{marginRight:'10px'}} onClick={handleToggle}>edit</button>
            <button className="btn btn-primary"  onClick={handleDelete}>delete</button>
            <hr/>
            </>
        }
    </div>
  )
}

export default EditRemoveCustomer