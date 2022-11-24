
const initialReducer=[]

const productReducer=(state= initialReducer , action)=>{
    switch(action.type){

        case 'POST_PRODUCT_DETAILS': {
            return [{...action.payload} , ...state]
        }
        case 'GET_PRODUCTS_DATA':{
            return [...action.payload]

        }
        case 'DELETE_PRODUCT_DATA':{
            return state.filter((ele)=>{
                return ele._id !== action.payload
          })
        }
        case 'EDIT_PRODUCT_DATA':{
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

export default productReducer