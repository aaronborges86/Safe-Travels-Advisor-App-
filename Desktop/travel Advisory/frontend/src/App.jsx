import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import Rankings from './pages/Rankings';
import Compare from './pages/Compare';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<CountryDetails />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </Router>
  );
}

export default App;
