import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router";
import {Icon, Menu} from "semantic-ui-react";
import {SELF} from "../../constants/urls";

const NoUserHeader = ({translate}) => {
  return (
      <Menu.Menu position="right">
        <Menu.Item as={Link} activeClassName="active" to={SELF.login}><Icon name="sign in"/> {translate('nav.signIn')}</Menu.Item>
        <Menu.Item as={Link} activeClassName="active" to={SELF.register}> {translate('nav.signUp')}</Menu.Item>
      </Menu.Menu>
  );
};

NoUserHeader.propTypes = {
  translate: PropTypes.func.isRequired
};

export default NoUserHeader;
