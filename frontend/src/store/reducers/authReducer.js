import { REGISTER_FAIL, REGISTER_SUCCESS, SUCCESS_MESSAGE_CLEAR,ERROR_CLEAR, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from "../types/authType"
import decodeToken from 'jwt-decode'

const authState={
    loading:true,
    authenticate:false,
    error:'',
    successMessage:'',
    myInfo:''
}
const tokenDecode=(token)=>{
    const tokenDecoded=decodeToken(token)
    const expTime=new Date(tokenDecoded.exp*1000)
    if(new Date()>expTime){
        return null
    }
    return tokenDecoded


}

const getToken=localStorage.getItem('authToken')
if(getToken){

    const getInfo=tokenDecode(getToken)
    if(getInfo){
        authState.myInfo=getInfo
        authState.authenticate=true
        authState.error=''
        authState.loading=false
    }
}




export const authReducer=(state=authState,action)=>{
    const{payload,type}=action

    if(type===REGISTER_FAIL || type===USER_LOGIN_FAIL){
        return {
            ...state,
            loading:true,
            authenticate:false,
            error:payload.error,
            successMessage:'',
            myInfo:''

        }
    }
    if(type===REGISTER_SUCCESS || type===USER_LOGIN_SUCCESS){
        const myInfo=tokenDecode(payload.token);
        return {
            ...state,
            loading:false,
            authenticate:true,
            error:'',
            successMessage:payload.successMessage,
            myInfo:myInfo

        }
    }
    if(type===SUCCESS_MESSAGE_CLEAR){
       
        return {
            ...state,
            successMessage:'',
        }
    }
    if(type===ERROR_CLEAR){
        return {
            ...state,
            error:''
        }
    }



    return state
}