import React,{useState,useEffect}from 'react'
import {Link,Route,withRouter} from 'react-router-dom'
import Home from './Home'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import AccountDetail from './AccountDetail'
import swal from 'sweetalert'
import CustomerComponent from '../customerComponent/CustomerComponent'
import Products from '../productComponent/Products'
import BillContainer from '../billingComponent/BillContainer'
import BillGenerator from '../billingComponent/BillGenerator'
import ViewAll from '../billingComponent/ViewAll'

const NavigationBar = (props) => {
    const [toggle,setToggle]=useState(false)
    const handleAuth=()=>{
        setToggle(!toggle)
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            handleAuth();
        }
    },[])
  return (
 
    <div  style={{textAlign : 'center'}}> 
      <nav className="navbar" >
        <Link className="btn btn-warning"  to='/'>Home</Link>
       
        {
            toggle?
               (<React.Fragment >
                 <Link className="btn btn-warning" to='/account'>Account</Link>
                 <Link className="btn btn-warning" to='/customer'>Customer</Link>
                 <Link className="btn btn-warning" to='/products'>Products</Link>
                 <Link  className="btn btn-warning" to='/billing'>Billing</Link> 
                   <Link className="btn btn-warning" to='/logout' onClick={()=>{
                    const confirm=window.confirm('Are you sure?')
                    if(confirm){
                        localStorage.removeItem('token')
                        swal('successfully logged out')
                         handleAuth()
                         props.history.push('/')
                    }
                     
                    }}>Logout</Link>
                    </React.Fragment>
                  ):(
                  <>
                     <Link className="btn btn-warning" to='/register'>Register</Link>  
                     <Link  className="btn btn-warning" to='/login'>Login</Link> 
                    
                  </>    
                   )
            
         }
         </nav>
         
       <Route path='/' component={Home} exact={true}/>
        <Route path='/register' component={RegisterForm}/>
        <Route  path='/login'  render={(props)=>{
             return <LoginForm {...props} handleAuth={handleAuth} exact={true} />
          }}  />
        <Route path='/account' component={AccountDetail} exact={true}/>
        <Route path='/customer' component={CustomerComponent} exact={true}/> 
        <Route path='/products' component={Products} exact={true}/> 
        <Route  path='/billing' component={BillContainer} exact={true}/>    
        <Route   path ='/billing/:billId' component={BillGenerator}exact={true}/>
           <Route   path="/bills/all" component={ViewAll} exact/>      
    </div>
  )
}

export default withRouter( NavigationBar)