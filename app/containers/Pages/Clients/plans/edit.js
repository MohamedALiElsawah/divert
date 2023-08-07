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
import messages from '../messages';
import styles from '../module-jss';
import MenuItem from '@material-ui/core/MenuItem';
import {
  ARABIC_REGX,
  ENGLISH_REGX,
  PHONE,
  LOCATION
} from "../../../../helper/validations";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { editPlanApi, getPlanDetailsApi } from '../apis'
import { setLoading, } from '../actions'
import { handleErrorStatus, handleSuccessMessage } from '../../../../helper/helper'

import { useHistory, useParams } from "react-router-dom";

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
  const { id } = useParams()

  const [formObj, setForm] = useState({})

  useEffect(() => {
    setLoading(true)

    getPlanDetailsApi(id).then(res => {
      // (res.data.data)
      setForm(res.data.data)
      
      setLoading(false)
     
    })
      .catch(err => {
        setLoading(false)

      })

  }, [])



  const handleChange = (event) => {
    setForm({
      ...formObj,
      [event.target.name]: event.target.value
    })
  }


  const onSubmit = (valueForm) => {


    let obj = {
      
      "name_en": formObj.name_en,
      "name_ar": formObj.name_ar,
      "client_id":formObj.client_id,
      "branch_id":formObj.branch_id,
      "pickup_area_id":formObj.pickup_area_id,
      "delivery_area_id":formObj.delivery_area_id,
      "price":formObj.price,
      "status": 1
    }

    setLoading(true)
    editPlanApi(id, obj).then(res => {
      setLoading(false)
      handleSuccessMessage('Plan Updated successfully!')
    })
      .catch(error => {
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
          {/* <FormattedMessage {...messages.editClient} /> {type} */}
          <FormattedMessage {...messages.editPlan} />
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
                placeholder={intl.formatMessage(messages.enterPlanEn)}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label={intl.formatMessage(messages.enName)}
                name="name_en"
                onChange={handleChange}
                value={formObj.name_en}
                validators={['required', `matchRegexp:${ENGLISH_REGX}`]}
                errorMessages={[<FormattedMessage {...messages.required} />, <FormattedMessage {...messages.englishOnly}/>]}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator

                fullWidth
                label={intl.formatMessage(messages.arName)}
                placeholder={intl.formatMessage(messages.enterPlanAr)}

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
                errorMessages={[<FormattedMessage {...messages.required} />]}
              >
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
                value={formObj.branch_id*1}
                select
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              >
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
                placeholder="Choose pickup area"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={intl.formatMessage(messages.pickupArea)}
                name="pickup_area_id"
                onChange={handleChange}
                value={formObj.pickup_area_id*1}
                select
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              >
                {
                  areas.map(area => (
                    <MenuItem value={area.id}>{area.name}</MenuItem>
                  ))
                }
              </TextValidator>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                placeholder="Choose delivery area"

                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}

                label={intl.formatMessage(messages.deliveryArea)}
                name="delivery_area_id"
                onChange={handleChange}
                value={formObj.delivery_area_id*1}
                select
                validators={['required']}
                errorMessages={[<FormattedMessage {...messages.required} />]}
              >
                {
                  areas.map(area => (
                    <MenuItem value={area.id}>{area.name}</MenuItem>
                  ))
                }
              </TextValidator>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                placeholder={intl.formatMessage(messages.enterPrice)}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label={intl.formatMessage(messages.price)}
                name="price"
                onChange={handleChange}
                value={formObj.price}
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
  ...state,
});

const EditFormMapped = connect(
  mapStateToProps,
  { setLoading, }
)(EditForm);

export default withStyles(styles)(injectIntl(EditFormMapped));
