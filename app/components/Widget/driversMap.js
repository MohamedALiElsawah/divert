import React, { Fragment, useState } from 'react';
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
  InfoWindow,
} from 'react-google-maps';
import { useHistory } from 'react-router-dom';

import DriverBusy from 'enl-images/delivery-busy.png';
import DriverOffline from 'enl-images/delivery-offline.png';
import DriverReady from 'enl-images/delivery-ready.png';
import styles from './widget-jss';

const getDriverIcon = (driver) => {
  if (driver.status == 'Busy') {
    return DriverBusy;
  }
  if (driver.status == 'Ready') {
    return DriverReady;
  }

  return DriverOffline;
};
const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    {...props}
    defaultZoom={8}
    defaultCenter={{ lat: 29.37454260558578, lng: 47.978503831764755 }}
    onClick={e => props.changePin(e)}
  >
    {
      props.drivers
      && props.drivers.map(driver => (
        <Marker
          position={driver.location.length && { lat: driver.location[0].lat * 1, lng: driver.location[0].lng * 1 }}
          onClick={() => {
            props.setDriverSelected(driver.driver.id);
          }}
          icon={{
            url: getDriverIcon(driver),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          key={driver.id}
        >
          {props.driverSelected == driver.driver.id && (
            <InfoWindow>
              <Fragment>
                <h4>
                  {driver.driver.name_en}
                </h4>

                <p
                  className={props.classes.orderTitle}

                >
List of Orders that driver carry
                </p>
                {
                  driver.orders.length && driver.orders.map(order => (
                    <p
                      className={props.classes.orderLink}
                      onClick={() => {
                        props.navigateToOrder(order.id);
                      }}
                    >
                      {order.order_number}
                    </p>
                  ))
                }

              </Fragment>
            </InfoWindow>
          )
          }


        </Marker>
      ))

    }


  </GoogleMap>
));

function MapWidget(props) {
  const {
    classes,
    drivers
  } = props;
  const history = useHistory();

  const [driverSelected, setDriverSelected] = useState(0);
  const navigateToOrder = (id) => {
    history.push(`/app/order/${id}/details`);
  };

  return (
    <Paper className={classes.mapWrap}>
      <MapWithAMarker
        // googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvlsWOhwNqu2kS4H_Hvp-hY9_h-3qxkvY"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '300px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        drivers={
          drivers
        }
        driverSelected={driverSelected}
        setDriverSelected={setDriverSelected}
        navigateToOrder={navigateToOrder}
        classes={classes}
      />

    </Paper>
  );
}

MapWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapWidget);
