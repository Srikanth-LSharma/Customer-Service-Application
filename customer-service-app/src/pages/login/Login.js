import React,{ useState }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Bg from '../../Assets/image.jpg'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link1 from '@material-ui/core/Link';
import {Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SnackBar from '../../components/SnackBar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import Client from '../../services/api/Client';
//import Signup from '../components/signup';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
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
    margin: theme.spacing(8, 4),
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
}));

const KEYS = {
  access_token: 'access_token',
  userName: 'userName',
  expiry:'expiry'
}

 function SignInSide(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
  const grant_type="password";
  
  
  const handleSubmit = (e) =>{ 
    e.preventDefault();
    
    const loginText = "username="+username+"&password="+password+"&grant_type="+grant_type;   
    axios.post("http://localhost:888/token",loginText).then(response =>{
            let expires = ".expires";
            console.log("Accepted input",response.data)
            console.log("Expiry date and time:",response.data[expires])
            let today = new Date();
            let token = response.data.access_token;
            console.log("Current Date and Time:",today.toGMTString());
            localStorage.setItem(KEYS.expiry,response.data[expires])
            localStorage.setItem(KEYS.access_token, token)
            localStorage.setItem(KEYS.userName, response.data.userName)
            Client.get("/api/userRoles").then(res=>
              {
                setRole(res.data);
                console.log("Role: ",role);           
              }).catch(e => {console.log(e)});
            setNotify({
              isOpen: true,
              message: "Login Successful",
              type: "success",
            })
            }).catch((e)=>
                 setNotify({
                  isOpen: true,
                  message: e.response.data.error_description,
                  type: "error",
            }));
    
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
            <Grid container>
              <Grid item xs>
                <Link1 href="/forgotPassword" variant="body2">
                  Forgot password?
                </Link1>
              </Grid>
              <Grid item>
                <Link to="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>          
        </div>
      </Grid>  
      <SnackBar notify={notify} setNotify={setNotify} />    
    </Grid>
  );
}

export default SignInSide;