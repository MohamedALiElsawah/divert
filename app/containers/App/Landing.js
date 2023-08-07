import React, { useEffect } from 'react';
import {
  Switch, Route, useHistory, useParams
} from 'react-router-dom';
import Cookies from 'js-cookie';
import Corporate from '../Templates/Corporate';
import { HomePage, NotFound } from '../pageListAsync';


function Landing() {
  const history = useHistory();

  useEffect(() => {
    console.log('check token here', Cookies.get('payload'));
    if (Cookies.get('payload')) {
      history.push('/app/order/list');
    }
  }, []);

  return (
    <Corporate>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    </Corporate>
  );
}

export default Landing;
