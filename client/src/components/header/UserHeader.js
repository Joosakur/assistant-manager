import React from "react";
import PropTypes from "prop-types";
import {Icon, Menu} from "semantic-ui-react";

const UserHeader = ({onLogout}) => {
  return (
      <Menu.Menu position="right">
        <Menu.Item header>Logged in as Joosa</Menu.Item>
        <Menu.Item onClick={onLogout}><Icon name="sign out"/>Sign Out</Menu.Item>
      </Menu.Menu>
  );
};

UserHeader.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default UserHeader;
