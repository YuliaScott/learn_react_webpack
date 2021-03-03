import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import hexoimg from './images/hexo-deploy.png';

ReactDOM.render(
    <>
        <div>Hello React!</div>
        <img src={hexoimg} />
        <App />
    </>,
    document.getElementById('webapp')
);