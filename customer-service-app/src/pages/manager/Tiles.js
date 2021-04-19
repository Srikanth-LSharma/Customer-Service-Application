import React,{ useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Autorenew, ViewColumnTwoTone } from '@material-ui/icons';
import {dateDisplay} from '../../components/controls/Datedisplay';
import Client from '../../services/api/Client'

function preventDefault(event) {
  event.preventDefault();
}



const useStyles = makeStyles({
  depositContext: {
    flex: 1,
    paddingTop:35,
  },
  inputContext: {
    flex: 1,
    paddingLeft:10,
  },
  asOfContext:{
    flex: 1,
    paddingTop:20,
  },
  formControl: {
    maxWidth:110,
  },
});

export function EmployeeCount(props) {
  const classes = useStyles();
  const [empcount, setEmpCount] = useState('');

  useEffect(()=>{
    Client.get("/api/Manager/EmployeesCount").then(res=>{
        setEmpCount(res.data);
        window.localStorage.setItem('empcount', res.data);
    }).catch((e)=>{
        console.log(e)
    });
    });
  
  return (
    <React.Fragment>
      <Title> Employees </Title>
      <Typography component="p" variant="h4" className={classes.depositContext}>
        {empcount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        as of {dateDisplay()}
      </Typography>
    </React.Fragment>
  );
}

export function CustomerCount(props) {
  const classes = useStyles();
  const [custcount, setCustCount] = useState('');

  useEffect(()=>{
    Client.get("/api/Manager/CustomerCount").then(res=>{
        setCustCount(res.data);
    }).catch((e)=>{
        console.log(e)
    });
    });

  return (
    <React.Fragment>
      <Title> Customers </Title>
      <Typography component="p" variant="h4" className={classes.depositContext}>
        {custcount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
          as of {dateDisplay()}
      </Typography>
    </React.Fragment>
  );
}

export function OpenTickets(props) {
  const classes = useStyles();
  const [otcount, setOTCount] = useState('');

  useEffect(()=>{
    Client.get("/api/Manager/OpenTickets").then(res=>{
        setOTCount(res.data);
    }).catch((e)=>{
        console.log(e)
    });
    });

  return (
    <React.Fragment>
      <Title> Open Tickets </Title>
      <Typography component="p" variant="h4" className={classes.depositContext}>
        {otcount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
          as of {dateDisplay()}
      </Typography>
    </React.Fragment>
  );
}


export function EmployeeTicketCount(props) {
  const classes = useStyles();
  const [etcount, setETCount] = useState('');
  const [empID, setEmpID] = useState('');

  const handleChange = e=> setEmpID(e.target.value);

    const empCount=window.localStorage.getItem('empcount');
    const createElements = () => {
      const elements = [];
      for (var i=1; i <= empCount; i++) {
        elements.push(<MenuItem value={i}> {i} </MenuItem>)
      } 
      return elements;
    }
    
  useEffect(()=>{
    const url='/api/Manager/EmployeeTicketCount?id='+empID;
    Client.get(url).then(res=>{
        setETCount(res.data);
    }).catch((e)=>{
        console.log(e)
    });
    });
    

  return (
    <React.Fragment>
      <Title> Service Executive Ticket Count </Title>
        <FormControl className={classes.formControl}>
          <InputLabel> Employee ID </InputLabel>
          <Select onChange ={handleChange}> 
              {createElements()}
          </Select>
        </FormControl>              
      
      <Typography component="p" variant="h4" className={classes.inputContext}>
          {etcount}
        </Typography> 
             
      <Typography color="textSecondary" className={classes.asOfContext}>
          as of {dateDisplay()}
      </Typography>
    </React.Fragment>
  );
}