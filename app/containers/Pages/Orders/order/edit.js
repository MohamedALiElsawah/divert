import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
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
import { closeMsgAction } from 'enl-redux/actions/authActions';
import MenuItem from '@material-ui/core/MenuItem';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import messages from '../messages';
import styles from '../module-jss';
import {
  ARABIC_REGX,
  ENGLISH_REGX,
  PHONE,
  LOCATION
} from '../../../../helper/validations';
import { editPlanApi, getO, getOrderDetailsApi } from '../apis';
import { setLoading, } from '../actions';
import { handleErrorStatus, handleSuccessMessage } from '../../../../helper/helper';


function EditForm(props) {
  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
    intl,
    messagesAuth,
    closeMsg,
    loading,
    type,
    setLoading,

    clientsDetails,
    areas
  } = props;

  const history = useHistory();
  const { id } = useParams();

  const [formObj, setForm] = useState({});

  useEffect(() => {
    setLoading(true);

    getOrderDetailsApi(id).then(res => {
      // (res.data.data)
      const { data } = res.data;
      setForm({
        ...formObj,
        order_number: data.order_number,
        client_id: data.client.id * 1,
        branch_id: data.branch_id,
        sender_address_id: data.sender_address_id,
        receiver_address_id: data.receiver_address_id,
        price_model_id: data.price_model_id,
        payment_method: data.payment_method == 'Cash' ? 'CASH' : 'CREDIT',
        notes: data.notes,
        qr_code: data.qr_code,
        pickup_date: data.pickup_date,
        pickup_time: data.pickup_time,
        receiver_name: data.receiver_name,
        receiver_phone: data.receiver_phone,
        is_immediate: data.is_immediate == 1 ? 'YES' : 'NO',
        quantity: data.quantity,
        weight: data.weight,

      });
      console.log('res.data.data', res.data.data);

      setLoading(false);
    })
      .catch(err => {
        setLoading(false);
      });
  }, []);


  const handleChange = (event) => {
    setForm({
      ...formObj,
      [event.target.name]: event.target.value
    });
  };


  const onSubmit = (valueForm) => {
    const obj = {
      order_number: formObj.order_number,
      client_id: formObj.client_id,
      branch_id: formObj.branch_id,
      sender_address_id: formObj.sender_address_id,
      receiver_address_id: formObj.receiver_address_id,
      price_model_id: formObj.price_model_id,
      payment_method: formObj.payment_method == 'CASH' ? 1 : 2,
      notes: formObj.notes,
      qr_code: formObj.qr_code,
      pickup_date: formObj.pickup_date,
      pickup_time: formObj.pickup_time,
      receiver_name: formObj.receiver_name,
      receiver_phone: formObj.receiver_phone,
      is_immediate: formObj.is_immediate == 'YES' ? 1 : 0,
      quantity: formObj.quantity,
      weight: formObj.weight,
      device_type: 'web',
      type: 'O'
    };

    setLoading(true);
    editPlanApi(id, obj).then(res => {
      setLoading(false);
      handleSuccessMessage('Plan Updated successfully!');
    })
      .catch(error => {
        setLoading(false);
        handleErrorStatus(error);
      });
  };
  return (
    <Paper className={classes.sideWrap}>
      <Hidden mdUp>
        <div className={classes.headLogo}>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt={brand.name} />
            {brand.name}
          </NavLink>
        </div>
      </Hidden>
      <div className={classes.topBar}>
        <Typography variant="h4" className={classes.title}>
          {/* <FormattedMessage {...messages.editClient} /> {type} */}
          <FormattedMessage {...messages.editOrder} />
        </Typography>
        {/* <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
          <Icon className={classNames(classes.icon, classes.signArrow)}>arrow_forward</Icon>
          <FormattedMessage {...messages.toAccount} />
        </Button> */}
      </div>

      <section>
        <ValidatorForm
          onSubmit={onSubmit}
          // onSubmit={handleSubmit}
          onError={errors => console.log('error goes here', errors)}
        >
          <Grid container spacing={3}>

            <Grid item xs={12} sm={6}>
              <TextValidator

                // placeholder={<FormattedMessage {...messages.enterQr} />}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label={<FormattedMessage {...messages.qr} />}
                name="qr_code"
                onChange={handleChange}
                value={formObj.qr_code}
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                // placeholder={<FormattedMessage {...messages.qr} />}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label={<FormattedMessage {...messages.orderNum} />}
                name="order_number"
                onChange={handleChange}
                value={formObj.order_number}
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                // placeholder="Choose Client"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={<FormattedMessage {...messages.client} />}
                name="client_id"
                onChange={handleChange}
                value={formObj.client_id}
                select
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              >
                {!clientsDetails
                  && <MenuItem />
                }
                {
                  clientsDetails.map(client => (
                    <MenuItem value={client.id}>{client.user_name}</MenuItem>
                  ))
                }
              </TextValidator>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                // placeholder="Choose Branch"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={<FormattedMessage {...messages.branch} />}
                name="branch_id"
                onChange={handleChange}
                value={formObj.branch_id}
                select
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              >
                {!clientsDetails
                  && <MenuItem />
                }
                {
                  clientsDetails.find(item => item.id == formObj.client_id) && clientsDetails.find(item => item.id == formObj.client_id).branches
                    .map(branch => (
                      <MenuItem value={branch.id}>{branch.name}</MenuItem>
                    ))
                }
              </TextValidator>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                // placeholder="Choose Sender Address"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={<FormattedMessage {...messages.senderAddress} />}
                name="sender_address_id"
                onChange={handleChange}
                value={formObj.sender_address_id}
                select
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              >
                {!clientsDetails
                  && <MenuItem />
                }
                {
                  clientsDetails.find(item => item.id == formObj.client_id) && clientsDetails.find(item => item.id == formObj.client_id).addresses
                    .map(address => {
                      if (address.type == 'S') {
                        return (
                          <MenuItem value={address.id}>
                            {address.name ? address.name : ''}
                            {address.street ? (',' + address.street) : ''}
                            {address.unit ? (',' + address.unit) : ''}
                            {address.floor ? (',' + address.floor) : ''}

                          </MenuItem>
                        );
                      }
                    })
                }
              </TextValidator>


            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                // placeholder="Choose receiver Address"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={<FormattedMessage {...messages.reciverAddress} />}

                name="receiver_address_id"
                onChange={handleChange}
                value={formObj.receiver_address_id}
                select
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              >
                {!clientsDetails
                  && <MenuItem />
                }
                {
                  clientsDetails.find(item => item.id == formObj.client_id) && clientsDetails.find(item => item.id == formObj.client_id).addresses
                    .map(address => {
                      if (address.type == 'R') {
                        return (

                          <MenuItem value={address.id}>
                            {address.name ? address.name : ''}
                            {address.street ? (',' + address.street) : ''}
                            {address.unit ? (',' + address.unit) : ''}
                            {address.floor ? (',' + address.floor) : ''}

                          </MenuItem>
                        );
                      }
                    })
                }
              </TextValidator>


            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                // placeholder="Choose plan "

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={<FormattedMessage {...messages.plan} />}
                name="price_model_id"
                onChange={handleChange}
                value={formObj.price_model_id}
                select
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              >
                {!clientsDetails
                  && <MenuItem />
                }
                {
                  clientsDetails.find(item => item.id == formObj.client_id) && clientsDetails.find(item => item.id == formObj.client_id).pricing_plan
                    .map(pricePlan => (
                      <MenuItem value={pricePlan.id}>
                        {pricePlan.name_en}

                      </MenuItem>
                    ))
                }
              </TextValidator>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                // placeholder="Choose payment method "

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={<FormattedMessage {...messages.paymentMethod} />}

                name="payment_method"
                onChange={handleChange}
                value={formObj.payment_method}
                select
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              >
                <MenuItem value="CASH"><FormattedMessage {...messages.cash} /></MenuItem>
                <MenuItem value="CREDIT"><FormattedMessage {...messages.credit} /></MenuItem>
              </TextValidator>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator

                // placeholder="Enter receiver name"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label={<FormattedMessage {...messages.receiverName} />}
                name="receiver_name"
                onChange={handleChange}
                value={formObj.receiver_name}
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                // placeholder="Enter receiver mobile"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={<FormattedMessage {...messages.receiverPhone} />}
                name="receiver_phone"
                onChange={handleChange}
                value={formObj.receiver_phone}
                validators={['required', `matchRegexp:${PHONE}`]}

                errorMessages={[<FormattedMessage {...messages.required} />, <FormattedMessage {...messages.phoneRegx} />]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator

                // placeholder="Enter quantity"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label={<FormattedMessage {...messages.quantity} />}
                name="quantity"
                onChange={handleChange}
                value={formObj.quantity}
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator

                // placeholder="Enter weight"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label={<FormattedMessage {...messages.weight} />}
                name="weight"
                onChange={handleChange}
                value={formObj.weight}
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                type="date"
                // placeholder="Enter pickup date"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label={<FormattedMessage {...messages.pickupDate} />}
                name="pickup_date"
                onChange={handleChange}
                value={formObj.pickup_date}
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextValidator
                type="time"
                // placeholder="Enter pickup date"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label={<FormattedMessage {...messages.pickupTime} />}
                name="pickup_time"
                onChange={handleChange}
                value={formObj.pickup_time}
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                // placeholder="Choose delivery type "

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={<FormattedMessage {...messages.type} />}
                name="is_immediate"
                onChange={handleChange}
                value={formObj.is_immediate}
                select
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              >
                <MenuItem value="YES"><FormattedMessage {...messages.immediatly} /></MenuItem>
                <MenuItem value="NO"><FormattedMessage {...messages.scheduled} /></MenuItem>
              </TextValidator>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator

                // placeholder="Enter notes"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                textarea
                label={<FormattedMessage {...messages.notes} />}
                name="notes"
                onChange={handleChange}
                value={formObj.notes}
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              />
            </Grid>


          </Grid>
          {/* <Button type="submit">Submit</Button> */}
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth disabled={loading} color="primary" type="submit">
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              {/* <FormattedMessage {...messages.continueCreate} /> */}
              <FormattedMessage {...messages.continueUpdate} />

              {/* {!loading && <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} disabled={submitting || pristine} />} */}
            </Button>
          </div>
        </ValidatorForm>


      </section>


    </Paper>
  );
}

EditForm.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  messagesAuth: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

EditForm.defaultProps = {
  messagesAuth: null
};

const EditFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(EditForm);


const reducer = 'clientsReducer';
const lookupsReducer = 'lookupsReducer';

const mapStateToProps = state => ({
  loading: state.get(reducer).loading,
  clientsDetails: state.get(lookupsReducer).clientsDetails,
  areas: state.get(lookupsReducer).areas,
  ...state,
});

const EditFormMapped = connect(
  mapStateToProps,
  { setLoading, }
)(EditForm);

export default withStyles(styles)(injectIntl(EditFormMapped));
