import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocationOn from '@material-ui/icons/LocationOn';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import Driver from 'enl-images/delivery-ready.png';

import Receiver from 'enl-images/receiver.png';
import Sender from 'enl-images/sender.png';
import styles from './widget-jss';

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    {...props}
    defaultZoom={8}
    defaultCenter={props.driver.lat ? props.driver : props.receiver}
    onClick={e => props.changePin(e)}
  >
    {
      props.pin
      && (
        <Marker
          position={props.pin}
        />
      )
    }
    {
      props.driver.lat
      && (
        <Marker
          position={props.driver}

          icon={{
            url: Driver,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      )
    }

    {
      props.sender.lat
      && (
        <Marker
          position={props.sender}

          icon={{
            url: Receiver,
            scaledSize: new window.google.maps.Size(60, 60),
          }}
        />
      )
    }

    {
      props.receiver.lat

      && (
        <Marker
          position={props.receiver}
          icon={{
            url: Sender,
            scaledSize: new window.google.maps.Size(40, 60),
          }}
        />
      )
    }


  </GoogleMap>
));

function MapWidget(props) {
  const {
    classes,
    senderLocation,
    receiverLocation,
    driverLocation
  } = props;

  const [pin, setPin] = useState(null);
  const changePin = (e) => {
    console.log(e.latLng.lat());
    setPin({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };
  useEffect(() => {
    console.log(
      'details',
      senderLocation,
      receiverLocation,
      driverLocation
    );
  }, [receiverLocation, senderLocation]);
  return (
    <Paper className={classes.mapWrap}>
      <MapWithAMarker
        // googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvlsWOhwNqu2kS4H_Hvp-hY9_h-3qxkvY"

        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '300px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        driver={driverLocation}
        sender={
          senderLocation
        }
        receiver={
          receiverLocation
        }

        pin={pin}
        changePin={changePin}
      />

    </Paper>
  );
}

MapWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapWidget);
