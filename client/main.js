import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom'; 
import ReactDOM from 'react-dom';
import Router from './../imports/router/Router.js';

import App from '../imports/ui/App.js';
 
Meteor.startup(() => {
  // render(<App />, document.getElementById('render-target'));
  ReactDOM.render(<Router/>, document.getElementById('render-target'));
});