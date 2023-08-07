import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotFound from '../Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import LandingCorporate from './Landing';
import ThemeWrapper from './ThemeWrapper';
import {
  getGovernorateApi, getAreasApis, getReasonsApi, getClientsApi, getRolesApi, getClientsLookupsApi, getAddressLookupsApi
} from './apis';
import {
  storeGovernorates, storeAreas, storeReasons, storeClients, storeRoles, storeClientDetails, storeAddresslookups
} from './actions';

import { changeDirectionAction } from '../../redux/actions/uiActions';
import { changeLocale2 } from '../LanguageProvider/actions';
import Cookies from 'js-cookie';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App({
  storeGovernorates, changeDirectionAction, changeLocale2, storeAreas, storeReasons, storeClients, storeRoles, storeClientDetails, storeAddresslookups
}) {
  useEffect(() => {
    let lang=Cookies.get('lang')
    if(lang){
      changeLocale2(lang);
      if (lang === 'ar') {
        document.dir = 'rtl';
        changeDirectionAction('rtl');
      } else {
        document.dir = 'ltr';
        changeDirectionAction('ltr');
      }
    }
    
  }, []);


  useEffect(() => {
    getGovernorateApi().then(res => {
      storeGovernorates(res.data);
    })
      .catch(err => {

      });
    getAreasApis().then(res => {
      storeAreas(res.data);
    })
      .catch(err => {

      });
    getReasonsApi().then(res => {
      storeReasons(res.data);
    })
      .catch(err => {

      });
    getClientsApi().then(res => {
      storeClients(res.data);
    })
      .catch(err => {

      });

    getRolesApi().then(res => {
      storeRoles(res.data);
    })
      .catch(err => {

      });

    getClientsLookupsApi().then(res => {
      storeClientDetails(res.data);
    })
      .catch(err => {

      });
    getAddressLookupsApi().then(res => {
      storeAddresslookups(res.data);
    })
      .catch(err => {

      });
  }, []);
  return (
    <ThemeWrapper>
      <Switch>
        <Route path="/" exact component={LandingCorporate} />
        <Route path="/app" component={Application} />
        <Route component={Auth} />
        <Route component={NotFound} />
      </Switch>
    </ThemeWrapper>
  );
}

App.propTypes = {
  storeAreas: PropTypes.func.isRequired,
  storeGovernorates: PropTypes.func.isRequired,
  storeReasons: PropTypes.func.isRequired,
  changeLocale: PropTypes.func.isRequired,


};


const reducer = 'lookupsReducers';
const mapStateToProps = state => ({
  ...state,
});


export default
connect(
  mapStateToProps,
  {
    storeAreas, storeGovernorates, changeDirectionAction, changeLocale2, storeReasons, storeClients, storeRoles, storeClientDetails, storeAddresslookups
  }
)(App);
