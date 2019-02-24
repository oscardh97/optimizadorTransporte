import React from 'react';
import { Link } from 'react-router-dom';
import { history } from 'react-router-dom';
import { Redirect } from 'react-router'


class Navbar extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <a className="navbar-brand" href="/">Inicio</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link" href="clientes">Clientes</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="camiones">Camiones</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="contenedores">Contenedores</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="conductores">Conductores</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="productos">Productos</a>
                      </li>
                    </ul>
                  </div>
                </nav>
            )
        
        
    }



}


export default Navbar;