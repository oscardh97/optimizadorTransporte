import React, { Component } from 'react';
import Navbar from '../components/navbar.js';
import { Maps } from '../components/maps.js';

// Task component - represents a single todo item
class MapContainer extends React.Component {
   constructor(props, context) {
    super(props, context);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    // const taskClassName = this.props.task.checked ? 'checked' : '';
 
    return (

      <div className="container">
        <Navbar />
        <Maps></Maps>
      </div>
    );
  }
}

export default MapContainer;