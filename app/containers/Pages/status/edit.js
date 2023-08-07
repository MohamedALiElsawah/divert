import React, { useState, Fragment, useEffect } from 'react';
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
import { closeMsgAction } from 'enl-redux/actions/authActions';
import messages from './messages';
import styles from './module-jss';
import MenuItem from '@material-ui/core/MenuItem';
import {
  ARABIC_REGX,
  ENGLISH_REGX,
  PHONE,
  LOCATION
} from "../../../helper/validations";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {updateClientApi,getClientDataApi} from './apis'
import {setLoading,storeClientData} from './actions'
import {handleErrorStatus,handleSuccessMessage} from '../../../helper/helper'

import { useHistory,useParams } from "react-router-dom";

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
    storeClientData
  } = props;

  const history = useHistory();
  const { id } = useParams()


  useEffect(()=>{
    setLoading(true)

    getClientDataApi(id).then(res=>{
      storeClientData(res.data.data)
      setForm(res.data.data)
      setLoading(false)

    })
    .catch(err=>{
      setLoading(false)

    })

  },[])

  const [formObj, setForm] = useState({})


  const handleChange = (event) => {
    setForm({
      ...formObj,
      [event.target.name]: event.target.value
    })
  }

  
  const onSubmit = (valueForm) => {
      
      let obj ={
        "name_en": formObj.name_en,
        "name_ar": formObj.name_ar,
        "password": formObj.password,
        "mobile": formObj.mobile,
        "user_name": formObj.user_name,
        "email": formObj.email,
        "commercial_license_number": formObj.commercial_license_number,
        "location": formObj.location,
        "contract_number": formObj.contract_number,
        "access_key": formObj.access_key,
        "secret_key": formObj.secret_key,
        "delivery_time_slot": formObj.delivery_time_slot,
        "delivery_delay": formObj.delivery_delay,
        "is_active": formObj.is_active,
        "device_token": 'FFCSDKMMF',
        "session": "CHROME",
        "device_type": 'React',
        "device_model": 'DESKTOP',
    }
  
    setLoading(true)
    updateClientApi(id,obj).then(res=>{
      setLoading(false)
      handleSuccessMessage('Client Updated successfully!')
    })
    .catch(error =>{
      setLoading(false)
      handleErrorStatus(error)

    })

 }
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
          <FormattedMessage {...messages.editClient} /> {type}
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

        
            <Grid item xs={12} sm={4}>

              <TextValidator
                placeholder='Enter client English name'
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label="English Name"
                name="name_en"
                onChange={handleChange}
                value={formObj.name_en}
                validators={['required',`matchRegexp:${ENGLISH_REGX}`]}
                errorMessages={['this field is required','Only English characters allowed']}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
            
            fullWidth
            label="Arabic Name"
            placeholder='Enter client Arabic name'

            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            name="name_ar"
            onChange={handleChange}
            value={formObj.name_ar}
            validators={['required',`matchRegexp:${ARABIC_REGX}`]}
            errorMessages={['this field is required','Only Arabic characters allowed']}
              
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter client email'

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="Email"
                name="email"
                onChange={handleChange}
                value={formObj.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'Email is not valid']}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter client user name'

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="User Name"
                name="user_name"
                onChange={handleChange}
                value={formObj.user_name}
                validators={['required',`matchRegexp:${ENGLISH_REGX}`]}
                errorMessages={['this field is required','Only English characters allowed']}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter client mobile'

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="mobile Number"
                name="mobile"
                onChange={handleChange}
                value={formObj.mobile}
                validators={['required',`matchRegexp:${PHONE}`]}

                errorMessages={['this field is required','Only phone degits allowed']}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter client password'

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="Password "
                name="password"
                type="password"
                onChange={handleChange}
                value={formObj.password}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter client commercial license number'

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="Commercial License Number"
                name="commercial_license_number"
                onChange={handleChange}
                value={formObj.commercial_license_number}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter client location (ex. 30.770215, 31.961750)'

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="Location (ex. 30.770215, 31.961750)"
                name="location"
                onChange={handleChange}
                value={formObj.location}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter client contract number'

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="Contract Number"
                name="contract_number"
                onChange={handleChange}
                value={formObj.contract_number}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter client access key'

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="Access Key"
                name="access_key"
                onChange={handleChange}
                value={formObj.access_key}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter client secret key'

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="Secret Key"
                name="secret_key"
                onChange={handleChange}
                value={formObj.secret_key}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter client Delivery Time Slot '

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="Delivery Time Slot e.x(09:00-17:00)"
                name="delivery_time_slot"
                onChange={handleChange}
                value={formObj.delivery_time_slot}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter client delivery delay '

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="delivery delay (minutes)"
                name="delivery_delay"
                onChange={handleChange}
                value={formObj.delivery_delay}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Choose Status '
              
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="status"
                name="isActive"
                onChange={handleChange}
                value={formObj.isActive}
                select
                validators={['required']}
                errorMessages={['this field is required']}
              >
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='block'>Deactive</MenuItem>
              </TextValidator>
            </Grid>


          </Grid>
          {/* <Button type="submit">Submit</Button> */}
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth disabled={loading} color="primary" type="submit">
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              <FormattedMessage {...messages.continueCreate} />
              {!loading && <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} disabled={submitting || pristine} />}
            </Button>
          </div>
        </ValidatorForm>



      </section>


    </Paper>
  );
}

EditForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  messagesAuth: PropTypes.string,
  closeMsg: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  type: PropTypes.bool.isRequired,
};

EditForm.defaultProps = {
  messagesAuth: null
};

const EditFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(EditForm);



const reducer = 'clientsReducer';
const mapStateToProps = state => ({
  loading: state.get(reducer).loading,
  ...state,
});

const EditFormMapped = connect(
  mapStateToProps,
  {setLoading,storeClientData}
)(EditForm);

export default withStyles(styles)(injectIntl(EditFormMapped));
