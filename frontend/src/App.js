import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Trackers from './components/Trackers/Trackers';
import Tracker from './components/Tracker/Tracker';
import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/trackers/:id' component={Tracker} />
        <Route exact path='/trackers' component={Trackers} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route path='/' component={Home} />
      </Switch>
      <Navbar />
    </Router>
  );
}

export default App;
