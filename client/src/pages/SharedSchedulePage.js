import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container} from 'semantic-ui-react'
import moment from 'moment'
import DateContentRow from 'react-big-calendar/lib/DateContentRow'

import SharedScheduleContainer from '../components/schedule/shared/SharedScheduleContainer'
import {listWorkShifts} from '../actions/api/workShiftActions'
import {listCoworkers} from '../actions/api/assistantActions'

class SharedSchedulePage extends React.Component {

  componentWillMount() {
    const { listCoworkers, listWorkShifts, match: { params: { shareId: assistantId } } } = this.props
    DateContentRow.prototype.getRowLimit = () => 7
    listCoworkers(assistantId)
    let from = moment(new Date).date(1).add(-7, 'days').hours(0).minutes(0).second(0).millisecond(0).format()
    let to = moment(new Date).add(1, 'month').date(1).add(7, 'days').hours(0).minutes(0).second(0).millisecond(0).format()
    listWorkShifts({from, to, assistantId})
  }

  render() {
    const { match: { params: { shareId: assistantId } } } = this.props
    return (
      <div>
        <Container fluid id='main-container'>
          <SharedScheduleContainer assistantId={assistantId}/>
        </Container>
      </div>
    )
  }
}

SharedSchedulePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      shareId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  listWorkShifts: PropTypes.func.isRequired,
  listCoworkers: PropTypes.func.isRequired
}

export default connect(null, {
  listWorkShifts,
  listCoworkers
})(SharedSchedulePage)
