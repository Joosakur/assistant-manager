import React from "react";
import PropTypes from "prop-types";
import {Icon, Menu} from "semantic-ui-react";

const UserHeader = ({onLogout, userData: {firstName, lastName}, translate}) => {
  return (
      <Menu.Menu position="right">
        <Menu.Item header>{translate('nav.loggedIn')} {" "+firstName+" "+lastName}</Menu.Item>
        <Menu.Item onClick={onLogout}><Icon name="sign out"/> {translate('nav.signOut')}</Menu.Item>
      </Menu.Menu>
  );
};

UserHeader.propTypes = {
  onLogout: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired,
  translate: PropTypes.func.isRequired
};

export default UserHeader;
