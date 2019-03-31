import React, { Component } from 'react';
import Navbar from './../components/navbar.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import * as THREE from 'three'
// Task component - represents a single todo item
class Packing extends React.Component {
   constructor(props, context) {
    super(props, context);
    var scene = new THREE.Scene();
    var camera = new THREE . PerspectiveCamera ( 75 , window . innerWidth / window . innerHeight , 0.1 , 1000 );
    var renderer = new THREE . WebGLRenderer ();
    renderer . setSize ( window . innerWidth , window . innerHeight );
    document . body . appendChild ( renderer . domElement );

    var geometry = new THREE . BoxGeometry ( 1 , 1 , 1 );
    var material = new THREE . MeshBasicMaterial ( { color : 0x00ff00 } );
    var cube = new THREE . Mesh ( geometry , material );
    scene . add ( cube );

    camera . position . z = 5 ;

    var render = function () {
    requestAnimationFrame ( render );

    cube . rotation . x += 0.1 ;
    cube . rotation . y += 0.1 ;

    renderer . render ( scene , camera );
    };

    render ();
  }



  render() {
 
    return (

      <div className="container">
        <Navbar />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    // customers: Packings.find({}).fetch(),
  };
})(Packing);