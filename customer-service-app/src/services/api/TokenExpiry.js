import React,{useState} from 'react';
import {  useHistory } from 'react-router-dom';

export default function CheckExpiry(props){
    const expiry = localStorage.getItem("expiry");
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const history = useHistory();
    let today = new Date();
    let current = today.toGMTString();
    console.log("Current Date and Time from Client:",current);
    if(current>expiry){
      console.log("Token expired");
      setTimeout(() => {
        setNotify({
            isOpen: true,
            message: 'Session has expired please re-login to proceed',
            type: 'error'
        })
      }, 1500);      
      history.push("/");
    }
  }
