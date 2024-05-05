import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { IconContext } from "react-icons";
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <IconContext.Provider value={{ size: "1.5em", className: "text-t_Light cursor-pointer"}}>
      <App />
    </IconContext.Provider>
  </React.StrictMode>
);