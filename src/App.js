import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Registration from './Registration/Registration';
import Admin from './Admin/Admin';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Dashboard/Dashboard';
import Spaces from './Dashboard/Dashboard';
import Applicants from './Dashboard/Dashboard';
import ForgotPassword from './Admin/ForgotPassword';
import SpaceAdd from './Dashboard/Dashboard';

class App extends Component{
    render() {
      return  <Router>
                <Switch>
                  <Route exact path="/" component={Registration}/>
                  <Route path="/admin" component={Admin}/>
                  <Route path="/dashboard" component={Dashboard}/>
                  <Route path="/profile" component={Profile}/>
                  <Route path="/spaces" component={Spaces}/>
                  <Route path="/spaces_add" component={SpaceAdd}/>
                  <Route path="/applicants" component={Applicants}/>
                  <Route path="/forgot-password" component={ForgotPassword} />
                </Switch>
              </Router>
    }
}

export default App;