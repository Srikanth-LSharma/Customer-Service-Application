import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CustomerTicketsList from '../pages/customer/TicketList';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon:{
    flexGrow:0.05,
    marginRight:10
  },
  appbar: {
    backgroundColor: '#3F51B5',
    color: 'white',
  },
  menuButton: {
    marginRight: theme.spacing(4),
    backgroundColor: '#3F51B5',    
    fontSize:14,
    fontWeight:'500',    
    flexGrow: 0.4,
    transition: 'transform easeIn 1s',
    color: 'white',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#3c52b2',
        transform: 'scale(1.1)',
  }  
},
buttonOnclick:{
  marginRight: theme.spacing(4),
    backgroundColor: '#fff',   
    color: '#3c52b2', 
    fontSize:14,
    fontWeight:'500',    
    flexGrow: 0.4,
    transition: 'transform easeIn 1s',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
      transform: 'scale(1.1)',
}  
},
  title: {
    flexGrow: 1,
  },
  username:{
    paddingRight:4,
    fontSize:14
  },
  logout: {
    color: 'white',
    transition: 'transform easeIn 1s',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
      transform: 'scale(1.1)',
    }
  }
}));




function Navigation(props) {
  const classes = useStyles();
  const role = localStorage.getItem("role");
  const history = useHistory();
  const [theme, setTheme]= useState(true);
  const location = useLocation();

  const toggleChange =()=>{
   setTheme(JSON.parse(localStorage.getItem("theme")));
   setTheme(!theme);
   localStorage.setItem("theme",theme);
   console.log(theme);
  }
  var icon = theme==false? <Brightness3Icon/> :  <Brightness7Icon/>

  useEffect(()=>{
    icon = theme==false? <Brightness3Icon/> :  <Brightness7Icon/>
  })

  const handleClick=path=>{
    console.log("logged out")
    localStorage.clear()
    history.push(path);
  }

  const Manager=()=>{
    return(
      <Button className = {location.pathname=="/Manager"? classes.buttonOnclick: classes.menuButton} component ={NavLink} to ="/Manager" > Manager Ticket List </Button>
    )
  }

  const Reviewer=()=>{
    return(
    <Button className = {location.pathname=="/Reviewer"? classes.buttonOnclick: classes.menuButton} component ={NavLink} to ="/Reviewer" > Reviewer Ticket List </Button>
    )  
  }

  const ServiceExec=()=>{
    return(
    <Button className = {location.pathname=="/ServiceExec"? classes.buttonOnclick: classes.menuButton} component ={NavLink} to ="/ServiceExec" > Service Ticket List </Button>
    )
  }

  const Customer=()=>{
    return(
      <Button className = {location.pathname=="/CustomerTickets"? classes.buttonOnclick: classes.menuButton} component ={NavLink} to ="/CustomerTickets" > Customer Ticket List </Button>
    )
  }

  
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Customer Service
          </Typography>        
          <Button className = {location.pathname=="/About"? classes.buttonOnclick: classes.menuButton} component ={NavLink} to ="/About" > About </Button >
          <Button className = {location.pathname=="/Contact"? classes.buttonOnclick: classes.menuButton} component ={NavLink} to ="/Contact" > Contact </Button >
          {
            role=="manager"? <Manager/>: role=="reviewer"? <Reviewer/> : role=="serviceexec"? <ServiceExec/> : role=="customer"? <Customer/>: null
          } 
           {/* <IconButton
            className={classes.icon}
            color="inherit"
            aria-label="mode"
            onClick={toggleChange}>      
            {icon}
           </IconButton> */}
          <div className={classes.username}> {localStorage.getItem("userName")} </div>
          <Button onClick={() => {handleClick('/');}} color="inherit" className={classes.logout}>
            <Tooltip title="Logout" fontSize='50px' arrow>
                <ExitToAppIcon />
            </Tooltip>
            </Button>
            
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;