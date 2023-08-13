import React from 'react'
import { useState ,useEffect} from 'react'
import { Link ,useNavigate} from "react-router-dom"
import {userLogin} from '../store/actions/authAction'
import {useDispatch,useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType'



export default function Login() {
    const dispatch=useDispatch()
    const alert=useAlert()
    const navigate=useNavigate()


    const {loading,authenticate,error,successMessage,myInfo}=useSelector(state=>state.auth)


    const [state,setState]=useState({
        email:"",
        password:'',

    })

    const inputhandle=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const login =(e)=>{
            e.preventDefault()
           dispatch(userLogin(state))
    }
    
    useEffect(()=>{
        if(authenticate){
            // this is to redirect to home page when user is authenticate 
            navigate('/')
        }
        if(successMessage){
           alert.success(successMessage)
           dispatch({
            type:SUCCESS_MESSAGE_CLEAR
           })
        }
        if(error){
          
           
            error.errorMessage.map(item=>{
                
                alert.error(item)
                
        })
        dispatch({
            type:ERROR_CLEAR
           })
           
        }

    },[successMessage,error])
    

  return (
    <div className='register'>

            <div className="card">
                <div className="card-header">
                    <h3>Login</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" onChange={inputhandle} name='email' value={state.email} className='form-control' id="email" placeholder='email' />
                            
                        </div>
                       
                        <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"  onChange={inputhandle} name='password' value={state.password} className='form-control' id="password" placeholder='password' />
                            
                        </div>

                       
                        <div className="form-group">
                            <input type="submit" value='login' className='btn' />
                        </div>


                        <div className="form-group">
                            <span><Link to='/messenger/register'>New User Register</Link></span>
                        </div>
                    </form>
                </div>

            </div >

        </div >
  )
}
