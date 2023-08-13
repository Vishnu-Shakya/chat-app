import React, { useState,useEffect } from 'react'
import { Link ,useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import {userRegister} from '../store/actions/authAction'
import { useAlert } from 'react-alert'
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType'

export default function Register() {

     // this is to redirect to home page when user is authenticate 
    const navigate=useNavigate()
    const alert=useAlert()
    const dispatch=useDispatch()

    const {loading,authenticate,error,successMessage,myInfo}=useSelector(state=>state.auth)
   

    const [state, setState] = useState({
        userName: '',
        email: [],
        password: '',
        confirmPassword: '',
        image: ''

    })

    const [LoadImage,setLoadImage]=useState('')

    const register= e =>{
        const {userName,password,image,confirmPassword,email}=state

        e.preventDefault()
        const formData=new FormData()
        formData.append('userName',userName)
        formData.append('email',email)
        formData.append('password',password)
        formData.append('confirmPassword',confirmPassword)
        formData.append('image',image)

        

        dispatch(userRegister(formData))



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
           
           
            error.map(item=>{
                
                alert.error(item)
        })
        dispatch({
            type:ERROR_CLEAR
           })
           
        }

    },[successMessage,error])
    

    const inputHandle = (e) => {

        
        setState({

            ...state,
            [e.target.name]:e.target.value
        })
        
        
    }


    const inputFileHandle=(e)=>{
        if(e.target.files.length!==0){
            setState({
                ...state,
                [e.target.name]:e.target.files[0]
            })
        }

        const reader=new FileReader()
        reader.onload=()=>{
            setLoadImage(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])

    }
    



    return (
        <div className='register'>

            <div className="card">
                <div className="card-header">
                    <h3>Register</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <input type="text" onChange={inputHandle} name='userName' value={state.userName} className='form-control' id='username' placeholder='username' />
                        </div><div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={inputHandle} name='email' value={state.email} className='form-control' id="email" placeholder='email' />

                        </div>

                        <div className="form-group">
                            <label htmlFor="password" >Password</label>
                            <input type="password" onChange={inputHandle} name='password' value={state.password} className='form-control' id="password" placeholder='password' />
                           
                        </div>
                        <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password </label>
                            <input type="password" onChange={inputHandle} name='confirmPassword' value={state.confirmPassword} className='form-control' id="confirmPassword" placeholder='confirm password' />
                           
                        </div>
                        <div className="form-group">
                            <div className="file-image">
                                <div className="image">
                                {LoadImage? <img src={LoadImage} alt='?'/>:''}
                                </div>
                                <div className="file">
                                    <label htmlFor="image">select Image</label>
                                    <input type="file" onChange={inputFileHandle} name='image'  className='form-control' id='image' />

                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value='register' className='btn' />
                        </div>


                        <div className="form-group">
                            <span><Link to='/messenger/login'>Login your Account on </Link></span>
                        </div>
                    </form>
                </div>

            </div >

        </div >
    )
}
