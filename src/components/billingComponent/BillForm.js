import React , {useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { startPostBill } from '../../action/billAction'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'


const BillForm = (props) => {
  const history = useHistory()
   
     const [formFields , setFormFields] = useState([
         { product : '' ,   quantity : ''} 
     ])
     
    const cusId = useSelector((state)=>{
        return    state.customer
         
   })
   //console.log("cusId" , cusId)


    const prodId = useSelector((state)=>{
         return   state.product
    })

    const dispatch = useDispatch()
    const redirect =(billId)=>{
      history.push(`/billing/${billId}`)
    }

    const registerSchema=yup.object().shape({
      date:yup.string()
      .required('Required!!'),
      customer:yup.string()
      .required('customer name required!!')
  })

   const formik = useFormik({
        initialValues : {
             date : '',
             customer : ''
             
        },
        onSubmit : (formData )=>{
          dispatch(startPostBill({...formData,lineItems:formFields},redirect))    
        },
        validationSchema:registerSchema,
        validateOnChange:false,
     })
     const handleFormChange=(event , index)=>{
            event.preventDefault()
          let data = [...formFields]
          data[index][event.target.name] = event.target.value 
           setFormFields(data)
       }

        const addFields=()=>{
              let object = {
                 product : '',
                  quantity : ''
              }
            setFormFields([...formFields,object])
        }
       // console.log(formFields)

        const removeItems=(index)=>{
           let data=[...formFields]
           data.splice(index,1)
           setFormFields(data)
        }
       
return (
  <div className='container card p-4 register-container'>
      
      <form  onSubmit={formik.handleSubmit}  >

        <div className='form-group'>
        <label>Date:</label> 
        <input type='date' className='form-control' value={formik.values.date} name='date' onChange={formik.handleChange} /> 
         <div>{formik.errors.date}</div><br/>
         </div>

         <div className='form-group'>
        <label>Customer</label> 
       <select className='form-control' onChange={formik.handleChange} name='customer' id='customer'>
        <option  >Select Customer Name</option>
        
          {cusId.map((ele, i)=>{
              return <option  value={ele._id} key={i}>{ele.name}</option>
          })}
       </select><div>{formik.errors.customer}</div><br/>
       </div>
         
         <div className='form-group'>
           {/* Dynamic form input  */}

           {formFields.map((form,index)=>{
              return (
                <div key={index}>
                <select  className='form-control' name='product'  onChange={event=> handleFormChange(event , index)}>
                    <option value=''> Products</option>
                   {prodId.map((ele ,i)=>{
                    //  console.log(ele._id)
                     return <option key={ele._id} value={ele._id}>{ele.name}</option>
                   })}
                </select> 
   
                <input className='form-control' name='quantity' placeholder='quantity'
                onChange={event=> handleFormChange(event , index)} value={form.quantity}/> 

                {formFields.length > 1 &&  < button type='button' className="btn btn-danger btn-sm"
                 onClick={()=>{removeItems(index)}}>Delete</button>}
               </div>
               
             )
             })}
             
            <button type='button' className="btn btn-info btn-sm button" onClick={addFields} >Add More Products</button>
         </div>
             <input type='submit'  className='btn btn-primary btn-sm button1' value='Generate Bill' />
       </form>
     
         
       
  </div>
)
}


export default BillForm