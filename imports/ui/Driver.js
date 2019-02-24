import React, { Component } from 'react';
import Navbar from './../components/navbar.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Drivers } from '../api/drivers.js';
import { Button, Modal, Form, Table } from 'react-bootstrap';

// Task component - represents a single todo item
class Driver extends React.Component {
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
      identification: this.refs.identification.value,
      name: this.refs.name.value,
      age: this.refs.age.value,
      expirationDate: this.refs.expirationDate.value,
      available: document.getElementById("available").checked
    };
    console.log(_valToSave);
    Drivers.insert(_valToSave);
    this.setState({ show: false });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderDriverTable() {
    return this.props.drivers.map((driver) => (
      <tr key={driver._id}>
        <td>{driver.identification}</td>
        <td>{driver.name}</td>
        <td>{driver.age}</td>
        <td>{driver.expirationDate}</td>
        <td>{driver.available ? "Sí" : "No"}</td>
      </tr>
    ));
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    // const taskClassName = this.props.task.checked ? 'checked' : '';
 
    return (

      <div className="container">
        <Navbar />
        <Button variant="primary" onClick={this.handleShow}>
          Nuevo Conductor
        </Button>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Identidad</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Fecha Vencimiento Licencia</th>
              <th>Disponible</th>
            </tr>
          </thead>
          <tbody>
            {this.renderDriverTable()}
          </tbody>
        </Table>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Conductor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Identidad:</Form.Label>
                <Form.Control ref="identification" type="text" placeholder="Identidad" />
              </Form.Group>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control ref="name" type="text" placeholder="Nombre" />
              </Form.Group>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Edad:</Form.Label>
                <Form.Control ref="age" type="text" placeholder="Edad" />
              </Form.Group>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Fecha Vencimiento Licencia:</Form.Label>
                <Form.Control ref="expirationDate" type="text" placeholder="Fecha Vencimiento Licencia" />
              </Form.Group>
              <Form.Check type='checkbox' ref="available" id='available' label='Disponible'/>
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
    drivers: Drivers.find({}).fetch(),
  };
})(Driver);