import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import App from './../ui/App.js';
import Customer from './../ui/Customer.js';
import Truck from './../ui/Truck.js';
import Driver from './../ui/Driver.js';
import Product from './../ui/Product.js';
import MapContainer from '../ui/mapContainer.js';


class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component= {App}/>
                    <Route path="/clientes" component= {Customer}/>
                    <Route path="/camiones" component= {Truck}/>
                    <Route path="/conductores" component= {Driver}/>
                    <Route path="/productos" component= {Product}/>
                    <Route path="/maps" component= {MapContainer}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router;
