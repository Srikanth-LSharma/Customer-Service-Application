import React from 'react'; 
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';  
//import AddEmployee from '../src/components/AddEmployee';  
import Login from '../src/components/login';
import Signup from '../src/components/signup';
const AppRouter = () => {
    return(
        <Router>      
                <Switch>  
                        <Route path='/Login' component={Login} /> 
                        <Route path='/Signup' component={Signup} /> 
                        {/*<Route exact path='/' component={Home} /> 
                        <Route path='/AddEmployee' component={AddEmployee} />  
                        <Route path='/edit/:id' component={EditEmployee} />  
                        <Route path='/Employeelist' component={Employeelist} />
                        <Route path='/PersonalInfo' component={PersonalInfo} />  
                        <Route path='/Thanks' component={Thanks} /> 
                        <Route path='/Education' component={Education} /> 
                        <Route path='/UserHome' component={UserHome} /> 
                        <Route path='/Employment' component={Employment} /> 
                        <Route path='/view/:id' component={View}/>
                        <Route path='/WebCamera' component={Camera}/>*/}
                </Switch>  
        </Router>  
    )
}

export default AppRouter;