import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'react-big-calendar/lib/localizers/moment';
import moment from 'moment';
import {connect} from "react-redux";
import {loadAuth} from "../thunks/loginThunk";

class App extends React.Component {

  componentWillMount() {
    console.debug("app mounting");
    moment.updateLocale('en', {
      week: {
        dow: 1
      }
    });
    localizer(moment);

    this.props.dispatch(loadAuth());
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);
