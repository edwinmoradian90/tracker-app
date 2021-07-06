import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Trackers from './components/Trackers/Trackers';
import Tracker from './components/Tracker/Tracker';
import Progress from './components/Progress/Progress';
import More from './components/More/More';
import Navbar from './components/Navbar/Navbar';
import Error from './components/Error/Error';
import { AppContainer, RotateDevice } from './utils/styles/generalStyles';

function App() {
  return (
    <>
      <AppContainer className="app">
        <Router>
          <Switch>
            <Route exact path='/trackers/:id' component={Tracker} />
            <Route exact path='/trackers' component={Trackers} />
            <Route exact path='/more' component={More} />
            <Route exact path='/progress' component={Progress} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Home} />
            <Route path="/:anything" component={Error} />
          </Switch>
          <Navbar />
        </Router>
      </AppContainer>
      <RotateDevice>
        Landscape mode is not supported in this application.<br />
        Please rotate device to portrait mode.
      </RotateDevice>
    </>
  );
}

export default App;
