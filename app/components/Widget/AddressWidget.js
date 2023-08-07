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

import Driver from 'enl-images/driver.png';
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
    // center={props.pin?props.pin:{ lat:29.37454260558578, lng:47.978503831764755}}

    defaultCenter={
      props.pin ? props.pin : { lat: 29.37454260558578, lng: 47.978503831764755 }
    }
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


  </GoogleMap>
));

function MapWidget(props) {
  const {
    classes,
    getPin,
    pin
  } = props;

  // const [pin,setPin]=useState(null)
  const changePin = (e) => {
    const location = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    // setPin(location)
    getPin(location);
  };
  useEffect(() => {
    console.log('pin', pin);
  }, [pin]);
  return (
    <Paper className={classes.mapWrap}>
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvlsWOhwNqu2kS4H_Hvp-hY9_h-3qxkvY"

        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '300px' }} />}
        mapElement={<div style={{ height: '100%' }} />}

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
