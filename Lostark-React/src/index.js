import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from './pages/Menu';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Principal from './pages/Principal';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Principal />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);
