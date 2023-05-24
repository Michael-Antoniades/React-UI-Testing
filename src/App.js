import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import LandingPage from './LandingPage'

function App() {
  
  
  
  return (
    <>
    <Router>
    <Route path ="/" component = {LandingPage}/>
   </Router>
   </>

  );
}

export default App;
