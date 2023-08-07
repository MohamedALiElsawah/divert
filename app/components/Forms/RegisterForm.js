import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import brand from 'enl-api/dummy/brand';
import logo from 'enl-images/logo.png';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { closeMsgAction } from 'enl-redux/actions/authActions';
import { CheckboxRedux, TextFieldRedux, SelectRedux } from './ReduxFormMUI';
import MessagesForm from './MessagesForm';
import messages from './messages';
import styles from './user-jss';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

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
    type
  } = props;




  const [role, useRole] = useState(0)
  const [formObj, setForm] = useState({})


  const handleChange=(event)=>{
    setForm({
      ...formObj,
      [event.target.name]:event.target.value
    })
  }
  const onSubmit =(formData)=>{
    console.log('formData',formData)
    console.log('formObj',formObj)

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
          <FormattedMessage {...messages.register} /> {type}
        </Typography>
        {/* <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
          <Icon className={classNames(classes.icon, classes.signArrow)}>arrow_forward</Icon>
          <FormattedMessage {...messages.toAccount} />
        </Button> */}
      </div>
      {
        messagesAuth !== null || ''
          ? (
            <MessagesForm
              variant="error"
              className={classes.msgUser}
              message={messagesAuth}
              onClose={closeMsg}
            />
          )
          : ''
      }
      <section>

        <ValidatorForm
          onSubmit={onSubmit}
          // onSubmit={handleSubmit}
          onError={errors => console.log('error goes here',errors)}
        >


          <Grid container spacing={3}>

          <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            label="English Name"
            name="enName"
            onChange={handleChange}
            value={formObj.enName}
            validators={['required']}
            errorMessages={['this field is required']}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            label="Arabic Name"
            name="arName"
            onChange={handleChange}
            value={formObj.arName}
            validators={['required']}
            errorMessages={['this field is required']}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            label="Email"
            name="email"
            onChange={handleChange}
            value={formObj.email}            
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            label="Phone Number"
            name="phone"
            onChange={handleChange}
            value={formObj.phone} 
            validators={['required']}
            errorMessages={['this field is required']}
          />
          </Grid>
          
          <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            label="Password "
            name="Password"
            onChange={handleChange}
            value={formObj.Password} 
            validators={['required']}
            errorMessages={['this field is required']}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            label="role"
            name="role"
            onChange={handleChange}
            value={formObj.role} 
            select
            validators={['required']}
            errorMessages={['this field is required', 'email is not valid']}
          >
            <MenuItem value='1'>sss</MenuItem>
            <MenuItem value='2'>sss</MenuItem>
            <MenuItem value='3'>sss</MenuItem>
          </TextValidator>
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            label="Reference Id "
            name="refId"
            onChange={handleChange}
            value={formObj.refId} 
            validators={['required']}
            errorMessages={['this field is required']}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            label="vehicle Number "
            name="vehicleNumber"
            onChange={handleChange}
            value={formObj.vehicleNumber}             
            validators={['required']}
            errorMessages={['this field is required']}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            label="Working Hours "
            name="workingHours"
            onChange={handleChange}
            value={formObj.workingHours}  
            validators={['required']}
            errorMessages={['this field is required']}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            label="comission "
            name="comission"
            onChange={handleChange}
            value={formObj.comission}  
            validators={['required']}
            errorMessages={['this field is required']}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            label="simNumber "
            name="simNumber"
            onChange={handleChange}
            value={formObj.simNumber} 
            validators={['required']}
            errorMessages={['this field is required']}
          />
          </Grid>

          </Grid>
          {/* <Button type="submit">Submit</Button> */}
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth disabled={loading} color="primary" type="submit">
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              <FormattedMessage {...messages.loginButtonContinue} />
              {!loading && <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} disabled={submitting || pristine} />}
            </Button>
          </div>
        </ValidatorForm>


        {/* <form onSubmit={handleSubmit}>

          <Grid container spacing={3}>


            <FormControl className={classes.formControl}
              validate={[required, email]}
            >
              <InputLabel htmlFor="name-simple">Name</InputLabel>
              <Input id="name-simple" required onChange={() => { }}
              />
            </FormControl>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="enName"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.registerFieldEnName)}
                  label={intl.formatMessage(messages.registerFieldEnName)}
                  required
                  className={classes.field}
                  value="www"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="arname"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.registerFieldArName)}
                  label={intl.formatMessage(messages.registerFieldArName)}
                  required
                  className={classes.field}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="email"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.registerFieldEmail)}
                  label={intl.formatMessage(messages.registerFieldEmail)}
                  required
                  validate={[required, email]}
                  className={classes.field}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="phone"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.registerFieldPhone)}
                  label={intl.formatMessage(messages.registerFieldPhone)}
                  required
                  className={classes.field}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>

            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="referenceId"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.registerFieldRef)}
                  label={intl.formatMessage(messages.registerFieldRef)}
                  required
                  className={classes.field}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="vehicleNumber"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.registerFieldvehicleNumber)}
                  label={intl.formatMessage(messages.registerFieldvehicleNumber)}
                  required
                  className={classes.field}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="workingHours"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.registerFieldWorkingHours)}
                  label={intl.formatMessage(messages.registerFieldWorkingHours)}
                  required
                  className={classes.field}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="comission"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.registerFieldComission)}
                  label={intl.formatMessage(messages.registerFieldComission)}
                  required
                  className={classes.field}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="simNumber"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.registerFieldSim)}
                  label={intl.formatMessage(messages.registerFieldSim)}
                  required
                  className={classes.field}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={TextFieldRedux}
                  type="password"
                  label={intl.formatMessage(messages.registerFieldpassword)}
                  required
                  validate={[required]}
                  className={classes.field}
                />
              </FormControl>
            </Grid>

          </Grid>
          <div>
            <FormControlLabel control={<Field name="activeCheck" required component={CheckboxRedux} className={classes.agree} />} label={intl.formatMessage(messages.registerFieldActive)} />

          </div>
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth disabled={loading} color="primary" type="submit">
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              <FormattedMessage {...messages.loginButtonContinue} />
              {!loading && <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall, classes.signArrow)} disabled={submitting || pristine} />}
            </Button>
          </div>
        </form> */}
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

const mapDispatchToProps = {
  closeMsg: closeMsgAction
};

const reducerAuth = 'authReducer';
const mapStateToProps = state => ({
  messagesAuth: state.get(reducerAuth).message,
  loading: state.get(reducerAuth).loading,
  ...state,
});

const RegisterFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterFormReduxed);

export default withStyles(styles)(injectIntl(RegisterFormMapped));
