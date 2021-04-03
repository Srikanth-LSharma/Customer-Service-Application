
import React from 'react';
import './App.css';
import AppRouter from '../src/AppRouter'  
//import Employeelist from './components/employeeList';
//import Login from '../src/components/login'

function App() {
  return (
    <div className="App">
      {/*<Employeelist name="Srikanth" salary="35150"/>
      <Employeelist name="Hari" salary="55150"/>
      <Employeelist name= "Vishnu" salary ="29999"> My hobbies are playing cricket </Employeelist>
  */}
    <AppRouter/>
    </div>
  );
}

export default App;
