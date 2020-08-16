import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import router from 'router';
import './App.css';


function App() {
  return (
    <BrowserRouter>
        { router }
        <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
