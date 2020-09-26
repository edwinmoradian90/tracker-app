import React from 'react';
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
import Progress from './components/Progress/Progress';
import More from './components/More/More';
import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path='/trackers/:id' component={Tracker} />
          <Route exact path='/trackers' component={Trackers} />
          <Route exact path='/more' component={More} />
          <Route exact path='/progress' component={Progress} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route path='/' component={Home} />
        </Switch>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;