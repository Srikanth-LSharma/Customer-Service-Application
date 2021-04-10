import React, {Component} from 'react'; 
import { BrowserRouter as Router, withRouter, Switch, Route} from 'react-router-dom';  
//import AddEmployee from '../src/components/AddEmployee';  
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/NavBar';
import Dashboard from './pages/manager/Dashboard';
import { PinDropSharp } from '@material-ui/icons';


const LoginContainer = () => (
    <div>
      <Route exact path="/Login" component={Login} />      
      <Route exact path="/Signup" component={Signup}/> 
    </div>
  )
  
   const DefaultContainer = () => (
      <div>
        <Route path= '/Home' component ={Home}/>
        <Route path= '/About' component ={About}/>
        <Route path= '/Contact' component ={Contact}/>
        <Route path= '/Dashboard' component ={Dashboard}/>
      </div>
   )

const AppRouter = (props)=>  {
    console.log(props)
         return(
                <Switch>
                    <div className="App-Router">
                    {
                        props.location.pathname!=='/Login' && props.location.pathname!=='/Signup' && props.location.pathname!=='/Dashboard'? <Navbar/>:null
                    }
                        <Route exact component={LoginContainer}/> 
                        <Route exact component={DefaultContainer}/>     
                    </div>
                </Switch>
        )
    }

export default withRouter(AppRouter);