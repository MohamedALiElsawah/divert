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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import { storeOrders, setLoading } from '../actions';
import { getOrdersApi, deleteOrderAPI, getStatisticsApi } from '../apis';
import messages from '../messages';

function ClientList(props) {
  const {
    classes,
    storeOrders,
    setLoading,
    clientsDetails, areas, orders, language,intl 
  } = props;
  const history = useHistory();


  const [statistics, useStatistics] = useState(null);

  const getorders = () => {
    getOrdersApi().then(res => {
      storeOrders(res.data);
    })
      .catch(err => { });
  };

  const getStatistics = (filter) => {
    getStatisticsApi(filter).then(res => {
      useStatistics(res.data.data);
    })
      .catch(err => { });
  };


  useEffect(() => {
    getorders();
    getStatistics('today');
  }, []);

  const handleChange = (event) => {
    getStatistics(event.target.value);
  };

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
          deleteOrderAPI(id).then(res => {
            setLoading(false);
            getorders();
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
        <ValidatorForm>
          <TextValidator
            className={classNames(classes.marginTopTwo)}
            // placeholder='Choose Status '

            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue="today"
            label={<FormattedMessage {...messages.filterTitle} />}
            name="filter"
            onChange={handleChange}
            select
            validators={['required']}
            errorMessages={[<FormattedMessage {...messages.required} />]}
          >
            <MenuItem value="all"><FormattedMessage {...messages.all} /></MenuItem>
            <MenuItem value="today"><FormattedMessage {...messages.today} /></MenuItem>
            <MenuItem value="tomorrow"><FormattedMessage {...messages.tomorrow} /></MenuItem>
            <MenuItem value="yesterday"><FormattedMessage {...messages.yesterday} /></MenuItem>
          </TextValidator>
        </ValidatorForm>

        <CounterIconsWidget statistics={statistics} />

        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell align="left"><FormattedMessage {...messages.orderNum} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.refNum} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.status} /></TableCell>

              <TableCell align="left"><FormattedMessage {...messages.client} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.branch} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.receiverName} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.receiverPhone} /></TableCell>
              <TableCell align="left"><FormattedMessage {...messages.actions} /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(item => ([
              <TableRow key={item.id} className={classNames(classes.pointer)}>
                <TableCell padding="default">{item.order_number}</TableCell>
                <TableCell align="left">{item.reference_number}</TableCell>
                <TableCell align="left">{item.status && item.status.name}</TableCell>
                <TableCell align="left">
                  {item.client && item.client.name}
                </TableCell>
                <TableCell align="left">
                  {item.branch && item.branch.name}
                </TableCell>
                <TableCell align="left">
                  {item.receiver_name}
                </TableCell>
                <TableCell align="left">
                  {item.receiver_phone}
                </TableCell>


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

                  {/* <Fab
                    size="small"
                    aria-label="delete"
                    className={classes.button}
                    className={classNames(classes.button, classes.danger)}
                    onClick={() => {
                      handleDeleteBlock(item.id);
                    }}
                  >
                    <DeleteIcon />
                  </Fab> */}


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
  language: state.get('language').get('locale'),
  ...state,
});

const ClientListMapped = connect(
  mapStateToProps,
  { storeOrders, setLoading }
)(ClientList);

export default withStyles(styles)(injectIntl(ClientListMapped));
