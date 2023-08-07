import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
import messages from './messages';
import styles from './module-jss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getClientsApi, deleteClientApi } from './apis'
import { storeClients,setLoading } from './actions'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";



function ClientList(props) {
  const {
    classes,
    storeClients,
    setLoading,
    clients
  } = props;
  const history = useHistory();



  const getClients=()=>{
    getClientsApi().then(res => {
      storeClients(res.data)
    })
      .catch(err => { })
  }
  useEffect(() => {
    getClients()
  }, [])

  const handleDeleteClient = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      
    })
      .then((willDelete) => {
        if (willDelete) {
          setLoading(true)
          deleteClientApi(id).then(res => {
            setLoading(false)
            getClients();
            swal({
              title: "Success",
              text: 'client deleted!',
              icon: "success",
            });

          })
            .catch(err => {
              setLoading(false)

            })
        }
      });
  }
  return (
    <Fragment>
      <div className={classes.rootTable}>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell padding="default">User Name</TableCell>
              <TableCell align="right">English Name</TableCell>
              <TableCell align="right">Arabic Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Mobile</TableCell>
              <TableCell align="right">delivery time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(client => ([
              <TableRow key={client.id} className={classNames(classes.pointer)}>
                <TableCell padding="default">{client.user_name}</TableCell>
                <TableCell align="right">{client.name_en}</TableCell>
                <TableCell align="right">{client.name_ar}</TableCell>
                <TableCell align="right">{client.email}</TableCell>
                <TableCell align="right">{client.mobile}</TableCell>
                <TableCell align="right">{client.delivery_time_slot}</TableCell>
                <TableCell align="right">

                  <Fab size="small" color="primary" aria-label="add" className={classes.button}
                    onClick={() => {
                      console.log('edit', client.id)
                      history.push(`/app/clients/${client.id}/edit`);

                    }}>
                    <EditIcon />
                  </Fab>

                  <Fab size="small" aria-label="delete" className={classes.button}
                    className={classNames(classes.button, classes.danger)}
                    onClick={() => {
                      handleDeleteClient(client.id)
                    }}>
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
};


const reducer = 'clientsReducer';
const mapStateToProps = state => ({
  loading: state.get(reducer).loading,
  clients: state.get(reducer).clients,
  ...state,
});

const ClientListMapped = connect(
  mapStateToProps,
  { storeClients,setLoading }
)(ClientList);

export default withStyles(styles)(injectIntl(ClientListMapped));
