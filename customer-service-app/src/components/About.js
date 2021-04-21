import React from "react";
import { Box ,Typography } from "@material-ui/core";
import BG from '../Assets/signupbg1.JPG'

var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${BG})`
  };

const About = () => {
    return(
        <div>
            <section style={ sectionStyle }>
            </section>
            <Box py= {20} textAlign = "center">
                <Typography variant = "h1"> About Page </Typography>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Box>
        </div>
        
    );
};

export default About;