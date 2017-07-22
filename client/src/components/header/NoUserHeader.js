import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router";
import {Menu} from "semantic-ui-react";

const NoUserHeader = () => {
  return (
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/login" activeClassName="active">Sign In</Menu.Item>
        <Menu.Item as={Link} to="/register" activeClassName="active">Sign Up</Menu.Item>
      </Menu.Menu>
  );
};

export default NoUserHeader;
