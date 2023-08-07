import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import brand from 'enl-api/dummy/brand';
import logo from 'enl-images/logo.png';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import CircularProgress from '@material-ui/core/CircularProgress';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// import styles from '../module-jss';
import styles from 'enl-components/Tables/tableStyle-jss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import VisibilityIcon from '@material-ui/icons/Visibility';

import swal from 'sweetalert';
import { storeClients, setLoading } from '../actions';
import { getClientsApi, deleteClientApi } from '../apis';
import messages from '../messages';


function ClientList(props) {
  const {
    classes,
    storeClients,
    setLoading,
    clients,intl
  } = props;
  const history = useHistory();


  const getClients = () => {
    getClientsApi().then(res => {
      storeClients(res.data);
    })
      .catch(err => { });
  };
  useEffect(() => {
    getClients();
  }, []);

  const handleDeleteClient = (id) => {
    swal({
      title:intl.formatMessage(messages.sure) ,
      text: intl.formatMessage(messages.sureBody) ,
      icon: 'warning',
      buttons: [intl.formatMessage(messages.cancel), intl.formatMessage(messages.OK)],
      dangerMode: true,

    })
      .then((willDelete) => {
        if (willDelete) {
          setLoading(true);
          deleteClientApi(id).then(res => {
            setLoading(false);
            getClients();
            swal({
              title: intl.formatMessage(messages.success) ,
              text: intl.formatMessage(messages.deleted) ,
              icon: 'success',
              buttons: intl.formatMessage(messages.OK),

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
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell align="right"><FormattedMessage {...messages.enName} /></TableCell>
              <TableCell align="right"><FormattedMessage {...messages.arName} /></TableCell>
              <TableCell align="right"><FormattedMessage {...messages.email} /></TableCell>
              <TableCell align="right"><FormattedMessage {...messages.mobile} /></TableCell>
              <TableCell align="right"><FormattedMessage {...messages.contractNum} /></TableCell>

              <TableCell align="right"><FormattedMessage {...messages.deliveryTime} /></TableCell>
              <TableCell align="right"><FormattedMessage {...messages.actions} /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(client => ([
              <TableRow key={client.id} className={classNames(classes.pointer)}>
                <TableCell align="right">{client.name_en}</TableCell>
                <TableCell align="right">{client.name_ar}</TableCell>
                <TableCell align="right">{client.email}</TableCell>
                <TableCell align="right">{client.mobile}</TableCell>
                <TableCell align="right">{client.contract_number}</TableCell>

                <TableCell align="right">{client.delivery_time_slot}</TableCell>
                <TableCell align="right">
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => {
                      history.push(`/app/clients/${client.id}/details`);
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
                      console.log('edit', client.id);
                      history.push(`/app/clients/${client.id}/edit`);
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
                      handleDeleteClient(client.id);
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
  storeClients: PropTypes.func.isRequired,
  intl: intlShape.isRequired

};


const reducer = 'clientsReducer';
const mapStateToProps = state => ({
  loading: state.get(reducer).loading,
  clients: state.get(reducer).clients,
  ...state,
});

const ClientListMapped = connect(
  mapStateToProps,
  { storeClients, setLoading }
)(ClientList);

export default withStyles(styles)(injectIntl(ClientListMapped));
