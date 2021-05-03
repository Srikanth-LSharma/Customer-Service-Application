import React,{useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useLocation } from 'react-router-dom'
import { mainListItems} from './ListItems';
import EmpTicketView from "./EmpTicketView";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import {NavLink , useHistory} from "react-router-dom";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Tooltip from '@material-ui/core/Tooltip';
import logo from '../../Assets/applogo1.png'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',  
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: '#3F51B5',
    color: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  icon:{
    flexGrow:0.05,
    marginRight:10
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
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
  listButton: {
    marginRight: 36,
  }
,
  title: {
    flexGrow: 0.2,
    fontSize: 35,
    paddingTop:4,    
    marginRight:134,
    fontFamily: 'Bebas Neue',
  },
  username:{
    paddingRight:10,
    fontSize:14,
    marginLeft: 24
  },
  logout: {
    color: 'white',
    transition: 'transform easeIn 1s',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
      transform: 'scale(1.1)',
    }
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 60,
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick=path=>{
    console.log("logged out")
    localStorage.clear()
    history.push(path);
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.listButton, open && classes.menuButtonHidden)}
          >
            <Tooltip title="More Features" fontSize='50px' arrow>
                
               <MenuIcon />
            </Tooltip>
          </IconButton>
          <img src={logo} alt="Logo" className={classes. logo} />   
          <Typography variant="h6" className={classes.title}>
            Help Desk
          </Typography>     
          <Button className = {location.pathname=="/About"? classes.buttonOnclick: classes.menuButton} component ={NavLink} to ="/About"> About </Button >
          <Button className = {location.pathname=="/Contact"? classes.buttonOnclick: classes.menuButton} component ={NavLink} to ="/Contact"> Contact </Button >
          <Button className = {location.pathname=="/Manager"? classes.buttonOnclick: classes.menuButton} component ={NavLink} to ="/Manager"> Manager Ticket List </Button >
          {/* <IconButton
            className={classes.icon}
            color="inherit"
            aria-label="mode"
            onClick={toggleChange}>      
            {icon}
          </IconButton>  */}
          <div className={classes.username}> {localStorage.getItem("userName")} </div>
          <Button onClick={() => {handleClick('/');}} color="inherit" className={classes.logout}>
          <Tooltip title="Logout" fontSize='50px' arrow>
                <ExitToAppIcon />
            </Tooltip>
          </Button>   
          </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <EmpTicketView/>
    </div>
  );
}