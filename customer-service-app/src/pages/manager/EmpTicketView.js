import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import RateReviewTwoToneIcon from '@material-ui/icons/RateReviewTwoTone';
import EmpTicketList from "./EmpTicketList";
import PageHeader from "../../components/PageHeader";

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

function EmployeeView() {
  const classes = useStyles();

  return (
      <div className={classes.custviewMain}>
        {/*<Header/>*/}         
      <h1> {localStorage.getItem("role").toUpperCase()} PORTAL </h1>   
        <PageHeader
                title="Ticket List"
                subTitle="(Editable)"
                icon={<RateReviewTwoToneIcon fontSize="small" />}
            />
            <EmpTicketList/>
            
        <CssBaseline/>
      </div>
  );
}

export default EmployeeView;