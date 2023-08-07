import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import PaymentIcon from '@material-ui/icons/Payment';
import EventIcon from '@material-ui/icons/Event';
import TimerIcon from '@material-ui/icons/Timer';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import StoreIcon from '@material-ui/icons/Store';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Slide from '@material-ui/core/Slide';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import { handleErrorStatus, handleSuccessMessage } from '../../../../helper/helper';
import MapWidget from '../../../../components/Widget/MapWidget';
import styles from './widget-jss';
import PapperBlock from '../../../../components/PapperBlock/PapperBlock';
import {
  storeOrderDetails, setLoading, storeStatuses, storeDrivers
} from '../actions';
import {
  getOrderDetailsApi, getStatusesApi, changeOrderStatusApi, getDriversApi, AssignDriverApi
} from '../apis';
import messages from '../messages';


function ClientList(props) {
  const {
    classes,
    storeOrderDetails,
    setLoading,
    orderDetails, areas, orders,
    storeStatuses,
    orderStatuses,
    storeDrivers,
    drivers
  } = props;
  const history = useHistory();
  const { id } = useParams();
  const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

  const [open, setOpen] = useState(false);
  const [assignDriverToggle, setAssignDriverToggle] = useState(false);

  // const [status, setStatus] = useState([
  //   {
  //     name:'Cancelled',
  //     id:1,
  //     reason:[
  //       {
  //         name:'Address Not Clear',
  //         id:1
  //       },
  //       {
  //         name:'Client Not Real',
  //         id:2,
  //         sub:[
  //           {
  //             name:'he is robot',
  //             id:1
  //           },
  //           {
  //             name:'he is gay',
  //             id:2
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     name:'Pending',
  //     id:2
  //   },
  //   {
  //     name:'Out for delivery',
  //     id:3
  //   }
  // ]);

  const [statusId, setStatusId] = useState(0);
  const [reasonId, setReasonId] = useState(0);
  const [subreason, setSubReasonId] = useState(0);
  const [driverId, setDriver] = useState(0);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAssignDriverOpen = () => {
    setAssignDriverToggle(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAssignDriverToggle(false);
  };

  const handleStatusChange = (event) => {
    setStatusId(event.target.value * 1);
  };
  const handleReasonChange = (event) => {
    setReasonId(event.target.value * 1);
  };
  const handleChange = (event) => {
    setDriver(event.target.value * 1);
  };

  const handleSubReason = (event) => {
    setSubReasonId(event.target.value * 1);
  };
  const getOrderDetails = () => {
    getOrderDetailsApi(id).then(res => {
      storeOrderDetails(res.data.data);
    })
      .catch(err => { });
  };

  const changeStatus = () => {
    const obj = {
      order_id: id,
      status_id: statusId,
      reason_id: reasonId || null,
      reason_item_id: subreason || null
    };
    changeOrderStatusApi(obj).then(res => {
      handleSuccessMessage('Status Changed successfully!');
      getOrderDetails(id);
      handleClose();
    });
  };


  const assignDriver = () => {
    const obj = {
      order_id: id,
      driver_id: driverId
    };
    AssignDriverApi(obj).then(res => {
      handleSuccessMessage('Driver Assigned successfully!');
      getOrderDetails(id);
      handleClose();
    });
  };


  useEffect(() => {
    console.log('slsls');

    getOrderDetails();
    getStatusesApi().then(res => {
      storeStatuses(res.data);
    });
    getDriversApi().then(res => {
      storeDrivers(res.data);
    });
  }, []);


  return (
    <Fragment>
      <div className={classes.rootTable}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            {
              orderDetails.id
              && (
                <MapWidget
                  senderLocation={
                    {
                      lat: orderDetails.sender_address ? orderDetails.sender_address.lat * 1 : null,
                      lng: orderDetails.sender_address ? orderDetails.sender_address.lng * 1 : null
                    }
                  }
                  receiverLocation={
                    {
                      lat: orderDetails.receiver_address ? orderDetails.receiver_address.lat * 1 : null,
                      lng: orderDetails.receiver_address ? orderDetails.receiver_address.lng * 1 : null
                    }
                  }
                  driverLocation={{
                    lat: orderDetails.driver_location ? orderDetails.driver_location.lat * 1 : null,
                    lng: orderDetails.driver_location ? orderDetails.driver_location.lng * 1 : null
                  }}
                />
              )
            }
          </Grid>
          <Grid item xs={6} sm={8}>
            <Grid container>
              {/* order data */}
              <Grid item xs={12} sm={12}>
                <PapperBlock title="order data" whiteBg desc="">
                  <Grid container className={classes.colList}>
                    <Grid item md={4}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                            <ConfirmationNumberIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Order number" secondary={orderDetails.order_nubmer} />
                      </ListItem>
                    </Grid>
                    <Grid item md={4}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <HorizontalSplitIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="QR" secondary={orderDetails.qr} />
                      </ListItem>
                    </Grid>
                    <Grid item md={4}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <ConfirmationNumberIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="reference number" secondary={orderDetails.reference_number} />
                      </ListItem>
                    </Grid>
                    <Grid item md={4}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <DirectionsBikeIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Type" secondary={orderDetails.is_immediate ? 'Immediat Order' : 'Scheduled Order'} />
                      </ListItem>
                    </Grid>
                    <Grid item md={4}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                            <PaymentIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Payment" secondary={orderDetails.payment_method} />
                      </ListItem>
                    </Grid>
                    <Grid item md={4}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <EventIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Pickup date" secondary={orderDetails.pickup_date} />
                      </ListItem>
                    </Grid>
                    <Grid item md={4}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <TimerIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Pickup time" secondary={orderDetails.pickup_time} />
                      </ListItem>
                    </Grid>

                    <Grid item md={4}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <DynamicFeedIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Quantity" secondary={orderDetails.quantity} />
                      </ListItem>
                    </Grid>
                    <Grid item md={4}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <FitnessCenterIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Weight" secondary={orderDetails.weight} />
                      </ListItem>
                    </Grid>
                    <Grid item md={4}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <MailOutlineIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Notes" secondary={orderDetails.notes} />
                      </ListItem>
                    </Grid>
                    <Grid item md={4}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <MailOutlineIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Status" secondary={orderDetails.status && orderDetails.status.name_en} />
                      </ListItem>
                    </Grid>
                    <Grid item md={4}>

                      <Button
                        onClick={handleClickOpen}
                        className={classNames(classes.changeStatusBtn)}
                        variant="contained"
                        fullWidth
                        color="primary"
                      >
                        {' '}
Change Status
                      </Button>

                    </Grid>

                  </Grid>
                </PapperBlock>
              </Grid>


              {/* driver data */}
              <Grid item xs={12} sm={12}>

                <PapperBlock icon="electric_bike" title="Driver Data" whiteBg desc="">
                  <Grid container className={classes.colList}>
                    <Grid item md={6}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                            <ContactPhoneIcon />

                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Name" secondary={orderDetails.driver && orderDetails.driver.name_en} />
                      </ListItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        onClick={handleAssignDriverOpen}
                        className={classNames(classes.changeStatusBtn)}
                        variant="contained"
                        fullWidth
                        color="primary"
                      >
                        {' '}
Assign Driver
                      </Button>
                    </Grid>
                    {/* <Grid item md={6}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <StoreIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Branch" secondary={orderDetails.branch && orderDetails.branch.name} />
                      </ListItem>
                    </Grid> */}

                  </Grid>
                </PapperBlock>
              </Grid>

              {/* receiver data */}
              <Grid item xs={12} sm={12}>
                <PapperBlock icon="call_received" title="Receiver Data" whiteBg desc="">
                  <Grid container className={classes.colList}>
                    <Grid item md={6}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                            <ContactPhoneIcon />

                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Name" secondary={orderDetails.receiver_name} />
                      </ListItem>
                    </Grid>
                    <Grid item md={6}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <PhoneIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Phone" secondary={orderDetails.receiver_phone} />
                      </ListItem>
                    </Grid>
                    <Grid item md={12}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <BusinessIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Address"
                          secondary={
                            orderDetails.receiver_address
                          && (orderDetails.receiver_address.name
                            + ', street: '
                            + orderDetails.sender_address.street
                            + ',unit: '
                            + orderDetails.sender_address.unit
                            + ', floor: '
                            + orderDetails.sender_address.floor
                          )

                          }
                        />
                      </ListItem>
                    </Grid>
                  </Grid>
                </PapperBlock>
              </Grid>

              {/* sender data */}
              <Grid item xs={12} sm={12}>
                <PapperBlock icon="send" title="Sender Data" whiteBg desc="">
                  <Grid container className={classes.colList}>
                    <Grid item md={6}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                            <ContactPhoneIcon />

                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Name" secondary={orderDetails.client && orderDetails.client.name_en} />
                      </ListItem>
                    </Grid>
                    <Grid item md={6}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <StoreIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Branch" secondary={orderDetails.branch && orderDetails.branch.name} />
                      </ListItem>
                    </Grid>
                    <Grid item md={12}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar className={classNames(classes.avatar, classes.greenAvatar)}>
                            <BusinessIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Address"
                          secondary={
                            orderDetails.sender_address
                          && (orderDetails.sender_address.name
                            + ', street: '
                            + orderDetails.sender_address.street
                            + ',unit: '
                            + orderDetails.sender_address.unit
                            + ', floor: '
                            + orderDetails.sender_address.floor
                          )

                          }
                        />
                      </ListItem>
                    </Grid>
                  </Grid>
                </PapperBlock>
              </Grid>


            </Grid>


          </Grid>

          <Grid item xs={6} sm={4}>
            <PapperBlock whiteBg noMargin title="Order history" icon="av_timer" desc="">
              <div className={classes.activityWrap}>
                <List>
                  {orderDetails.status_history && orderDetails.status_history.map((item, index) => (
                    <ListItem key={index.toString()} className={classes.activityList}>
                      <ListItemIcon>
                        <div className={classes.timeDot}>
                          <time>
                            {
                              moment(item.created_at, 'YYYY/MM/DD').format('DD/MM/YY h:mm a')
                            }
                          </time>
                          <span />
                        </div>
                      </ListItemIcon>
                      <ListItemText primary={item.status_name} className={classes.activityText} secondary={null} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </PapperBlock>
          </Grid>

        </Grid>


        <Dialog
          open={open}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          maxWidth="lg"
          fullWidth

          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Change Order Status</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <p>Select Status</p>
                <FormControl component="fieldset" className={classes.formControl}>
                  <RadioGroup aria-label="status" value={statusId} name="status" onChange={handleStatusChange}>
                    {
                      orderStatuses.map(item => (
                        <FormControlLabel value={item.id} control={<Radio />} label={item.name_en} />
                      ))
                    }

                  </RadioGroup>
                </FormControl>

              </Grid>
              <Grid item xs={12} sm={4}>
                <p>Select Reason</p>
                <FormControl component="fieldset" className={classes.formControl}>
                  <RadioGroup aria-label="reason" name="reason" value={reasonId} onChange={handleReasonChange}>
                    {
                      orderStatuses.find(item => item.id == statusId)
                    && orderStatuses.find(item => item.id == statusId).reasons
                    && orderStatuses.find(item => item.id == statusId).reasons.map(item => (
                      <FormControlLabel value={item.id} control={<Radio />} label={item.name} />

                    ))
                    }

                  </RadioGroup>
                </FormControl>

              </Grid>
              <Grid item xs={12} sm={4}>
                <p>Select sub reason</p>
                <FormControl component="fieldset" className={classes.formControl}>
                  <RadioGroup aria-label="sub" value={subreason} name="sub" onChange={handleSubReason}>
                    {
                      orderStatuses.find(item => item.id == statusId)
                    && orderStatuses.find(item => item.id == statusId).reasons
                    && orderStatuses.find(item => item.id == statusId).reasons.find(item => item.id == reasonId)
                    && orderStatuses.find(item => item.id == statusId).reasons.find(item => item.id == reasonId).reason_items

                    && orderStatuses.find(item => item.id == statusId).reasons.find(item => item.id == reasonId).reason_items.map(item => (
                      <FormControlLabel value={item.id} control={<Radio />} label={item.name} />

                    ))
                    }
                  </RadioGroup>
                </FormControl>

              </Grid>
            </Grid>


          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              color="primary"
              disabled={
                !statusId
              || (
                orderStatuses.find(item => item.id == statusId)
                && orderStatuses.find(item => item.id == statusId).reasons
                && orderStatuses.find(item => item.id == statusId).reasons.length > 0
                && !reasonId
              )
              || (
                orderStatuses.find(item => item.id == statusId)
                && orderStatuses.find(item => item.id == statusId).reasons
                && orderStatuses.find(item => item.id == statusId).reasons.find(item => item.id == reasonId)
                && orderStatuses.find(item => item.id == statusId).reasons.find(item => item.id == reasonId).reason_items
                && orderStatuses.find(item => item.id == statusId).reasons.find(item => item.id == reasonId).reason_items.length > 0
                && !subreason
              )
              }
              onClick={changeStatus}
            >
              Change
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog
          open={assignDriverToggle}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          maxWidth="lg"
          fullWidth

          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Assign Driver to order</DialogTitle>
          <DialogContent>
            <ValidatorForm
              // onSubmit={onSubmit}
              // onSubmit={handleSubmit}
              onError={errors => console.log('error goes here', errors)}
            >
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    placeholder="Choose Driver"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}

                    label="Driver"
                    name="client_id"
                    onChange={handleChange}
                    value={driverId}
                    select
                    validators={['required']}
                    errorMessages={['this field is required']}
                  >
                    {
                      drivers.map(driver => (
                        <MenuItem value={driver.id}>{driver.name_en}</MenuItem>
                      ))
                    }
                  </TextValidator>
                </Grid>
              </Grid>

            </ValidatorForm>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              color="primary"
              disabled={
                !driverId
              }
              onClick={assignDriver}
            >
              Change
            </Button>
          </DialogActions>
        </Dialog>


      </div>
    </Fragment>

  );
}

ClientList.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  storeOrderDetails: PropTypes.func.isRequired,
  storeStatuses: PropTypes.func.isRequired,
  storeDrivers: PropTypes.func.isRequired,

};


const reducer = 'ordersReducer';
const lookupsReducer = 'lookupsReducer';

const mapStateToProps = state => ({
  loading: state.get(reducer).loading,
  orders: state.get(reducer).orders,
  orderDetails: state.get(reducer).orderDetails,
  orderStatuses: state.get(reducer).orderStatuses,
  drivers: state.get(reducer).drivers,

  areas: state.get(lookupsReducer).areas,

  ...state,
});

const ClientListMapped = connect(
  mapStateToProps,
  {
    storeOrderDetails, setLoading, storeStatuses, storeDrivers
  }
)(ClientList);

export default withStyles(styles)(injectIntl(ClientListMapped));
