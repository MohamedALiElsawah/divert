import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
import Edit from '@material-ui/icons/Edit';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import CounterWidget from '../Counter/CounterWidget';
import messages from './messages';
import styles from './widget-jss';


function CounterIconWidget(props) {
  const { classes, intl, statistics } = props;

  useEffect(() => {
    console.log('statistics', statistics);
  });
  return (
    <div className={classes.rootCounterFull}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color="secondary-dark"
            start={0}
            end={statistics && statistics.total_order}
            duration={3}
            title={<FormattedMessage {...messages.allOrders} />}
          // title={intl.formatMessage(messages.subscribers)}
          >
            <CallMissedOutgoingIcon className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
        {
          statistics && statistics.statuses.map(card => (
            <Grid item xs={6} md={3}>
              <CounterWidget
                color="secondary-main"
                start={0}
                end={card.count}
                duration={3}
                title={card.status_name}
              >
                <BookmarkBorderIcon className={classes.counterIcon} />
              </CounterWidget>
            </Grid>
          ))
        }

      </Grid>
    </div>
  );
}

CounterIconWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default withStyles(styles)(injectIntl(CounterIconWidget));
