import React from 'react'
import {useFormik} from  'formik'
import * as  yup from 'yup'
import axios from 'axios';
import swal from 'sweetalert'

const RegisterForm=(props)=>{
    const registerSchema=yup.object().shape({
        username:yup.string()
        .min(4)
        .max(64)
        .required('Required!'),
        email:yup.string()
        .min(8)
        .required('Required!'),
        password:yup.string()
        .min(4)
        .max(64)
        .required('Required!'),
        businessName:yup.string()
        .min(4)
        .max(64)
        .required('Required!'),
        address:yup.string()
        .min(4)
        .max(128)
        .required('Required!'),
     });

    const formik=useFormik({
        initialValues:{
            username:'',
            email:'',
            password:'',    
            businessName:'',
            address:''},

        onSubmit:(formData)=>{
           axios.post('http://dct-pos-app.herokuapp.com/api/users/register',formData)
           .then((response)=>{
             if(response.data.errmsg || response.data.errors){
              if(response.data.errmsg){
                alert(response.data.errmsg)
              }else{
                alert(response.data.message)          
                 }
             }
             else{
              swal('User Registered Successfully ')
              formik.resetForm()
              props.history.push('/login')
             }
           })
           .catch((err)=>{
            alert(err.message)
           })
           formik.resetForm()
        },
        validationSchema:registerSchema,
        validateOnChange:false
     });

    return(
        <div style={{marginTop:'50px'}}>
            <h1>Register with Us✌✌</h1>

            <div className='container p-4 register-container'>
      <form onSubmit={formik.handleSubmit}>

      <div className='form-group'>
      <input className="form-control"  type='text'  placeholder='Enter Username' value={formik.values.username}
      onChange={formik.handleChange} name='username'/> {formik.errors.username}<br/>
      </div>      
      
      <div className='form-group'>
      <input className="form-control"  type='text' placeholder='Enter Email' value={formik.values.email}
      onChange={formik.handleChange} name='email'/> {formik.errors.email}<br/>
      </div> 

      <div className='form-group'>
      <input className="form-control"  type='password' placeholder='Enter Password' value={formik.values.password}
      onChange={formik.handleChange} name='password'/> {formik.errors.password}<br/>
      </div>            
                  
      <div className='form-group'>
      <input className="form-control"   type='text' placeholder='Enter Bussiness_Name' value={formik.values.businessName} onChange={formik.handleChange} name='businessName'/> {formik.errors.businessName}<br/>
      </div> 

      <div className='form-group'>
      <textarea className="form-control"  placeholder='Enter Address' value={formik.values.address}
      onChange={formik.handleChange}  name='address'/>  {formik.errors.address}<br/>
      </div> 

      <input className="btn btn-primary" type='submit' value='Register'/>
       
                       
        </form>

        </div>
        </div>
        
    )
}

export default RegisterForm