import 'bootstrap/dist/css/bootstrap.css';
import './styles/custom.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Home from './modules/Home.js';
import About from './modules/About.js';
import TasksBoard from './modules/TasksBoard.js';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="/Home" component={Home}/>
        <Route path="/About" component={About}/>
        <Route path="/TasksBoard" component={TasksBoard}/>
    </Router>
    , document.getElementById('root'));