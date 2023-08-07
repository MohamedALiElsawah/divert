import React, { useState, Fragment } from 'react';
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
import { createUserApi } from './apis';
import { setLoading } from './actions';
import { handleErrorStatus, handleSuccessMessage } from '../../../helper/helper';


function RegisterForm(props) {
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
    roles
  } = props;


  const [formObj, setForm] = useState({
    name_en: null,
    name_ar: null,
    email: null,
    mobile: null,
    password: null,
    role_id: null,
    reference_id: null,
    vehicle_number: null,
    working_hours: null,
    comission: null,
    sim_number: null,
    is_active: 'active',
  });


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
      email: formObj.email,
      mobile: formObj.mobile,
      password: formObj.password,
      role_id: formObj.role_id,
      reference_id: formObj.reference_id,
      vehicle_number: formObj.vehicle_number,
      working_hours: formObj.from + '-' + formObj.to,
      comission: formObj.comission,
      sim_number: formObj.sim_number,
      is_active: formObj.is_active == 'active',
    };

    setLoading(true);
    createUserApi(obj).then(res => {
      setLoading(false);
      handleSuccessMessage('User created successfully!');
      // setForm({})
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
          {/* <FormattedMessage {...messages.createClient} /> {type} */}
          Create User
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

RegisterForm.propTypes = {
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

RegisterForm.defaultProps = {
  messagesAuth: null
};

const RegisterFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(RegisterForm);


const reducer = 'clientsReducer';
const lookupsReducer = 'lookupsReducer';

const mapStateToProps = state => ({
  loading: state.get(reducer).loading,
  roles: state.get(lookupsReducer).roles,

  ...state,
});

const RegisterFormMapped = connect(
  mapStateToProps,
  { setLoading }
)(RegisterForm);

export default withStyles(styles)(injectIntl(RegisterFormMapped));
