import axios from "axios";



export const startGetUserInfo=()=>{
   const token = localStorage.getItem('token')
    return(dispatch)=>{
      axios.get(`http://dct-pos-app.herokuapp.com/api/users/account` , {
         headers : {
            'Authorization' : `Bearer ` + token
         }
        })

          .then((res)=>{
            const result = res.data
             dispatch(userInfo(result))
          })
          .catch((err)=>{
            alert(err.message)
          })
           
    }
}

export const userInfo=(data)=>{
     return {
        type : 'GET_USER_INFO',
        payload : data
     }
}


