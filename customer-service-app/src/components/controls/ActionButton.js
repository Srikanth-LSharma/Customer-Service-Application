import React from 'react'
import { Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        }
    },
    primary: {
        backgroundColor: '#4975d2',
        color: 'white',
        '&:hover': {
            backgroundColor: 'white',
            color: '#4975d2',
            transform: 'scale(1.02)'
        }
       
    },
    close:{
        color:'white',
        backgroundColor:'red',
        border: '1px solid red',
        '&:hover': {
            backgroundColor: 'white',
            color: 'red',
            transform: 'scale(1.02)'
        }
    },    
}))

export default function ActionButton(props) {

    const { color, children, onClick } = props;
    const classes = useStyles();

    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}>
            {children}
        </Button>
    )
}