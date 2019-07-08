import React, { unstable_Profiler as Profiler } from 'react';
import ReactDOM from 'react-dom';
import { logProfiler } from './utils/logProfiler';
import './styles/main.scss';
import App from './App';

ReactDOM.render(
  <Profiler id="App" onRender={logProfiler}>
    <App />
  </Profiler>,
  document.getElementById('root')
);
