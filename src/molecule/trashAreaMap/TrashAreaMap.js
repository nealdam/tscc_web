import PlaceIcon from '@material-ui/icons/Place';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import React from 'react';

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
                    style={{ marginBottom: 10 }}
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