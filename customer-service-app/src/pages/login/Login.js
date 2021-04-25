import React,{ useEffect, useState }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Bg from '../../Assets/image.jpg'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link1 from '@material-ui/core/Link';
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SnackBar from '../../components/SnackBar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import useFullPageLoader from '../../components/useFullPageLoader'
import CircularProgress from "@material-ui/core/CircularProgress";
//import Signup from '../components/signup';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  rootLoad: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(10),
      },
    },
  image: {
    backgroundImage: 'url(' + Bg + ')',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(0, 4),
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  forgotpasstext: {
    float:'left',    
    color:'#4f65e2'
  },
  textright: {
    float:'right',
    color:'#4f65e2'
  }
}));

const KEYS = {
  access_token: 'access_token',
  userName: 'userName',
  expiry:'expiry',
  role:'role'
}

 function SignInSide(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const grant_type="password";
  
  useEffect(()=>{
     let token = localStorage.getItem("access_token");
     let _role = localStorage.getItem("role");
     if(token!=null){
       if(_role==="manager"){
         props.history.push('/Manager');
       }
       else if(_role==="reviewer"){
         props.history.push('/Reviewer');
       }
       else if(_role==="serviceexec"){
         props.history.push('/ServiceExec');
       }
       else if(_role==="customer"){
         props.history.push('/CustomerTickets');
       }
     }
    if(role==="manager"){
      console.log("manager test1")
      props.history.push('/Manager');
    }
    else if(role==="reviewer"){
      props.history.push('/Reviewer');
    }
    else if(role==="serviceexec"){
      props.history.push('/ServiceExec');
    }
    else if(role==="customer"){
      props.history.push('/CustomerTickets');
    }
  },[role])  



  const roleRedirectingURL=()=>([
    { id: 'manager', url: '/Manager' },
    { id: 'customer', url: '/Home' },
    { id: 'reviewer', url: '/Reviewer' },
    { id: 'serviceexec', url:'/ServiceExec'}
])
  
  const handleSubmit = (e) =>{ 
    e.preventDefault();
    showLoader();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    const loginText = "username="+username+"&password="+password+"&grant_type="+grant_type;   
    axios.post("http://localhost:888/token",loginText).then(response =>{
            hideLoader();
            let expires = ".expires";
            console.log("Accepted input",response.data)
            console.log("Expiry date and time:",response.data[expires])
            let today = new Date();
            let token = response.data.access_token;
            console.log("Current Date and Time:",today.toGMTString());
            localStorage.setItem(KEYS.expiry,response.data[expires]);
            localStorage.setItem(KEYS.access_token, token);
            localStorage.setItem(KEYS.userName, response.data.userName);
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
            const custdata={
              CustName: localStorage.getItem("Name")
            }
            console.log("Data to be passed to Add customer",custdata)
            axios.post("http://localhost:888/api/AddCustomer",custdata,config).then(res=>
            {
              console.log(res.data);
            }).catch(e => {console.log(e)})
            axios.get("http://localhost:888/api/userRoles",config).then(res=>
              {
                localStorage.setItem(KEYS.role,res.data);
                //window.location.reload(true);
                setRole(res.data);
                console.log("Role: ",res.data);              
             }).catch(e => {console.log(e)})
             .finally(() => {
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            });
            setNotify({
              isOpen: true,
              message: "Login Successful",
              type: "success",
            })
           // let urls=roleRedirectingURL();           
            }).catch((e)=>{
              hideLoader();
              setNotify({
                isOpen: true,
                message: e.response.data.error_description,
                type: "error",
          })
        }
    )
  }

  return (
    <Grid container component="main" className={classes.root}>      
     <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              //autoComplete="off"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}         
            >
              Sign In
            </Button>
                <Link1 href="/" variant="body2" className={classes.forgotpasstext}>
                  Forgot password?
                </Link1>
                <Link to="/Signup" variant="body2" className={classes.textright}>
                  {"Don't have an account? Sign Up"}
                </Link>
            <Box mt={5}>
            </Box>
          </form>          
        </div>         
          {loader}
      </Grid>  
      <SnackBar notify={notify} setNotify={setNotify} />    
    </Grid>
  );
}

export default SignInSide;