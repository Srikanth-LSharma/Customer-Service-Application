
import React from 'react';
import './App.css';
import AppRouter from '../src/AppRouter';
import { BrowserRouter as Router,withRouter, Switch, Route} from 'react-router-dom';
//import LoginTemp from './component/Logintemp';

function App() {
  return (
    <div className="App">

    <Router>
      <AppRouter/>
    </Router>
    
    </div>
  );
}

export default App;
