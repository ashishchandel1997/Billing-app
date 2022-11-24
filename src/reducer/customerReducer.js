
const initialReducer=[]

const customerReducer=(state= initialReducer , action)=>{
    switch(action.type){

        case 'POST_CUSTOMER_DETAILS': {
            return [{...action.payload} , ...state]
        }
        case 'GET_CUSTOMERS_DATA':{
            return [...action.payload]

        }
        case 'DELETE_CUSTOMER_DATA':{
            return state.filter((ele)=>{
                return ele._id !== action.payload
          })
        }
        case 'EDIT_CUSTOMER_DATA':{
            return state.map((ele)=>{
                if(ele._id===action.payload._id){
                   return {...ele , ...action.payload}
                } else {
                    return {...ele}   
                }
                
            })
        }
        
        default : {
            return state
        }
    }

}

export default customerReducer