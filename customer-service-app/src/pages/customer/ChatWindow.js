import React from "react";
import { Box ,Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    messagebox:{
        margin:theme.spacing(4),        
    },
    messageleft:{
        backgroundColor:'lime',
        maxWidth:theme.spacing(20),
        textAlign:'left',
    },
    messageright:{
        backgroundColor:'lime',
        maxWidth:theme.spacing(-20),
        textAlign:'right',
    }
}));

const About = () => {
    const classes = useStyles();
    return(
        <div >
            <Box className={classes.messagebox} >
                <Typography className={classes.messageleft}> Message 1 </Typography>
            </Box>
            <Box className={classes.messagebox} >
                <p className={classes.messageright}> Message 2 </p>
            </Box>
            <Box className={classes.messagebox} >
                <p className={classes.messageleft}> Message 3 </p>
            </Box>
            <Box className={classes.messagebox}>
                <p className={classes.messageright}> Message 4 </p>
            </Box>
        </div>
        
    );
};

export default About;