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
import { editGovernorateApi, getStatusDetailsApi } from '../apis'
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

  } = props;

  const history = useHistory();
  const { id } = useParams()


  useEffect(() => {
    setLoading(true)

    getStatusDetailsApi(id).then(res => {
      // (res.data.data)
      setForm(res.data.data)
      setLoading(false)

    })
      .catch(err => {
        setLoading(false)

      })

  }, [])

  const [formObj, setForm] = useState({})


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
      "type": 'type',
      "status": 1,

    }

    setLoading(true)
    editGovernorateApi(id, obj).then(res => {
      setLoading(false)
      handleSuccessMessage('Status Updated successfully!')
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
          Edit status
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
                validators={['required', `matchRegexp:${ENGLISH_REGX}`]}
                errorMessages={['this field is required', 'Only English characters allowed']}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
                validators={['required', `matchRegexp:${ARABIC_REGX}`]}
                errorMessages={['this field is required', 'Only Arabic characters allowed']}

              />
            </Grid>



          </Grid>


          {/* <Button type="submit">Submit</Button> */}
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth disabled={loading} color="primary" type="submit">
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              {/* <FormattedMessage {...messages.continueCreate} /> */}
              Update
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
  { setLoading, }
)(EditForm);

export default withStyles(styles)(injectIntl(EditFormMapped));
