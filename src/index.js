import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';

// Mounting the main react component in the DOM
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
