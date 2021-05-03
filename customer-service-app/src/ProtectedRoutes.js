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