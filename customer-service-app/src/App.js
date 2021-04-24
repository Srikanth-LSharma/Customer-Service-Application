
import React from 'react';
import './App.css';
import AppRouter from '../src/AppRouter';
import { BrowserRouter as Router} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
//import LoginTemp from './component/Logintemp';

function App() {
  const history = useHistory();
  return (
    <div className="App">

    <Router>
      <AppRouter/>
    </Router>
    
    </div>
  );
}

export default App;
