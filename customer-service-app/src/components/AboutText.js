import React from 'react';
import { Box ,Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        color:'black',
        marginBottom: theme.spacing(5)
    },
    box: {
        marginLeft: '45%',
    },
    text:{
        color:'black',
        marginRight: theme.spacing(9),
        fontSize:22,
    },
    list:{
        paddingTop: theme.spacing(1),
        fontSize:26,
        color:'black',
    },
    features: {
        marginRight: theme.spacing(78),
        color:'black',
        fontSize:26,
    }
}));

export default function(){
    const classes = useStyles();
    return(
        <Box py= {12} className={classes.box} >
            <Typography variant='h2' className={classes.title}>About us</Typography>
            <Typography variant ='p' className={classes.text}> Helpdesk is a tool built to improve customer relationships .</Typography>
            
            <ul>
                <Typography variant ='p' className={classes.features}> Features </Typography>
                <li  className={classes.list}>
                    <Typography variant ='p' alignText='left' className={classes.text}> Customers can easily  raise tickets in case of a service request </Typography>
                </li>
                <li  className={classes.list}>
                    <Typography variant ='p' alignText='left' className={classes.text}> Requests will be processed based on the severity of the issue </Typography>
                </li>
                <li  className={classes.list}>
                    <Typography variant ='p' alignText='left' className={classes.text}> JWT authentication to provide role based access to the pages </Typography>
                </li>
                <li  className={classes.list}>
                    <Typography variant ='p' alignText='left' className={classes.text}> Chat window for customers to interact with Service Executives </Typography>
                </li>
                <li  className={classes.list}>
                    <Typography variant ='p' alignText='left' className={classes.text}> Managers have access metrics that are accurate to the minute </Typography>
                </li>
            </ul>
            
            
        </Box>
      );
} 