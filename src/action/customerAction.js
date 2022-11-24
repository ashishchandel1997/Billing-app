import axios from "axios";
const token=localStorage.getItem('token')


export const startPostCustomerDetails=(formData)=>{
    return(dispatch)=>{
      axios.post(`http://dct-pos-app.herokuapp.com/api/customers` , formData , {
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    })
    
    .then((res)=>{
        const result = res.data
        if(result.hasOwnProperty('errors')){
            alert(result.message)
        } else {
            dispatch(postCustomerDetails(result))  }
    })
          .catch((err)=>{
            alert(err.message)
          })
           
    }
}

export const postCustomerDetails=(result)=>{
   
     return {
        type : 'POST_CUSTOMER_DETAILS',
        payload : result
     }
}

export const startGetCustomerDetails=()=>{
  return(dispatch)=>{
    axios.get(`http://dct-pos-app.herokuapp.com/api/customers` , {
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    })
    .then((res)=>{
        const result=res.data
        if(result.hasOwnProperty('errors')){
            alert(result.message)
        } else {
            dispatch(getCustomerDetails(result))  } 
    })
    .catch((err)=>{
        alert(err.message)
    })
}
}

export const getCustomerDetails=(result)=>{
    return{
        type:'GET_CUSTOMERS_DATA',
        payload:result
    }

}

export const startDeleteCustomer=(id)=>{
    return(dispatch)=>{
        axios.delete(`http://dct-pos-app.herokuapp.com/api/customers/${id}`, {
            headers : {
                'Authorization' : ` Bearer ` + token
            }
        })
        .then((res)=>{
            const result = res.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else{
                dispatch(deleteCustomer(id))
            }
          })
          .catch((err)=>{
            alert(err.message)
          })
    }
}

export const deleteCustomer=(id)=>{
    return {
        type : 'DELETE_CUSTOMER_DATA' ,
        payload : id
    }
}
export const startEditCustomerData=(formData,id)=>{
    console.log(id)
    return(dispatch)=>{
        axios.put(`http://dct-pos-app.herokuapp.com/api/customers/${id}`,formData, {
            headers : {
                'Authorization' : ` Bearer ` + token
            }
        })
        .then((res)=>{
            const result = res.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else{
                dispatch(editCustomer(result))
                
            }
          })
          .catch((err)=>{
            alert(err.message)
          })
    }

}
export const editCustomer=(result)=>{
    return {
        type : 'EDIT_CUSTOMER_DATA' ,
        payload : result
    }
}