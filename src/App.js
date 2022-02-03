import React, {useState, useEffect} from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './components/layout/Dashboard';
import NavBar from './components/layout/NavBar';
import Pokemon from './components/pokemon/Pokemon';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


function App() {

  
  return (
    <Router>
      <div className='App'>
        <NavBar /> 
        <div className='container'>
          <Routes>
              <Route path ='/' element={<Dashboard />} />           
              <Route path ='/pokemon/:pokemonIndex' element={<Pokemon />} />
          </Routes>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
