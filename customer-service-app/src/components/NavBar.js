import React from 'react';
import {Typography, AppBar, Toolbar ,Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {NavLink} from "react-router-dom";
import { Grid } from '@material-ui/core';


const useStyles = makeStyles({
    flexGrow: {
      flex: '1',
    },
    button: {
      backgroundColor: '#3c52b2',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#3c52b2',
    },
  }})

const Navbar =()=>{
    const classes = useStyles()
    return(
        <AppBar position="static">
            <Toolbar>
                <Grid justify="space-between" container spacing={24}>
                    <Grid item>
                        <Typography variant="h6"> 
                            Customer Service Application 
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button className = {classes.button} component ={NavLink} to ="/Home"> Home </Button >
                        <Button className = {classes.button} component ={NavLink} to ="/About"> About </Button >
                        <Button className = {classes.button} component ={NavLink} to ="/Contact"> Contact </Button >
                    </Grid>
                    <Grid>
                    <Button className = {classes.button} component ={NavLink} to ="/Login" > Login </Button >
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
  );
}

export default Navbar;