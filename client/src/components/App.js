import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'react-big-calendar/lib/localizers/moment';
import moment from 'moment';

class App extends React.Component {

  componentWillMount() {
    moment.updateLocale('en', {
      week: {
        dow: 1
      }
    });
    localizer(moment);

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
  children: PropTypes.element
};

export default App;
