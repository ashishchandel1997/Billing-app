import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import {startPostCustomerDetails} from '../../action/customerAction'
import { startEditCustomerData } from '../../action/customerAction'


const CustomerDetailsForm = (props) => {
  const {editId,editName,editEmail,editMobile,handleToggle}=props

     const dispatch=useDispatch()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const registerSchema=yup.object().shape({
        name:yup.string()
        .min(4)
        .max(64)
        .required('Required!!'),
        mobile:yup.string()      
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, "to short")
        .max(10, "to long")
        .required("required"),
        email:yup.string()
        .min(4)
        .max(64)
    })

    const formik=useFormik({
        initialValues:{
           name:editName?editName:'',
            mobile:editMobile?editMobile:'',
            email:editEmail?editEmail:''
           
        },
        onSubmit:(formData)=>{
          if(editName){
            dispatch(startEditCustomerData(formData,editId))
            handleToggle()
          }else{
            dispatch(startPostCustomerDetails(formData))
          }
          formik.resetForm()
        },
        validationSchema:registerSchema,
        validateOnChange:false,
      
    })
  return (
    <div style={{marginRight:'100px'}}>
      <h2>Add Customers</h2>

      <div className='container card pt-4 user-container'>
        <form onSubmit={formik.handleSubmit}>
        
        <div className="form-group">
            <label>Name:</label>
             <input className="form-control" type='text' value={formik.values.name} name='name' 
            placeholder='Enter your name'
            onChange={formik.handleChange}/> 
            {formik.errors.name}<br/> 
            </div>

            <div className="form-group">
            <label>Mobile:</label>
            <input className="form-control" type='text' value={formik.values.mobile} name='mobile'
            placeholder='Enter your number' 
            onChange={formik.handleChange}/>
            {formik.errors.mobile} <br/> 
            </div>

            <div className="form-group">
            <label>Email:</label>
            <input className="form-control" type='text' value={formik.values.email} name='email' placeholder='Enter your Email'
              onChange={formik.handleChange}/>
              {formik.errors.email} <br/> 
              </div>

              <input className="btn btn-primary" type='submit' value='ADD'/>
             
        </form>
        </div>
        
    </div>
  )
}

export default CustomerDetailsForm