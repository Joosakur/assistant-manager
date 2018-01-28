import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container} from "semantic-ui-react"
import moment from 'moment'
import DateContentRow from 'react-big-calendar/lib/DateContentRow'
import {getWorkShifts} from "../thunks/workShiftsThunk"
import {getAssistants} from "../thunks/assistantsThunk"
import HeaderContainer from "../containers/HeaderContainer"
import ScheduleContainer from "../containers/ScheduleContainer"

class SchedulePage extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    DateContentRow.prototype.getRowLimit = () => 7
    this.props.dispatch(getAssistants())
    let from = moment(new Date).date(1).add(-7, 'days').hours(0).minutes(0).second(0).millisecond(0).format()
    let to = moment(new Date).add(1, 'month').date(1).add(7, 'days').hours(0).minutes(0).second(0).millisecond(0).format()
    this.props.dispatch(getWorkShifts(from, to))
  }

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <ScheduleContainer/>
        </Container>
      </div>
    )
  }
}

SchedulePage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(SchedulePage)
