
import React,{useEffect, useState} from 'react';
import './App.css';
import AppRouter from '../src/AppRouter';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Switch, FormControlLabel ,ThemeProvider, makeStyles } from "@material-ui/core";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';



//import LoginTemp from './component/Logintemp';

export const light = {

  palette: {

  type: 'light',

  },

}

export const dark = {

  palette: {

  type: 'dark',

  },

}

const useStyles = makeStyles({
  togglebutton: {
    position:'absolute',
    left: 1280,
    top:90,
    zIndex:40,
  }
})

function App() {
  const classes = useStyles();
  const history = useHistory();
  const [theme, setTheme] = useState(true)
  const [appliedTheme,setAppliedTheme] = useState(createMuiTheme(dark))
  
  localStorage.setItem("theme",theme)
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
  const _appliedTheme = createMuiTheme(theme ? light : dark);
  
  //useEffect(()=>{
 //   setTheme(JSON.parse(localStorage.getItem("theme")));
 //   console.log("Theme bool from app.js: ",theme)
 //   setAppliedTheme(createMuiTheme(theme ? light : dark))
 // },[])

 const toggleChange=()=>{
   setTheme(!theme)
   localStorage.setItem("theme",theme)
 }
  
  return (
    
         <ThemeProvider theme={_appliedTheme}>
           {/*<IconButton
            color="inherit"
            aria-label="mode"
            onClick={toggleChange}>      
            {icon}
           </IconButton>*/}
          <IconButton className={classes.togglebutton}
            edge="end"
            color="inherit"
            aria-label="mode"
            onClick={toggleChange}
          >
            <Tooltip title="Toggle theme" fontSize='50px' arrow>
              {icon}
            </Tooltip>
          </IconButton>
             <div className="App">
              <Router>
                <AppRouter/>
              </Router>

              </div>

         </ThemeProvider>

    
    
  );
}

export default App;
