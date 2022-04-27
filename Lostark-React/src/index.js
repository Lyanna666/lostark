import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Calendario from './pages/Calendario';
import Login from './pages/Login';
import Principal from './pages/Principal';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Principal />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/calendario" element={<Calendario />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);
