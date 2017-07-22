import React from "react";
import PropTypes from "prop-types";
import {IndexLink, Link} from "react-router";
import {Icon, Menu} from "semantic-ui-react";
import UserHeader from './UserHeader';
import NoUserHeader from './NoUserHeader';

const AppHeader = ({authenticated, onLogout}) => {
  return (
    <Menu id="header" fixed="top" inverted size="large">
      <Menu.Item as={IndexLink} to="/" activeClassName="active"><Icon name="home"/> Home</Menu.Item>
      <Menu.Item as={Link} to="/assistants" activeClassName="active"><Icon name="address book"/> Assistants</Menu.Item>
      <Menu.Item as={Link} to="/workshifts" activeClassName="active"><Icon name="calendar"/> Work Schedule</Menu.Item>
      {authenticated ? <UserHeader onLogout={onLogout}/> : <NoUserHeader/>}
    </Menu>
  );
};

AppHeader.propTypes = {
  authenticated: PropTypes.bool,
  onLogout: PropTypes.func.isRequired
};

export default AppHeader;
