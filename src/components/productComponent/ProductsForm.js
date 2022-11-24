import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import {startPostProductDetails} from '../../action/productAction'
import { startEditProductData } from '../../action/productAction'

const ProductsForm = (props) => {
    const {editId,editName,editPrice,handleToggle}=props
    const dispatch=useDispatch()

    const registerSchema=yup.object().shape({
        name:yup.string()
        .min(3)
        .max(64)
        .required('Required!!'),
        price:yup.number()
        .required('required!!')
    })

    const formik=useFormik({
        initialValues:{
            name:editName?editName:'',
            price:editPrice?editPrice:''  
            
              },
         onSubmit:(formData)=>{
            if(editName){
                dispatch(startEditProductData(formData,editId))
                handleToggle()
              }else{
                dispatch(startPostProductDetails(formData))
              }
              formik.resetForm()
         },     
         validationSchema:registerSchema,
         validateOnChange:false,
    })

  return (
    <div  style={{marginTop:'50px'}}>
        <h2 style={{marginBottom:'30px'}}>Add Your Product🎁</h2>

        <div className='container card p-4 register-container'>
          <form onSubmit={formik.handleSubmit}>
        

          <div className="form-group">
          <input className="form-control" type='text'
          placeholder='Enter the name of Product'
          value={formik.values.name}
          name='name'
          onChange={formik.handleChange} />
          <div>{formik.errors.name}</div><br/>
          </div>

          <div className="form-group">
          <input className="form-control" type='number'
          placeholder='Enter Amount'
          value={formik.values.price}
          name='price'
          onChange={formik.handleChange}/>
          <div>{formik.errors.price}</div><br/>
          </div>
             
          <input className="btn btn-primary" type='submit' value='ADD'/>
        </form>
    </div>
    </div>
    
  )
}

export default ProductsForm