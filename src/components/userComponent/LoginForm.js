import React from 'react'
import {useFormik} from  'formik'
import * as  yup from 'yup'
import axios from 'axios';
import swal from 'sweetalert';

const LoginForm = (props) => {
    const {handleAuth}=props
    const loginSchema=yup.object().shape({
        email:yup.string()
        .min(4)
        .required('Enter correct email'),
        password:yup.string()
        .min(8)
        .max(64)
        .required('Enter correct password')
    });

    const formik=useFormik({
            initialValues:{
                        email:'',
                        password:'', 
                        },
                 onSubmit:(formData)=>{
                       axios.post('http://dct-pos-app.herokuapp.com/api/users/login',formData)
                       .then((response)=>{
                        if(response.data.errors){
                            alert(response.data.errors)
                        }else{
                            swal('Succesfully Logged In')
                            localStorage.setItem('token',response.data.token)
                            props.history.push('/')
                            handleAuth()
                        }
                       })
                       formik.resetForm()
                        },

         validationSchema:loginSchema,
         validateOnChange:false
    });

  return (
    <div  style={{marginTop:'50px'}}>
        <h1 style={{marginBottom:'30px'}}>Login To your Account👍</h1>

        <div className='container p-4 register-container'>

        <form  onSubmit={formik.handleSubmit}>
        
        <div className="form-group">
        <input className="form-control" type='text'
        placeholder='Enter your Email' name='email' value={formik.values.email} onChange={formik.handleChange}/>
        <div>{formik.errors.email}</div><br/>
        </div>

        <div className="form-group ">
        <input className="form-control"  type='password'
         placeholder='Enter your Password' name='password' value={formik.values.password} onChange={formik.handleChange}/>
        < div> {formik.errors.password}</div><br/>
        </div>
                
         <input className="btn btn-primary" type='submit' value='SIGN IN'/>

    </form>
    </div>
    </div>
  )
}

export default LoginForm