import React from 'react';
import './App.css';
import NavigationBar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Vigenere from './pages/vigenere';
import AutoVigenere from './pages/auto-key-vigenere';
import ExtVigenere from './pages/ext-vigenere';
import Affine from './pages/affine';
import Playfair from './pages/playfair';
import Hill from './pages/hill';

function App() {
  return (
    <Router>
    <NavigationBar />
    <Routes>
        <Route path='/' element={<Navigate to="/vigenere" />} />
        <Route path='/vigenere' element={<Vigenere />} />
        <Route path='/auto-key-vigenere' element={<AutoVigenere/>} />
        <Route path='/ext-vigenere' element={<ExtVigenere/>} />
        <Route path='/affine' element={<Affine/>} />
        <Route path='/playfair' element={<Playfair/>} />
        <Route path='/hill' element={<Hill/>} />
    </Routes>
    </Router>
  );
}

export default App;
