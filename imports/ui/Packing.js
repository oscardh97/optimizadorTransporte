import React, { Component } from 'react';
import Navbar from './../components/navbar.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import * as THREE from 'three';
import packer from "3d-bin-packing";
import samchon from  "samchon-framework";
// Task component - represents a single todo item
class Packing extends React.Component {
 constructor(props, context) {
  super(props, context);
  ///////////////////////////
    // CONSTRUCT OBJECTS
    ///////////////////////////
    let wrapperArray: packer.WrapperArray = new packer.WrapperArray();
    let instanceArray: packer.InstanceArray = new packer.InstanceArray();
 
    // Wrappers
    wrapperArray.push
    (
        new packer.Wrapper("Large", 1000, 40, 40, 15, 0)
    );
 
    ///////
    // Each Instance is repeated #15
    ///////
    instanceArray.insert(instanceArray.end(), 1, new packer.Product("Eraser", 1, 2, 5));
    instanceArray.insert(instanceArray.end(), 1, new packer.Product("Book", 15, 30, 3));
    instanceArray.insert(instanceArray.end(), 1, new packer.Product("Drink", 3, 3, 10));
    instanceArray.insert(instanceArray.end(), 1, new packer.Product("Umbrella", 5, 5, 20));
 
 
    ///////////////////////////
    // BEGINS PACKING
    ///////////////////////////
    // CONSTRUCT PACKER
    let my_packer: packer.Packer = new packer.Packer(wrapperArray, instanceArray);
 
    ///////
    // PACK (OPTIMIZE)
    let result: packer.WrapperArray = my_packer.optimize();
    ///////
    this.state = {
      containers: result
    };
    console.log(result);
    ///////////////////////////
    // TRACE PACKING RESULT
    ///////////////////////////
    // let xml: samchon.library.XML = result.toXML();
    
    // console.log(xml.toString());
  }
  componentDidMount(){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera (75,window.innerWidth/window.innerHeight,0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  var container = document.getElementsByClassName('container');
  container[0].appendChild(renderer.domElement);
  console.log(this.state.containers);

  this.state.containers.data_[0].matrix_.forEach(function (post) {
    // ...
    post.forEach(function (box) {
      console.log(box)
      // var geometry = new THREE.BoxGeometry(box.wrapper.width, box.wrapper.height , box.wrapper.length);
      var geometry = new THREE.BoxGeometry(box.wrapper.width, box.wrapper.height , box.wrapper.length);
      var material = new THREE.MeshBasicMaterial({ color: '#'+Math.floor(Math.random()*16777215).toString(16)});
      var cube = new THREE.Mesh(geometry , material);
      cube.position.set(box.x, box.y, box.z);
      scene.add(cube);
      // cube.rotation.x = 0.5;
      cube.rotation.y = 0.1;
    });
  });


  // var geometry = new THREE.BoxGeometry(1 ,1 , 1);
  // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe   : true});
  // var cube = new THREE.Mesh(geometry , material);
  // cube.position.set(0, 0, 0);
  // scene.add(cube);
  // var geometry2 = new THREE.BoxGeometry(1 ,1 , 1);
  // var material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00,wireframe   : true});
  // var cube2 = new THREE.Mesh(geometry2 , material2);
  // cube2.position.set(1, 1, 0);
  // scene.add(cube2);

  camera.position.z = 200;
  // camera.position.y = 50;

  var render = function () {
    requestAnimationFrame(render);


    renderer.render(scene ,camera);
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