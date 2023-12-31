import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import logo from 'enl-images/logo.png';
import brand from 'enl-api/dummy/brand';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import link from 'enl-api/ui/link';
import messages from './messages';
import SelectLanguage from '../SelectLanguage';
import SideNavMobile from './SideNavMobile';
import styles from './landingStyle-jss';


let counter = 0;
function createData(name, url) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
  };
}

function Header(props) {
  const { classes, turnDarker } = props;
  const [open, setOpen] = useState(false);
  const menuList = [
    // createData('feature', '#feature'),
    // createData('showcase', '#showcase'),
    // createData('technology', '#tech'),
    // createData('contact', '#contact')
  ];

  const toggleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Hidden lgUp>
        <SwipeableDrawer
          onClose={toggleDrawerClose}
          onOpen={toggleDrawerOpen}
          open={open}
          anchor="left"
        >
          <SideNavMobile menuList={menuList} closeDrawer={toggleDrawerClose} />
        </SwipeableDrawer>
      </Hidden>
      <AppBar
        className={
          classNames(
            classes.header,
            turnDarker && classes.darker,
            classes.solid
          )
        }
      >
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            aria-label="Menu"
            onClick={toggleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div className={classes.container}>
          <div className={classes.spaceContainer}>
            <nav>
              <Scrollspy items={['banner']}>
                <AnchorLink href="#banner" className={classes.brand}>
                  <img src={logo} alt={brand.name} />
                  {/* <FormattedMessage {...messages.brand} /> */}
                </AnchorLink>
              </Scrollspy>

              <Hidden mdDown>
                <Scrollspy items={['feature', 'showcase', 'tech', 'contact']} currentClassName="active">
                  { menuList.map(item => (
                    <li key={item.id.toString()}>
                      <Button component={AnchorLink} href={item.url}>
                        <FormattedMessage {...messages[item.name]} />
                      </Button>
                    </li>
                  )) }
                </Scrollspy>
              </Hidden>
            </nav>
            <Hidden mdDown>
              <div>
                <div className={classes.lang}>
                  <SelectLanguage />
                </div>


                <Button
                  color="secondary"
                  className={classes.button}
                  component={Link}
                  to={link.agentLogin}
                >
                  <FormattedMessage {...messages.agentLogin} />
                </Button>
                <Button
                  color="secondary"
                  className={classes.button}
                  component={Link}
                  to={link.clientLogin}
                >
                  <FormattedMessage {...messages.clientLogin} />
                </Button>
                {/* <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  component={Link}
                  to={link.register}
                >
                  <FormattedMessage {...messages.register} />
                </Button> */}
              </div>
            </Hidden>
          </div>
        </div>
      </AppBar>
    </Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  turnDarker: PropTypes.bool.isRequired,
};

export default withStyles(styles)(injectIntl(Header));
