import React from 'react';
import './App.css';
import AppRouter from '../src/AppRouter'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
    <AppRouter/>
    </div>
  );
}

export default App;
