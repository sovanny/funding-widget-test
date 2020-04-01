import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Widget from './Widget';
ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <h1>Fundraising widget (frontend exercise)</h1>
      <h2>The fundraising widget</h2>
      <Widget />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
