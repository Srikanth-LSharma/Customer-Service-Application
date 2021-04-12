import React from "react";
import { Box ,Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import axios from 'axios';


const Home = () => {  
    
    const handleClick = () =>{
        console.log("test");
    }

    const user={
        Email: "dhinesh1@gmail.com",
        Password: "Password#1234",
        ConfirmPassword: "Password#1234"
      }

    const registerUser = () =>{
        axios.post("https://localhost:44353/api/Account/Register",user).then(res=>{
            console.log("test",res.data);
           
        }).catch(e => {console.log(e)});

        
    }
     
    const getCustomers=()=>{
        axios.get("https://localhost:44353/api/Employees").then(res=>{
            console.log(res.data);
        }).catch((e)=>{
            console.log(e)
        });
        
    }
    const getEmployeeCount=()=>{
        axios.get("https://localhost:44353/api/Manager/EmployeesCount").then(res=>{
            console.log(res.data);
        }).catch((e)=>{
            console.log(e)
        });
        
    }
    const params = {
        grant_type: 'password',
        username: 'customer2',
        password: 'Password#123'
      };

      const data = Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

    const handleSubmit = () =>{ 
        
        axios.post("https://localhost:44353/token","username=dhinesh1@gmail.com&password=Password#1234&grant_type=password").then(response =>{
                console.log("Accepted input",response.data)
                    }).catch((e)=>console.log(e))
    }

    return(
        <div>
            <Box py= {20} textAlign = "center">
                <Typography variant = "h1"> Home Page </Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick ={handleSubmit}
            >
              Get Employees
            </Button>
        </div>
        
    );
};

export default Home;