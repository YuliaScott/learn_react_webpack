import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import hexoimg from './images/hexo-deploy.png';

const testsizeimg = '/img/testsize.png';

ReactDOM.render(
    <>
        <div>Hello React!</div>
        <img src={hexoimg} />
        <img src={testsizeimg} />
        <App />
    </>,
    document.getElementById('webapp')
);