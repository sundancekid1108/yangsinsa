import React from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom'
import Router from './router/router.js';

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>


  );
}

export default App;
