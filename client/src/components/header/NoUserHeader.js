import React from "react";
import {Link} from "react-router";
import {Icon, Menu} from "semantic-ui-react";
import {SELF} from "../../constants/urls";

const NoUserHeader = () => {
  return (
      <Menu.Menu position="right">
        <Menu.Item as={Link} activeClassName="active" to={SELF.login}><Icon name="sign in"/> Sign In</Menu.Item>
        <Menu.Item as={Link} activeClassName="active" to={SELF.register}>Sign Up</Menu.Item>
      </Menu.Menu>
  );
};

export default NoUserHeader;
