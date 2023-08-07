import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styles from 'enl-components/Tables/tableStyle-jss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import {
  CounterIconsWidget,
} from 'enl-components';
import { storeOrders, setLoading } from '../actions';
import { getDriversApi, deletePlanApi, getStatisticsApi } from '../apis';
import messages from '../messages';
import MapWidget from '../../../../components/Widget/driversMap';


function ClientList(props) {
  const {
    classes,
    storeOrders,
    setLoading,
    clientsDetails, areas, orders
  } = props;
  const history = useHistory();


  const [statistics, useStatistics] = useState(null);
  const [drivers, useDrivers] = useState([]);

  const getDrivers = () => {
    getDriversApi()
      .then(res => {
      // storeOrders(res.data)
        useDrivers(res.data.data);
      })
      .catch(err => { });
  };

  const getStatistics = () => {
    getStatisticsApi().then(res => {
      useStatistics(res.data.data);
    })
      .catch(err => { });
  };


  useEffect(() => {
    getDrivers();
    getStatistics();
  }, []);

  const handleDeleteBlock = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,

    })
      .then((willDelete) => {
        if (willDelete) {
          setLoading(true);
          deletePlanApi(id).then(res => {
            setLoading(false);
            getDrivers();
            swal({
              title: 'Success',
              text: 'Plan deleted!',
              icon: 'success',
            });
          })
            .catch(err => {
              setLoading(false);
            });
        }
      });
  };

  return (
    <Fragment>
      <div className={classes.rootTable}>
        <MapWidget drivers={drivers} />


        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Driver Name</TableCell>
              <TableCell align="left">Order Count </TableCell>
              <TableCell align="left">Status</TableCell>

              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers && drivers.map(item => ([
              <TableRow key={item.id} className={classNames(classes.pointer)}>
                <TableCell padding="default">{item.driver.name_en}</TableCell>
                <TableCell align="left">{item.order_count}</TableCell>
                <TableCell align="left">{item.status}</TableCell>
                <TableCell align="left">
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => {
                      history.push(`/app/order/${item.id}/details`);
                    }}
                  >
                    <VisibilityIcon />
                  </Fab>

                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => {
                      console.log('edit', item.id);
                      history.push(`/app/order/${item.id}/edit`);
                    }}
                  >
                    <EditIcon />
                  </Fab>

                  <Fab
                    size="small"
                    aria-label="delete"
                    className={classes.button}
                    className={classNames(classes.button, classes.danger)}
                    onClick={() => {
                      handleDeleteBlock(item.id);
                    }}
                  >
                    <DeleteIcon />
                  </Fab>


                </TableCell>

              </TableRow>
            ]))}
          </TableBody>
        </Table>
      </div>
    </Fragment>

  );
}

ClientList.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  storeOrders: PropTypes.func.isRequired,

};


const reducer = 'ordersReducer';
const lookupsReducer = 'lookupsReducer';

const mapStateToProps = state => ({
  loading: state.get(reducer).loading,
  orders: state.get(reducer).orders,
  clientsDetails: state.get(lookupsReducer).clientsDetails,
  areas: state.get(lookupsReducer).areas,
  ...state,
});

const ClientListMapped = connect(
  mapStateToProps,
  { storeOrders, setLoading }
)(ClientList);

export default withStyles(styles)(injectIntl(ClientListMapped));
