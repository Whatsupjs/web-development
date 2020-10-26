/*********************************************************************************
* WEB422 – Assignment 4
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Junsup Lee Student ID: 155838162 Date: February 26, 2019
*
*
********************************************************************************/ 
import React, { Component } from 'react';
import Overview from './Overview';
import Projects from './Projects';
import Teams from './Teams';
import Employees from './Employees';
import NotFound from './NotFound';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Overview />
        )}/>

        <Route exact path='/projects' render={() => (
          <Projects />
        )}/>

        <Route exact path='/teams' render={() => (
          <Teams />
        )}/>

        <Route exact path='/employees' render={() => (
          <Employees />
        )}/>

        <Route render={() => (
          <NotFound />
        )}/>
      </Switch>
    );
  }
}

export default App;