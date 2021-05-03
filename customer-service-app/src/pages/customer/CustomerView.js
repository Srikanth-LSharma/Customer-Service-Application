import React, { useContext } from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import TicketList from "./TicketList";
import ThemeContext from '../../ThemeContext';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  custviewMain: {
    paddingLeft: '10px',
    paddingRigt: '10px',
    width: '100%'
  }
})

function CustomerView() {
  const classes = useStyles();
  const theme = useContext(ThemeContext);
  return (
      <div className={classes.custviewMain}>
            <TicketList/>            
        <CssBaseline />
      </div>
  );
}

export default CustomerView;