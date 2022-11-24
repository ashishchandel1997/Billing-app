import axios from "axios";
const token=localStorage.getItem('token')


export const startPostProductDetails=(formData)=>{
    return(dispatch)=>{
      axios.post(`http://dct-pos-app.herokuapp.com/api/products` , formData , {
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    })
    
    .then((res)=>{
        const result = res.data
        if(result.hasOwnProperty('errors')){
            alert(result.message)
        } else {
            dispatch(postProductDetails(result))  }
    })
          .catch((err)=>{
            alert(err.message)
          })
           
    }
}

export const postProductDetails=(result)=>{
   
     return {
        type : 'POST_PRODUCT_DETAILS',
        payload : result
     }
}

export const startGetProductDetails=()=>{
  return(dispatch)=>{
    axios.get(`http://dct-pos-app.herokuapp.com/api/products` , {
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    })
    .then((res)=>{
        const result=res.data
        if(result.hasOwnProperty('errors')){
            alert(result.message)
        } else {
            dispatch(getProductDetails(result))  } 
    })
    .catch((err)=>{
        alert(err.message)
    })
}
}

export const getProductDetails=(result)=>{
    return{
        type:'GET_PRODUCTS_DATA',
        payload:result
    }

}

export const startDeleteProduct=(id)=>{
    return(dispatch)=>{
        axios.delete(`http://dct-pos-app.herokuapp.com/api/products/${id}`, {
            headers : {
                'Authorization' : ` Bearer ` + token
            }
        })
        .then((res)=>{
            const result = res.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else{
                dispatch(deleteProduct(id))
            }
          })
          .catch((err)=>{
            alert(err.message)
          })
    }
}

export const deleteProduct=(id)=>{
    return {
        type : 'DELETE_PRODUCT_DATA' ,
        payload : id
    }
}
export const startEditProductData=(formData,id)=>{
    console.log(id)
    return(dispatch)=>{
        axios.put(`http://dct-pos-app.herokuapp.com/api/products/${id}`,formData, {
            headers : {
                'Authorization' : ` Bearer ` + token
            }
        })
        .then((res)=>{
            const result = res.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            } else{
                dispatch(editProduct(result))
                
            }
          })
          .catch((err)=>{
            alert(err.message)
          })
    }

}
export const editProduct=(result)=>{
    return {
        type : 'EDIT_PRODUCT_DATA' ,
        payload : result
    }
}