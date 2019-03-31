import React from 'react';
import { Link } from 'react-router-dom';
import { history } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const mapStyles = {
    width: '100%',
    height: '100%'
};

export class Maps extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            
                <Map google={this.props.google} zoom={14} style={mapStyles}>

                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>hola</h1>
                        </div>
                    </InfoWindow>
                </Map>
            
        )


    }



}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyC8es4JpY6slh0ma2_XUvVLOKU7H5j9rcQ')
})(Maps)