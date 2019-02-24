import React, { Component } from 'react';
import Navbar from './../components/navbar.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Trucks } from '../api/trucks.js';
import { Button, Modal, Form, Table } from 'react-bootstrap';

// Task component - represents a single todo item
class Truck extends React.Component {
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
      licensePlate: this.refs.licensePlate.value,
      model: this.refs.model.value,
      year: this.refs.year.value,
      performance: this.refs.performance.value,
      available: document.getElementById("available").checked
    };
    console.log(_valToSave);
    Trucks.insert(_valToSave);
    this.setState({ show: false });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderTruckTable() {
    return this.props.trucks.map((truck) => (
      <tr key={truck._id}>
        <td>{truck.licensePlate}</td>
        <td>{truck.model}</td>
        <td>{truck.year}</td>
        <td>{truck.performance}</td>
        <td>{truck.available ? "Sí" : "No"}</td>
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
          Nuevo Camión
        </Button>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Rendimiento (Kms/Gal)</th>
              <th>Disponible</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTruckTable()}
          </tbody>
        </Table>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Camión</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Placa:</Form.Label>
                <Form.Control ref="licensePlate" type="text" placeholder="Placa" />
              </Form.Group>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Modelo:</Form.Label>
                <Form.Control ref="model" type="text" placeholder="Modelo" />
              </Form.Group>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Año:</Form.Label>
                <Form.Control ref="year" type="text" placeholder="Año" />
              </Form.Group>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Rendimiento (Kms/Gal):</Form.Label>
                <Form.Control ref="performance" type="text" placeholder="Rendimiento" />
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
    trucks: Trucks.find({}).fetch(),
  };
})(Truck);