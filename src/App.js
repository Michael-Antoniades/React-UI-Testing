import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './LandingPage'

function App() {
  
    return (
<Router>
    <Routes>
      <Route path="/" element={<LandingPage />}>
      </Route>
    </Routes>
  </Router>
    );
}

export default App;
