import React from 'react'; 
import { withRouter, Switch, Route} from 'react-router-dom';  
//import AddEmployee from '../src/components/AddEmployee';  
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/NavBar';
import Dashboard from './pages/manager/Dashboard';
import Customer from './pages/customer/CustomerView';
import ManagerTemplate from './pages/manager/ManagerTemplate';
import ServiceExecView from './pages/serviceExec/ServiceExecView'
import EmpTicketView from './pages/manager/EmpTicketView'
import {ProtectedRoute} from './ProtectedRoutes';



const LoginContainer = () => (
    <div>
      <Route exact path="/" component={Login} />      
      <Route exact path="/Signup" component={Signup}/> 
    </div>
  )
  
   const DefaultContainer = () => (
      <div>
        <ProtectedRoute exact path = '/Home' component ={Home}/>
        <ProtectedRoute exact path = '/About' component ={About}/>
        <ProtectedRoute exact path = '/Contact' component ={Contact}/>
        <ProtectedRoute exact path = '/Dashboard' component ={Dashboard}/>
        <ProtectedRoute exact path = '/CustomerTickets' component ={Customer}/>
        <ProtectedRoute exact path = '/Manager' component ={ManagerTemplate}/>
        <ProtectedRoute exact path = '/ServiceExec' component ={ServiceExecView}/>
        <ProtectedRoute exact path = '/Reviewer' component ={EmpTicketView}/>
      </div>
   )

const AppRouter = (props)=>  {
         return(
                <Switch>
                    <div className="App-Router">
                    {
                        props.location.pathname!=='/' && props.location.pathname!=='/Signup' && props.location.pathname!=='/Dashboard'  && props.location.pathname!=='/Manager'? <Navbar/>:null
                    }
                        <Route exact component={LoginContainer}/> 
                        
                        <Route exact component={DefaultContainer}/>     
                    </div>
                </Switch>
        )
    }

export default withRouter(AppRouter);
