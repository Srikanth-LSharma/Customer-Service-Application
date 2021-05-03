import React from 'react';
import {CssBaseline} from '@material-ui/core';
import Bg from '../Assets/signupbg1.JPG'

import AboutText from './AboutText';

const sectionStyle = {
  backgroundImage: `url(${Bg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
  maxHeight: '100vh',
  paddingTop:'10px'
};

function OverviewCompany() {
  return(    
    <div style={ sectionStyle }>
      <section>
        <AboutText/>
      </section>
      <CssBaseline />
    </div>
  );
} 

export default OverviewCompany;