import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    },
    primary: {
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        '&:hover': {
            backgroundColor: 'white',
            color: theme.palette.primary.dark,            
            transform: 'scale(1.02)'
        } 
    },
    resetbtn:{
        backgroundColor:"#ffffff",
        color: '#3330c9',
          '&:hover': {
            color:'#e01f33',
            backgroundColor:"#ffffff",
            transform: 'scale(1.1)',
      }
    }
}))

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            onClick={onClick}
            className={`${classes[color]}`}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}