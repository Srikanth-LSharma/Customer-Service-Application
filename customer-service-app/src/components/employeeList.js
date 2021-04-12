import React from 'react';

const Employeelist = (props)=>{
    return (
    <div> 
        <p> I am {props.name} with a salary of {props.salary}</p> 
        <p>{props.children}</p>
    </div>
    )
};

export default Employeelist;