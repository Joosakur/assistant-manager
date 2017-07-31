import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {IndexLink, Link} from "react-router";
import {Icon, Menu} from "semantic-ui-react";
import UserHeader from './UserHeader';
import NoUserHeader from './NoUserHeader';
import {SELF} from "../../constants/urls";
import {loadAuth} from "../../thunks/loginThunk";

class AppHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    if(!this.props.authenticated)
      this.props.dispatch(loadAuth());
  }


  render() {
    return (
      <Menu id="header" fixed="top" inverted size="large">
        <Menu.Item as={IndexLink} to={SELF.home} activeClassName="active"><Icon name="home"/><div className="hide-mobile"> Home</div></Menu.Item>
        {this.props.authenticated && <Menu.Item as={Link} to={SELF.assistants} activeClassName="active"><Icon name="address book"/> Assistants</Menu.Item>}
        {this.props.authenticated && <Menu.Item as={Link} to={SELF.schedule} activeClassName="active"><Icon name="calendar"/> Work Schedule</Menu.Item>}
        {this.props.authenticated ? <UserHeader onLogout={this.props.onLogout}/> : <NoUserHeader/>}
      </Menu>
    );
  }
}

AppHeader.propTypes = {
  authenticated: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(AppHeader);
