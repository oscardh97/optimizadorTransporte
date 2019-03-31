import React, { Component } from 'react';
import Navbar from './../components/navbar.js';
import { withTracker } from 'meteor/react-meteor-data';
import CompanyDialog from './../components/companyDialog.js';
import { Customers } from '../api/customers.js';
import { Button, Modal, Form, Table } from 'react-bootstrap';

// Task component - represents a single todo item
class Customer extends React.Component {
   constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
    };
  }

  save() {
    const _valToSave = {
      name: this.refs.customerName.value,
      latitude: this.refs.customerLatitude.value,
      longitude: this.refs.customerLongitude.value
    };
    console.log(_valToSave);
    Customers.insert(_valToSave);
    this.setState({ show: false });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderCustomerTable() {
    return this.props.customers.map((customer) => (
      <tr key={customer._id}>
        <td>{customer.name}</td>
        <td>{customer.latitude}</td>
        <td>{customer.longitude}</td>
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
          Nuevo Cliente
        </Button>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Latitud</th>
              <th>Longitud</th>
            </tr>
          </thead>
          <tbody>
            {this.renderCustomerTable()}
          </tbody>
        </Table>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="customerForm.ctrName">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control ref="customerName" type="text" placeholder="Nombre Cliente" />
              </Form.Group>
              <Form.Group controlId="customerForm.ctrlUbicacion">
                <Form.Label>Ubicación:</Form.Label>
                <Form.Control ref="customerLatitude" type="text" placeholder="Latitud" />
                <Form.Control ref="customerLongitude" type="text" placeholder="Longitud" />
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
    customers: Customers.find({}).fetch(),
  };
})(Customer);