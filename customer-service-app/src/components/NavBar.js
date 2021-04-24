import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CustomerTicketsList from '../pages/customer/TicketList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#e1e3f2',
    color: '#474f7e',
  },
  menuButton: {
    marginRight: theme.spacing(4),
    backgroundColor: '#e1e3f2',    
    fontSize:14,
    fontWeight:'500',    
    flexGrow: 0.4,
    transition: 'transform easeIn 1s',
    color: '#474f7e',
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
    color: '#474f7e',
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

  const handleClick=path=>{
    console.log("logged out")
    localStorage.clear()
    history.push(path);
  }

  const Manager=()=>{
    return(
      <Button className = {classes.menuButton} component ={NavLink} to ="/Manager" > Manager Ticket List </Button>
    )
  }

  const Reviewer=()=>{
    return(
    <Button className = {classes.menuButton} component ={NavLink} to ="/Reviewer" > Reviewer Ticket List </Button>
    )  
  }

  const ServiceExec=()=>{
    return(
    <Button className = {classes.menuButton} component ={NavLink} to ="/ServiceExec" > Service Ticket List </Button>
    )
  }

  const Customer=()=>{
    return(
      <Button className = {classes.menuButton} component ={NavLink} to ="/CustomerTickets" > Customer Ticket List </Button>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Customer Service
          </Typography>          
          <Button className = {classes.menuButton} component ={NavLink} to ="/About"> About </Button >
          <Button className = {classes.menuButton} component ={NavLink} to ="/Contact" > Contact </Button >
          {
            role=="manager"? <Manager/>: role=="reviewer"? <Reviewer/> : role=="serviceexec"? <ServiceExec/> : role=="customer"? <Customer/>: null
          }   
          <div className={classes.username}> {localStorage.getItem("userName")} </div>
          <Button onClick={() => {handleClick('/');}} color="inherit" className={classes.logout}><ExitToAppIcon/></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;