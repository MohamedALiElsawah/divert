import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { NavLink, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm, SelectLanguage } from 'enl-components';
import logo from 'enl-images/logo.png';
import ArrowBack from '@material-ui/icons/ArrowBack';
import styles from 'enl-components/Forms/user-jss';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import messages from './messages';
import { setLoading, setError } from './authActions';
import { loginClientApi } from './authApis';


function Login({
  classes, setLoading, setError, state
}) {
  const title = brand.name + ' - Login';
  const description = brand.desc;

  const submitForm = (values) => {
    setLoading(true);

    loginClientApi(values.get('email'), values.get('password')).then(res => {
      Cookies.set('payload', res.data.data.token);
      Cookies.set('user_data', JSON.stringify(res.data.data.user));
      Cookies.set('user_type', 'client');
      setLoading(false);
      history.push('/app');
    }).catch(err => {
      setLoading(false);
      setError(err);
      setTimeout(() => {
        setError({});
      }, 3000);
    });
  };
  const history = useHistory();


  return (
    <div className={classes.rootFull}>
      <Helmet>
        <title>Welcome to Divert</title>
        {/* <meta name="description" content={description} /> */}
        {/* <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} /> */}
      </Helmet>
      <div className={classes.containerSide}>
        <Hidden smDown>
          <div className={classes.opening}>
            <div className={classes.openingWrap}>
              <div className={classes.openingHead}>
                <NavLink to="/" className={classes.brand}>
                  <img src={logo} alt={brand.name} />
                  {brand.name}
                </NavLink>
              </div>
              <Typography variant="h3" component="h1" gutterBottom>
                <FormattedMessage {...messages.welcomeTitle} />
                &nbsp;
                {brand.name}
              </Typography>
              <Typography variant="h6" component="p" className={classes.subpening}>
                <FormattedMessage {...messages.welcomeSubtitle} />
              </Typography>
            </div>
            <div className={classes.openingFooter}>
              <NavLink to="/" className={classes.back}>
                <ArrowBack />
                &nbsp;back to site
              </NavLink>
              <div className={classes.lang}>
                <SelectLanguage />
              </div>
            </div>
          </div>
        </Hidden>
        <div className={classes.sideFormWrap}>
          <LoginForm onSubmit={(values) => submitForm(values)} type="Client" />
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired,

};


const reducer = 'loginReducer';
const mapStateToProps = state => ({
  state: state.get(reducer)
});


const LoginFn = connect(
  mapStateToProps,
  { setLoading, setError }
)(Login);
export default withStyles(styles)(LoginFn);
