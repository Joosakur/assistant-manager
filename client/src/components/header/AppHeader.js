import React from "react";
import PropTypes from "prop-types";
import {IndexLink, Link} from "react-router";
import {Icon, Menu} from "semantic-ui-react";
import UserHeader from './UserHeader';
import NoUserHeader from './NoUserHeader';
import {SELF} from "../../constants/urls";

class AppHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Menu id="header" fixed="top" inverted size="large">
        <Menu.Item as={IndexLink} to={SELF.home} activeClassName="active"><Icon name="home"/><div className="hide-mobile"> Home</div></Menu.Item>
        {this.props.authenticated && <Menu.Item as={Link} to={SELF.assistants} activeClassName="active"><Icon name="address book"/> Assistants</Menu.Item>}
        {this.props.authenticated && <Menu.Item as={Link} to={SELF.schedule} activeClassName="active"><Icon name="calendar"/> Work Schedule</Menu.Item>}
        {this.props.authenticated && <Menu.Item as={Link} to={SELF.reporting} activeClassName="active"><Icon name="text file outline"/> Reporting</Menu.Item>}
        {this.props.authenticated ? <UserHeader onLogout={this.props.onLogout} userData={this.props.userData}/> : <NoUserHeader/>}
      </Menu>
    );
  }
}

AppHeader.propTypes = {
  authenticated: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  })
};

export default AppHeader;
