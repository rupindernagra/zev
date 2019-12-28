import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import Homepage from './Public/Homepage';
// import PublicSpacesListing from './Public/PublicSpacesListing';
import PublicSpace from './Public/PublicSpace';
import Registration from './Registration/Registration';
import Admin from './Admin/Admin';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Dashboard/Dashboard';
import Spaces from './Dashboard/Dashboard';
import SpaceAdd from './Dashboard/Dashboard';
import SpaceSingle from './Dashboard/Dashboard';
import Applicants from './Dashboard/Dashboard';
import ApplicantSingle from './Dashboard/Dashboard';
import ForgotPassword from './Admin/ForgotPassword';
import ScrollForm from './Public/ScrollForm';
import PlaidComponent from './Public/PlaidComponent'


class App extends Component {
    render() {
      return  <Router>
                <Switch>
                  <Route exact path="/" component={Registration}/>
                  <Route path="/form" component={ScrollForm}/>
                  <Route path="/application/:spaceId" component={ScrollForm}/>
                  <Route path="/register" component={Registration}/>
                  <Route path="/login" component={Admin}/>
                  {/* <Route path="/home" component={Homepage}/>
                  <Route exact path="/spaces" component={PublicSpacesListing}/> */}
                  <Route path="/spaces/:spaceId" component={PublicSpace}/>
                  <Route path="/admin/dashboard" component={Dashboard}/>
                  <Route path="/admin/profile" component={Profile}/>
                  <Route exact path="/admin/spaces" component={Spaces}/>
                  <Route path="/admin/spaces/add" component={SpaceAdd}/>
                  <Route path="/admin/spaces/edit/:spaceId" component={SpaceAdd}/>
                  <Route path="/admin/spaces/view/:spaceId" component={SpaceSingle}/>
                  <Route exact path="/admin/applicants" component={Applicants}/>
                  <Route path="/admin/applicants/view/:applId" component={ApplicantSingle} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                  <Route path="/plaid" component={PlaidComponent} />
                  
                  {/* Default route when nothing else matches */}
                  <Route component={Admin} />
                </Switch>
              </Router>
    }
}

export default App;