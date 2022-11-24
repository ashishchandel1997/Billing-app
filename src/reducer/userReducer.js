const initialValue={}

const userReducer=(state=initialValue,action)=>{
    switch(action.type){
        case 'GET_USER_INFO':{
            return {...action.payload}
        }

        default:{
            return state
        }
    }
}
export default userReducer