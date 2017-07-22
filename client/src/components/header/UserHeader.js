import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router";
import {Menu} from "semantic-ui-react";

const UserHeader = (props) => {
  return (
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/logout" activeClassName="active">Sign In</Menu.Item>
      </Menu.Menu>
  );
};

UserHeader.propTypes = {
};

export default UserHeader;
