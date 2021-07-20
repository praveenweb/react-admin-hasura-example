import React from 'react';

// components
import Dashboard from './components/Dashboard';

// utils
import authProvider from './utils/authProvider';
import { auth0 } from "./utils/authProvider";

// browser history
import { createBrowserHistory as createHistory } from 'history';
const history = createHistory();

const App = () => { 
    return <div>Hello World!</div>
};
export default App;
