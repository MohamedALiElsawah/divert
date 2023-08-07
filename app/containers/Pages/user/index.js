import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// import styles from './module-jss';
import styles from 'enl-components/Tables/tableStyle-jss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';

import swal from 'sweetalert';
import { storeUsers, setLoading } from './actions';
import { getUsersApi, deleteClientApi } from './apis';
import messages from './messages';


function ClientList(props) {
  const {
    classes,
    storeUsers,
    setLoading,
    users
  } = props;
  const history = useHistory();


  const getUsers = () => {
    getUsersApi().then(res => {
      storeUsers(res.data);
    })
      .catch(err => { });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteClient = (id) => {
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
          deleteClientApi(id).then(res => {
            setLoading(false);
            getUsers();
            swal({
              title: 'Success',
              text: 'client deleted!',
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
              <TableCell align="">English Name</TableCell>
              <TableCell align="">Arabic Name</TableCell>
              <TableCell align="">Email</TableCell>
              <TableCell align="">Mobile</TableCell>
              <TableCell align="">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => ([
              <TableRow key={user.id} className={classNames(classes.pointer)}>
                <TableCell align="">{user.name_en}</TableCell>
                <TableCell align="">{user.name_ar}</TableCell>
                <TableCell align="">{user.email}</TableCell>
                <TableCell align="">{user.mobile}</TableCell>
                <TableCell align="">

                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => {
                      console.log('edit', user.id);
                      history.push(`/app/user/${user.id}/edit`);
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
                      handleDeleteClient(user.id);
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
  storeUsers: PropTypes.func.isRequired,
};


const reducer = 'usersReducer';
const lookupsReducer = 'lookupsReducer';

const mapStateToProps = state => ({
  loading: state.get(reducer).loading,
  users: state.get(reducer).users,

  roles: state.get(lookupsReducer).roles,
  ...state,
});

const ClientListMapped = connect(
  mapStateToProps,
  { storeUsers, setLoading }
)(ClientList);

export default withStyles(styles)(injectIntl(ClientListMapped));
