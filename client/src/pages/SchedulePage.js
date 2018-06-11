import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container} from 'semantic-ui-react'
import moment from 'moment'
import DateContentRow from 'react-big-calendar/lib/DateContentRow'

import HeaderContainer from '../components/header/HeaderContainer'
import ScheduleContainer from '../components/schedule/ScheduleContainer'
import {listAssistants} from '../actions/api/assistantActions'
import {listWorkShifts} from '../actions/api/workShiftActions'

class SchedulePage extends React.Component {

  componentWillMount() {
    DateContentRow.prototype.getRowLimit = () => 7

    this.props.loadAssistants()

    let from = moment(new Date).date(1).add(-7, 'days').hours(0).minutes(0).second(0).millisecond(0).format()
    let to = moment(new Date).add(1, 'month').date(1).add(7, 'days').hours(0).minutes(0).second(0).millisecond(0).format()
    this.props.loadWorkShifts(from, to)
  }

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <ScheduleContainer/>
        </Container>
      </div>
    )
  }
}

SchedulePage.propTypes = {
  loadAssistants: PropTypes.func.isRequired,
  loadWorkShifts: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  loadAssistants: () => dispatch(listAssistants()),
  loadWorkShifts: (from, to) => dispatch(listWorkShifts({from, to}))
})

export default connect(null, mapDispatchToProps)(SchedulePage)
