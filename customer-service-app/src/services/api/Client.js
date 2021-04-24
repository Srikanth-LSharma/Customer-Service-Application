import axios from "axios";
import { useHistory } from 'react-router-dom';
import {CheckExpiry} from './TokenExpiry'

const Client = axios.create({
  baseURL: 'http://localhost:888',
});


{/*function CheckExpiry(props){
  const expiry = localStorage.getItem("expiry");
  const history = useHistory();
  let today = new Date();
  let current = today.toGMTString();
  console.log("Current Date and Time from Client:",current);
  if(current>expiry){
    console.log("Token expired");
    history.push("/");
    //alert("Token expired please login to continue");
  }
}*/}

Client.interceptors.request.use(
  config => {
      config.headers.authorization= `Bearer ${localStorage.getItem('access_token')}`;
    return config;
  },
  (error) => Promise.reject(error)
);

Client.interceptors.response.use(
  (response) =>  {
    <CheckExpiry/>
    //console.log("test interceptor response:",response)
    //if(response.status === 401) {
      //
      
      //RedirectToLogin();
   // }
     
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default Client;