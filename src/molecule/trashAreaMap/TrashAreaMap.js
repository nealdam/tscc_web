import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { auth } from '../../firebase/firebase';
import PlaceIcon from '@material-ui/icons/Place';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function TrashAreaMap(props) {

    let center = {
        lat: props.latitude,
        lng: props.longitude
    }

    const zoom = 15;

    const { latitude, longitude } = props;



    return (
        <div style={{ height: 200, width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyD8sbs3FnsB7KzTjrrNNIhKOcJZDId5vOc" }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <PlaceIcon
                    color="secondary"
                    lat={latitude}
                    lng={longitude}
                />
            </GoogleMapReact>
        </div>
    )

}

TrashAreaMap.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
}

export default TrashAreaMap;