import React from "react";
import PropTypes from "prop-types";
import {Icon, Menu} from "semantic-ui-react";

const UserHeader = ({onLogout, userData: {firstName, lastName}}) => {
  return (
      <Menu.Menu position="right">
        <Menu.Item header>Logged in as {firstName+" "+lastName}</Menu.Item>
        <Menu.Item onClick={onLogout}><Icon name="sign out"/>Sign Out</Menu.Item>
      </Menu.Menu>
  );
};

UserHeader.propTypes = {
  onLogout: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired
};

export default UserHeader;
