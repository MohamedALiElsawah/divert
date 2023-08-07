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
import { updateBranchApi, getBranchDetailsApi } from '../apis';
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

    clients
  } = props;

  const history = useHistory();
  const { id } = useParams();

  const [formObj, setForm] = useState({});

  useEffect(() => {
    setLoading(true);

    getBranchDetailsApi(id).then(res => {
      // (res.data.data)
      setForm(res.data.data);

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
      name: formObj.name,
      name_ar: formObj.name_ar,
      status: 1,
      client_id: formObj.client_id

    };

    setLoading(true);
    updateBranchApi(id, obj).then(res => {
      setLoading(false);
      handleSuccessMessage(intl.formatMessage(messages.branchEditedMsg));
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
          <FormattedMessage {...messages.editBranch} />
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
                placeholder={intl.formatMessage(messages.enterBranchEn)}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label={intl.formatMessage(messages.enName)}
                name="name"
                onChange={handleChange}
                value={formObj.name}
                validators={['required', `matchRegexp:${ENGLISH_REGX}`]}
                errorMessages={[<FormattedMessage {...messages.required} />, <FormattedMessage {...messages.englishOnly}/>]}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator

                fullWidth
                label={intl.formatMessage(messages.arName)}
                placeholder={intl.formatMessage(messages.arterBranchEn)}

                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="name_ar"
                onChange={handleChange}
                value={formObj.name_ar}
                validators={['required', `matchRegexp:${ARABIC_REGX}`]}
                errorMessages={[<FormattedMessage {...messages.required} />, <FormattedMessage {...messages.arabicOnly}/>]}

              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextValidator
                placeholder="Choose Client"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={intl.formatMessage(messages.client)}
                name="client_id"

                onChange={handleChange}
                value={formObj.client_id*1}
                select
                validators={['required']}
                errorMessages={<FormattedMessage {...messages.required} />}
              >
                {
                  clients.map(client => (
                    <MenuItem value={client.id}>{client.user_name}</MenuItem>
                  ))
                }


              </TextValidator>
            </Grid>


          </Grid>


          {/* <Button type="submit">Submit</Button> */}
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth disabled={loading} color="primary" type="submit">
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              {/* <FormattedMessage {...messages.editBtn} /> */}
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
  clients: state.get(lookupsReducer).clients,

  ...state,
});

const EditFormMapped = connect(
  mapStateToProps,
  { setLoading, }
)(EditForm);

export default withStyles(styles)(injectIntl(EditFormMapped));
