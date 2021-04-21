import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import ManagerTemplate from "./pages/manager/ManagerTemplate"
import Dashboard from './pages/manager/Dashboard';
import Customer from './pages/customer/CustomerView';
import ServiceExecView from './pages/serviceExec/ServiceExecView'
import EmpTicketView from './pages/manager/EmpTicketView'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest} render={
                (props) => {
                    //console.log("Is Authenticated",Auth.isAuthenticated())
                    if (localStorage.getItem("access_token")!=null) {
                        {/*if(Component=={ManagerTemplate}){
                            console.log("Manager template")
                        }
                        else{
                            console.log(" Not a Manager template")
                        }
                        if(Component=={ManagerTemplate} && localStorage.getItem("role")=="manager"){
                            console.log("manager authenticated")
                            //return <ManagerTemplate {...props}/>
                        }
                        else if(Component=={Customer} && localStorage.getItem("role")=="customer"){
                            console.log("customer authenticated")
                            //return <Customer {...props}/>
                        }
                        else if(Component=={EmpTicketView} && localStorage.getItem("role")=="reviewer"){
                            console.log("reviewer authenticated")
                            // return <EmpTicketView {...props}/>
                        }
                        else if(Component=={Dashboard} && localStorage.getItem("role")=="manager"){
                            console.log("manager authenticated")
                            //return <Dashboard {...props}/>
                        }
                        else if(Component=={ServiceExecView} && localStorage.getItem("role")=="serviceexec"){
                            console.log("serviceexec authenticated")
                            //return <ServiceExecView {...props}/>
                        }*/}
                        return <Component {...props} />
                    }
                    else {
                        return <Redirect to={
                            {
                                pathname: "/",                                
                                state: {
                                    from: props.location
                                }
                            }} />
                    }
                }

            }
        />
    )
}