import React from 'react';

export const dateDisplay = () => {
       
    const date= new Date().toString();
    const index = date.lastIndexOf(':') +3;
    return(date.substring(0, index));
}
