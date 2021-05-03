import React,{ useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Bg from '../../Assets/signupbg1.JPG'
//import Link from '@material-ui/core/Link';
import {Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useFullPageLoader from '../../components/useFullPageLoader'
import SnackBar from '../../components/SnackBar';
import axios from 'axios';
//import Login from '../components/login'


const sectionStyle = {
  backgroundImage: `url(${Bg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100vw',
  height: '100vh',
  paddingTop:'10px'
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
  },
  gridbtn:{
    paddingRight: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  signupbtn:{
    margin: theme.spacing(3, 2, 2),
    backgroundColor:"#ffffff",
    color: '#3330c9',
      '&:hover': {
        color:'#ffffff',
        transform: 'scale(1.1)',
  }
  },
  loadericon:{
    position:'absolute',
    top:'50%',
    right:'45%',
},
  resetbtn:{
    margin: theme.spacing(3, 2, 2),
    backgroundColor:"#ffffff",
    color: '#3330c9',
      '&:hover': {
        color:'#e01f33',
        backgroundColor:"#ffffff",
        transform: 'scale(1.1)',
  }
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState(''); 
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

  const user={
    Email: email,
    Password: password,
    ConfirmPassword: confirmpassword
  }
  const history = useHistory();
  const reset=()=>{
    setUsername("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
    setNotify({
        isOpen: true,
        message: "Form Reset",
        type: "info"
        })  
        {/*setTimeout(() => {
          showLoader();
          setNotify({
            isOpen: true,
            message: "Please login to continue",
            type: "info"
         })
        }, 3000);
        setTimeout(() => {
          history.push('/');
        }, 6000); */} 
  }
  const registerUser = (e) =>{
    e.preventDefault();
    showLoader();
    console.log("Testing API Successful")    
    axios.post("http://localhost:888/api/Account/Register",user).then(res=>{
        hideLoader();
        console.log("test",res.data);
        localStorage.setItem("Name",username);     
        reset(); 
        setNotify({
        isOpen: true,
        message: "Successfully Registered",
        type: "success"
        })
        setTimeout(() => {
          showLoader();
          setNotify({
            isOpen: true,
            message: "Please login to continue",
            type: "info"
         })
        }, 3000);
        setTimeout(() => {
          history.push('/');
        }, 6000);
    }).catch((e)=>{
      hideLoader();
      setNotify({
        isOpen: true,
        message: e.response.request.response.split(':')[3].split('"')[1],
        type: "error",
       // for common one --> e.response.request.response.split(':')[3].split('"')[1]
       // for passwords do not match use this -->e.response.request.response.split(',')[1].split(':')[2].slice(2,-4)
       // for username already taken use this --> e.response.request.response.split(':')[3].split(',')[1].slice(1,-4)
  })
    }
        
  );  
}
  return (
      <div style={ sectionStyle }> 
        <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className={classes.form} onSubmit={registerUser} onReset={reset}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    autoComplete="off"
                    name="fullName"
                    variant="outlined"
                    required
                    fullWidth
                    id="fullName"
                    label="Name"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoFocus
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    autoComplete="off"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
                    value={confirmpassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    autoComplete="current-password"
                />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I agree to the terms and conditions."
                />
                </Grid>
            </Grid>
            <Grid container>
            <Grid item xs ={5} className={classes.gridbtn}>
                <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                className={classes.signupbtn}
            >
                Sign Up
            </Button>
            </Grid>
            <Grid item xs ={5} className={classes.gridbtn} >
             <Button
                type="reset"
                variant="contained"
                fullWidth
                color="primary"
                className={classes.resetbtn}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
            
           
            <Grid container justify="flex-end">
                <Grid item>
                <Link to="/" variant="body2">
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={3}>
        </Box>
        </Container>
        <SnackBar notify={notify} setNotify={setNotify} />
        <div className={classes.loadericon}>
                         {loader}
        </div>
      </div>
  );
}