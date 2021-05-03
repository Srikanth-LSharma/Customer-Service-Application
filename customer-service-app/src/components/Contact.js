import React from "react";
import { Box ,Typography } from "@material-ui/core";
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    email: {
        margin: theme.spacing(0),
        marginRight: theme.spacing(1),
        padding: theme.spacing(3)
    },
    address: {
        maxWidth:theme.spacing(40),
        wordWrap:'normal',
        marginLeft:'30%'
    },
}));

const Contact = () => {
    const classes = useStyles();
    return(
        <div>
            <Box py= {12} textAlign = "center">
                <Typography variant = "h3"> Contact Us </Typography>
                <Typography variant = "h6" className={classes.email}>Email enquiries : <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=helpdesk4customerservice@gmail.com"> helpdesk4customerservice@gmail.com</a> </Typography>
                <Typography variant = "h6"  className = {classes.address}> Address: 221b Baker St, London NW1 6XE, United Kingdom </Typography>
            </Box>
            <CssBaseline />
        </div>
        
    );
};

export default Contact;