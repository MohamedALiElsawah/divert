import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
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
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { storePlans, setLoading } from '../actions';
import { getPlansApi, deletePlanApi } from '../apis';
import messages from '../messages';


function ClientList(props) {
  const {
    classes,
    storePlans,
    setLoading,
    plans, clientsDetails, areas, clientId,intl
  } = props;
  const history = useHistory();


  const getPlans = () => {
    getPlansApi(clientId).then(res => {
      storePlans(res.data);
    })
      .catch(err => { });
  };
  useEffect(() => {
    getPlans();
  }, []);

  const handleDeleteBlock = (id) => {
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
          deletePlanApi(id).then(res => {
            setLoading(false);
            getPlans();
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
            <TableCell align="left"><FormattedMessage {...messages.enName} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.arName} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.client} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.branch} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.pickupArea} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.deliveryArea} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.actions} /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map(item => ([
              <TableRow key={item.id} className={classNames(classes.pointer)}>
                <TableCell padding="default">{item.name_en}</TableCell>
                <TableCell align="left">{item.name_ar}</TableCell>
                <TableCell align="left">{clientsDetails.find(client => client.id == item.client_id) && clientsDetails.find(client => client.id == item.client_id).user_name}</TableCell>
                <TableCell align="left">
                  {
                    clientsDetails.find(client => client.id == item.client_id)
                  && clientsDetails.find(client => client.id == item.client_id).branches.find(branch => item.branch_id == branch.id)
                  && clientsDetails.find(client => client.id == item.client_id).branches.find(branch => item.branch_id == branch.id).name
                  }
                </TableCell>
                <TableCell align="left">{areas.find(area => area.id == item.pickup_area_id) && areas.find(area => area.id == item.pickup_area_id).name}</TableCell>
                <TableCell align="left">{areas.find(area => area.id == item.delivery_area_id) && areas.find(area => area.id == item.delivery_area_id).name}</TableCell>

                <TableCell align="left">

                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => {
                      console.log('edit', item.id);
                      history.push(`/app/plan/${item.id}/edit`);
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
  storePlans: PropTypes.func.isRequired,

};


const reducer = 'clientsReducer';
const lookupsReducer = 'lookupsReducer';

const mapStateToProps = state => ({
  loading: state.get(reducer).loading,
  plans: state.get(reducer).plans,
  clientsDetails: state.get(lookupsReducer).clientsDetails,
  areas: state.get(lookupsReducer).areas,
  ...state,
});

const ClientListMapped = connect(
  mapStateToProps,
  { storePlans, setLoading }
)(ClientList);

export default withStyles(styles)(injectIntl(ClientListMapped));
