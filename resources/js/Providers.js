import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';

function Providers() {
    return (
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    );
} 

export default Providers;

if (document.getElementById('root')) {
    ReactDOM.render(<Providers />, document.getElementById('root'));
}
