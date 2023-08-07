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

import swal from 'sweetalert';
import { storeGovernorates, setLoading } from '../actions';
import { getGovernorateApi, deleteGovernorateApi } from '../apis';
import messages from '../messages';


function ClientList(props) {
  const {
    classes,
    storeGovernorates,
    setLoading,
    governorates
  } = props;
  const history = useHistory();


  const getGovernorates = () => {
    getGovernorateApi().then(res => {
      storeGovernorates(res.data);
    })
      .catch(err => { });
  };
  useEffect(() => {
    getGovernorates();
  }, []);

  const handleDeleteGovernorate = (id) => {
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
          deleteGovernorateApi(id).then(res => {
            setLoading(false);
            getGovernorates();
            swal({
              title: 'Success',
              text: 'Governorate deleted!',
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
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell align="left">English Name</TableCell>
              <TableCell align="left">Arabic Name</TableCell>
              <TableCell align="left">Code</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {governorates.map(item => ([
              <TableRow key={item.id} className={classNames(classes.pointer)}>
                <TableCell padding="default">{item.name}</TableCell>
                <TableCell align="left">{item.name_ar}</TableCell>
                <TableCell align="left">{item.code}</TableCell>
                <TableCell align="left">

                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => {
                      console.log('edit', item.id);
                      history.push(`/app/governorate/${item.id}/edit`);
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
                      handleDeleteGovernorate(item.id);
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
  storeGovernorates: PropTypes.func.isRequired,
};


const reducer = 'locationReducer';
const mapStateToProps = state => ({
  loading: state.get(reducer).loading,
  governorates: state.get(reducer).governorates,
  ...state,
});

const ClientListMapped = connect(
  mapStateToProps,
  { storeGovernorates, setLoading }
)(ClientList);

export default withStyles(styles)(injectIntl(ClientListMapped));
