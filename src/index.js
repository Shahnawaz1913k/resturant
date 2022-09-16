import React from 'react';
import { BrowserRouter as Router  } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateProvider } from './context/StateProvider';
import { initialState } from './context/initialState';
import reducer  from './context/reducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Router>
      <StateProvider initialState={initialState} reducer = {reducer}>
    <App />
   </StateProvider>
    </Router>
 
);

