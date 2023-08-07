import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Button from '@material-ui/core/Button';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PostAddIcon from '@material-ui/icons/PostAdd';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import AddressCreate from '../address/create';
import BranchCreate from '../branch/create';
import PlanCreate from '../plans/create';


import Plans from '../plans';
import AddressList from '../address';
import BranchList from '../branch';
import { storeClients, setLoading } from '../actions';
import { getClientsApi, deleteClientApi } from '../apis';
import styles from '../module-jss';
import messages from '../messages';


function ClientList(props) {
  const {
    classes,
    storeClients,
    setLoading,
    clients,
    intl
  } = props;
  const history = useHistory();
  const { id } = useParams();


  const getClients = () => {
    getClientsApi().then(res => {
      storeClients(res.data);
    })
      .catch(err => { });
  };
  useEffect(() => {
    getClients();
  }, []);

  const [addressModal, setAddressModal] = useState(false);
  const [branchModal, setBranchModal] = useState(false);
  const [planModal, setPlanModal] = useState(false);

  const [addressKey, setAddressKey] = useState(0);
  const [branchKey, setBranchKey] = useState(0);
  const [planKey, setPlanKey] = useState(0);

  const handleClose = () => {
    setAddressModal(false);
    setBranchModal(false);
    setPlanModal(false);
  };
  const childData = (Addressid) => {
    handleClose();
    setAddressKey(addressKey + 1);
  };
  const branchData = (Addressid) => {
    handleClose();
    setBranchKey(branchKey + 1);
  };
  const planData = (Addressid) => {
    handleClose();
    setPlanKey(planKey + 1);
  };


  const [tabsValue, setTabsValue] = useState(0);
  const handleChange = (event, value) => {
    setTabsValue(value);
  };

  return (
    <Fragment>
      <Paper>
        <Tabs
          value={tabsValue}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<AccountBalanceIcon />} label={intl.formatMessage(messages.branches)} />
          <Tab icon={<ImportContactsIcon />} label={intl.formatMessage(messages.addresses)} />
          <Tab icon={<MonetizationOnIcon />} label={intl.formatMessage(messages.plans)} />
        </Tabs>
      </Paper>
      {tabsValue === 0
            && (
              <Fragment>
                <div align="right" className={classes.addAddress}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setBranchModal(true);
                    }}
                  >
                    <PlaylistAddIcon />
                    {' '}
                    <FormattedMessage {...messages.addBranch} />
                    {' '}
                  </Button>


                </div>
                <BranchList clientId={id} key={branchKey} />

              </Fragment>
            )
      }
      {tabsValue === 1
            && (
              <Fragment>
                <div align="right" className={classes.addAddress}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setAddressModal(true);
                    }}
                  >
                    <AddLocationIcon />
                    {' '}
                    <FormattedMessage {...messages.addAddress} />

                  </Button>


                </div>
                <AddressList clientId={id} key={addressKey} />
              </Fragment>
            )
      }
      {tabsValue === 2

            && (
              <Fragment>
                <div align="right" className={classes.addAddress}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setPlanModal(true);
                    }}
                  >
                    <PostAddIcon />
                    {' '}
                    <FormattedMessage {...messages.addPlans} />

                    {' '}
                  </Button>


                </div>

                <Plans clientId={id} key={planKey} />
              </Fragment>
            )
      }


      <Dialog
        open={addressModal}
        // TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        maxWidth="lg"
        fullWidth

        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Create new address</DialogTitle>
        <DialogContent>
          {addressModal
                && <AddressCreate client_id_from_parent={id} getData={childData} />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
                    <FormattedMessage {...messages.cancel} />
              
          </Button>

        </DialogActions>
      </Dialog>

      <Dialog
        open={branchModal}
        // TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        maxWidth="lg"
        fullWidth

        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Create new address</DialogTitle>
        <DialogContent>
          {branchModal
                && <BranchCreate client_id_from_parent={id} getData={branchData} />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
          <FormattedMessage {...messages.cancel} />

          </Button>

        </DialogActions>
      </Dialog>

      <Dialog
        open={planModal}
        // TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        maxWidth="lg"
        fullWidth

        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Create new address</DialogTitle>
        <DialogContent>
          {planModal
                && <PlanCreate client_id_from_parent={id} getData={planData} />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
          <FormattedMessage {...messages.cancel} />

          </Button>

        </DialogActions>
      </Dialog>
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
  { storeClients, setLoading }
)(ClientList);

export default withStyles(styles)(injectIntl(ClientListMapped));
