import React from 'react';
import SideMenu from "../../components/SideMenu";
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from "../../components/Header";
import EmpTicketList from "./EmpTicketList";

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

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.custviewMain}>
        <Header/>        
            <EmpTicketList/>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default CustomerView;