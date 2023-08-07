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
import messages from './messages';
import styles from './module-jss';
import {
  ARABIC_REGX,
  ENGLISH_REGX,
  PHONE,
  LOCATION
} from '../../../helper/validations';
import { updateClientApi, getUserDataAPI } from './apis';
import { setLoading, storeUserData } from './actions';
import { handleErrorStatus, handleSuccessMessage } from '../../../helper/helper';


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
    storeUserData,
    roles

  } = props;

  const history = useHistory();
  const { id } = useParams();


  useEffect(() => {
    setLoading(true);

    getUserDataAPI(id).then(res => {
      storeUserData(res.data.data);
      setForm(res.data.data);
      setLoading(false);
    })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  const [formObj, setForm] = useState({});


  const handleChange = (event) => {
    setForm({
      ...formObj,
      [event.target.name]: event.target.value
    });
  };


  const onSubmit = (valueForm) => {
    const obj = {
      name_en: formObj.name_en,
      name_ar: formObj.name_ar,
      password: formObj.password,
      mobile: formObj.mobile,
      user_name: formObj.user_name,
      email: formObj.email,
      commercial_license_number: formObj.commercial_license_number,
      location: formObj.location,
      contract_number: formObj.contract_number,
      access_key: formObj.access_key,
      secret_key: formObj.secret_key,
      delivery_time_slot: formObj.delivery_time_slot,
      delivery_delay: formObj.delivery_delay,
      is_active: formObj.is_active,
      device_token: 'FFCSDKMMF',
      session: 'CHROME',
      device_type: 'React',
      device_model: 'DESKTOP',
    };

    setLoading(true);
    updateClientApi(id, obj).then(res => {
      setLoading(false);
      handleSuccessMessage('Client Updated successfully!');
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
          <FormattedMessage {...messages.editClient} />
          {' '}
          {type}
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
                placeholder="Enter user English name"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label="English Name"
                name="name_en"
                onChange={handleChange}
                value={formObj.name_en}
                validators={['required', `matchRegexp:${ENGLISH_REGX}`]}
                errorMessages={['this field is required', 'Only English characters allowed']}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator

                fullWidth
                label="Arabic Name"
                placeholder="Enter user Arabic name"

                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="name_ar"
                onChange={handleChange}
                value={formObj.name_ar}
                validators={['required', `matchRegexp:${ARABIC_REGX}`]}
                errorMessages={['this field is required', 'Only Arabic characters allowed']}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder="Enter user email"

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
                placeholder="Enter user mobile"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="mobile Number"
                name="mobile"
                onChange={handleChange}
                value={formObj.mobile}
                validators={['required', `matchRegexp:${PHONE}`]}

                errorMessages={['this field is required', 'Only phone degits allowed']}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder="Enter user password"

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
                placeholder="Choose Status "

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="role"
                name="role_id"
                onChange={handleChange}
                value={formObj.role_id}
                select
                validators={['required']}
                errorMessages={['this field is required']}
              >
                {roles.map(role => (
                  <MenuItem value={role.id}>{role.name}</MenuItem>
                ))}
              </TextValidator>
            </Grid>
            {
              (formObj.role_id == 11 || formObj.role_id == 12)
              && (
                <Fragment>
                  <Grid item xs={12} sm={4}>
                    <TextValidator
                      placeholder="Enter user reference id"

                      fullWidth
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}

                      label="reference id"
                      name="reference_id"
                      onChange={handleChange}
                      value={formObj.reference_id}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextValidator
                      placeholder="Enter user vehicle number"

                      fullWidth
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}

                      label="vehicle number"
                      name="vehicle_number"
                      onChange={handleChange}
                      value={formObj.vehicle_number}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextValidator
                      type="time"
                      placeholder="Enter pickup date"
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="working hours from"
                      name="from"
                      onChange={handleChange}
                      value={formObj.from}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextValidator
                      type="time"
                      placeholder="Enter pickup date"
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="working hours to"
                      name="to"
                      onChange={handleChange}
                      value={formObj.to}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                  </Grid>

                  {/* <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder='Enter user working hours'

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="working hours"
                name="working_hours"
                onChange={handleChange}
                value={formObj.working_hours}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid> */}

                  <Grid item xs={12} sm={4}>
                    <TextValidator
                      placeholder="Enter user comission "

                      fullWidth
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}

                      label="comission"
                      name="comission"
                      onChange={handleChange}
                      value={formObj.comission}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextValidator
                      placeholder="Enter user sim number"

                      fullWidth
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}

                      label="sim number"
                      name="sim_number"
                      onChange={handleChange}
                      value={formObj.sim_number}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                  </Grid>
                </Fragment>
              )
            }


            <Grid item xs={12} sm={4}>
              <TextValidator
                placeholder="Choose Status"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label="status"
                name="is_active"
                onChange={handleChange}
                value={formObj.is_active + ''}
                select
                validators={['required']}
                errorMessages={['this field is required']}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="block">Deactive</MenuItem>
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
const lookupsReducer = 'lookupsReducer';

const mapStateToProps = state => ({
  loading: state.get(reducer).loading,
  roles: state.get(lookupsReducer).roles,

  ...state,
});

const EditFormMapped = connect(
  mapStateToProps,
  { setLoading, storeUserData }
)(EditForm);

export default withStyles(styles)(injectIntl(EditFormMapped));
