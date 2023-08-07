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
import { updateAddressApi, getAddressDetailsApi } from '../apis';
import { setLoading, } from '../actions';
import { handleErrorStatus, handleSuccessMessage } from '../../../../helper/helper';


import MapAddress from '../../../../components/Widget/AddressWidget';

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
    areas,
    addressDetails,

  } = props;

  const history = useHistory();
  const { id } = useParams();

  const [formObj, setForm] = useState({});

  useEffect(() => {
    setLoading(true);

    getAddressDetailsApi(id).then(res => {
      // (res.data.data)
      // setForm(res.data.data)
      setForm({
        // ...formObj,
        client_id: res.data.data.client.id,
        branch_id: res.data.data.branch.id,
        type: res.data.data.type,
        governorate_id: res.data.data.governorate.id,
        area_id: res.data.data.area.id,
        block_id: res.data.data.block.id,
        name: res.data.data.name,
        street: res.data.data.street,
        unit: res.data.data.unit,
        floor: res.data.data.floor,
        phone: res.data.data.phone,
        location: res.data.data.location,
        status: res.data.data.status,

      });
      setPin({
        lat: res.data.data.location.split(',')[0] * 1,
        lng: res.data.data.location.split(',')[1] * 1
      });

      setLoading(false);
    })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  const [pin, setPin] = useState(null);

  const getPin = (data) => {
    console.log('from parent', data);
    setPin(data);
    setForm({
      ...formObj,
      location: data.lat + ',' + data.lng
    });
  };
  const handleChange = (event) => {
    setForm({
      ...formObj,
      [event.target.name]: event.target.value
    });
    if (event.target.name == 'location') {
      const arr = event.target.value.split(',');
      const location = {
        lat: arr[0] * 1,
        lng: arr[1] * 1
      };

      setPin(location);
    }
  };


  const onSubmit = (valueForm) => {
    const obj = {

      name: formObj.name,
      client_id: formObj.client_id,
      branch_id: formObj.branch_id,
      street: formObj.street,
      unit: formObj.unit,
      floor: formObj.floor,
      phone: formObj.phone,
      block_id: formObj.block_id,
      area_id: formObj.area_id,
      governorate_id: formObj.governorate_id,
      type: formObj.type,
      location: formObj.location,
      status: formObj.status
    };

    setLoading(true);
    updateAddressApi(id, obj).then(res => {
      setLoading(false);
      handleSuccessMessage('Address Updated successfully!');
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
          Edit Address
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
                placeholder={intl.formatMessage(messages.choseClient)}

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={intl.formatMessage(messages.client)}
                name="client_id"
                onChange={handleChange}
                value={formObj.client_id * 1}
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
                placeholder="Choose Branch"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={intl.formatMessage(messages.branch)}
                name="branch_id"
                onChange={handleChange}
                value={formObj.branch_id * 1}
                select
                validators={['required']}
                errorMessages={['this field is required']}
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

                fullWidth
                placeholder={intl.formatMessage(messages.enterName)}
                label={intl.formatMessage(messages.name)}

                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="name"
                onChange={handleChange}
                value={formObj.name}
                validators={['required']}
                errorMessages={['this field is required']}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                placeholder="Choose governorate"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={intl.formatMessage(messages.governorate)}
                name="governorate_id"
                onChange={handleChange}
                value={formObj.governorate_id * 1}
                select
                validators={['required']}
                errorMessages={['this field is required']}
              >
                {!addressDetails
                     && <MenuItem />
                }

                {
                  addressDetails.map(address => (
                    <MenuItem value={address.id}>{address.name}</MenuItem>
                  ))
                }
              </TextValidator>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                label={intl.formatMessage(messages.area)}

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="area"
                name="area_id"
                onChange={handleChange}
                value={formObj.area_id * 1}
                select
                validators={['required']}
                errorMessages={['this field is required']}
              >
                {!addressDetails
                 && <MenuItem />
                }
                {
                  addressDetails.find(item => item.id == formObj.governorate_id) && addressDetails.find(item => item.id == formObj.governorate_id).area
                    .map(area => (
                      <MenuItem value={area.id}>{area.name}</MenuItem>
                    ))
                }
              </TextValidator>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                placeholder="Choose block"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={intl.formatMessage(messages.blockTitle)}
                name="block_id"
                onChange={handleChange}
                value={formObj.block_id * 1}
                select
                validators={['required']}
                errorMessages={['this field is required']}
              >
                {!addressDetails
                 && <MenuItem />
                }
                {
                  addressDetails.find(item => item.id == formObj.governorate_id)
                  && addressDetails.find(item => item.id == formObj.governorate_id).area
                  && addressDetails.find(item => item.id == formObj.governorate_id).area.find(areaItm => areaItm.id == formObj.area_id)
                  && addressDetails.find(item => item.id == formObj.governorate_id).area.find(areaItm => areaItm.id == formObj.area_id).block
                    .map(block => (
                      <MenuItem value={block.id}>{block.name}</MenuItem>
                    ))
                }
              </TextValidator>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator

                fullWidth
                label={intl.formatMessage(messages.street)}
                placeholder={intl.formatMessage(messages.enterStreet)}

                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="street"
                onChange={handleChange}
                value={formObj.street}
                validators={['required']}
                errorMessages={['this field is required']}

              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextValidator

                fullWidth
                label={intl.formatMessage(messages.unit)}
                placeholder={intl.formatMessage(messages.enterUnit)}

                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="unit"
                onChange={handleChange}
                value={formObj.unit}
                validators={['required']}
                errorMessages={['this field is required']}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
 label={intl.formatMessage(messages.floor)}
 placeholder={intl.formatMessage(messages.enterFloor)}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="floor"
                onChange={handleChange}
                value={formObj.floor}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
 label={intl.formatMessage(messages.phone)}
 placeholder={intl.formatMessage(messages.enterPhone)}

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                name="phone"
                onChange={handleChange}
                value={formObj.phone}
                validators={['required', `matchRegexp:${PHONE}`]}

                errorMessages={['this field is required', 'Only phone degits allowed']}
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextValidator
 label={intl.formatMessage(messages.addressType)}
 placeholder={intl.formatMessage(messages.enterAddressType)}
 
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                name="type"
                onChange={handleChange}
                value={formObj.type + ''}
                select
                validators={['required']}
                errorMessages={['this field is required']}
              >
                 <MenuItem value="S">{intl.formatMessage(messages.senderAddress)}</MenuItem>
                <MenuItem value="R">{intl.formatMessage(messages.reciverAddress)}</MenuItem>
              </TextValidator>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                placeholder={intl.formatMessage(messages.enterLocation)}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label={intl.formatMessage(messages.location)}
                name="location"
                onChange={handleChange}
                value={formObj.location}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>
            {
              pin

            && (
              <Grid item xs={12} sm={12}>
                <MapAddress getPin={getPin} pin={pin} />
              </Grid>
            )
            }


          </Grid>


          {/* <Button type="submit">Submit</Button> */}
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth disabled={loading} color="primary" type="submit">
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              {/* <FormattedMessage {...messages.continueCreate} /> */}
              <FormattedMessage {...messages.editBtn} />

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
  addressDetails: state.get(lookupsReducer).addressDetails,

  ...state,
});

const EditFormMapped = connect(
  mapStateToProps,
  { setLoading, }
)(EditForm);

export default withStyles(styles)(injectIntl(EditFormMapped));
