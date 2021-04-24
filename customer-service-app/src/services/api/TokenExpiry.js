import React,{useState} from 'react';
import {  useHistory } from 'react-router-dom';
import SnackBar from'../../components/SnackBar'

export function CheckExpiry(props){
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
      }, 1000);      
      history.push("/");
    }
    return(
        <>
            <SnackBar notify={notify} setNotify={setNotify} />
        </>
    )
  }
