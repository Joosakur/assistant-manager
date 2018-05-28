import React from 'react'
import PropTypes from 'prop-types'
import localizer from 'react-big-calendar/lib/localizers/moment'
import moment from 'moment'
import {connect} from 'react-redux'
import {loadAuth} from '../actions/authActions'

class AppContainer extends React.Component {

  componentWillMount() {
    moment.updateLocale('en', {
      week: {
        dow: 1
      }
    })
    localizer(moment)

    this.props.dispatch(loadAuth())
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

AppContainer.propTypes = {
  children: PropTypes.any, // todo: right type
  dispatch: PropTypes.func.isRequired
}

export default connect()(AppContainer)
