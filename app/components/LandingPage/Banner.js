import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import link from 'enl-api/ui/link';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './landingStyle-jss';

function Banner(props) {
  const { classes } = props;
  return (
    <div
      className={
        classNames(
          classes.banner,
          classes.fit
        )
      }
    >
      <svg className={classNames(classes.deco, classes.decoLeft)}>
        <use xlinkHref="/images/decoration/hexaDecoration.svg#decoration" />
      </svg>
      <svg className={classNames(classes.deco, classes.decoRight)}>
        <use xlinkHref="/images/decoration/hexaDecoration.svg#decoration" />
      </svg>
      <svg className={classNames(classes.deco, classes.decoBottom)}>
        <use xlinkHref="/images/decoration/hexaDecoration.svg#decoration" />
      </svg>
      <div className={classes.container}>
        <Typography component="h2" variant="h2" gutterBottom>Divert System</Typography>
        <Typography component="p" variant="h5" gutterBottom>
          <FormattedMessage {...messages.subtitle} />
        </Typography>

      </div>
    </div>
  );
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(injectIntl(Banner)));
