import React, { Component } from 'react';
import Navbar from './../components/navbar.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Containers } from '../api/containers.js';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import packer from "3d-bin-packing";
import samchon from  "samchon-framework";

// Task component - represents a single todo item
class Container extends React.Component {
   constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
    };
  }

  save() {
    console.log(this.refs.available)
    const _valToSave = {
      type: this.refs.type.value,
      name: this.refs.name.value,
      height: this.refs.height.value,
      width: this.refs.width.value,
      long: this.refs.long.value
    };
    console.log(_valToSave);
    Containers.insert(_valToSave);
    this.setState({ show: false });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderContainerTable() {
    return this.props.containers.map((container) => (
      <tr key={container._id}>
        <td>{container.type}</td>
        <td>{container.name}</td>
        <td>{container.height}</td>
        <td>{container.width}</td>
        <td>{container.long}</td>
      </tr>
    ));
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    // const taskClassName = this.props.task.checked ? 'checked' : '';
 
    return (

      <div className="container" onl>
        <Navbar />
        <Button variant="primary" onClick={this.handleShow}>
          Nuevo Contenedor
        </Button>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Disponible</th>
              <th>Alto</th>
              <th>Ancho</th>
              <th>Largo</th>
            </tr>
          </thead>
          <tbody>
            {this.renderContainerTable()}
          </tbody>
        </Table>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Contenedor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Tipo:</Form.Label>
                <Form.Control ref="type" type="text" placeholder="Tipo" />
              </Form.Group>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control ref="name" type="text" placeholder="Nombre" />
              </Form.Group>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Altura:</Form.Label>
                <Form.Control ref="height" type="text" placeholder="Altura" />
              </Form.Group>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Ancho:</Form.Label>
                <Form.Control ref="width" type="text" placeholder="Ancho" />
              </Form.Group>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Largo:</Form.Label>
                <Form.Control ref="long" type="text" placeholder="Largo" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit" onClick={this.save.bind(this)}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    containers: Containers.find({}).fetch(),
  };
})(Container);