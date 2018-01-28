import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import DayControls from "../components/schedule/DayControls"
import moment from "moment"
import {copyDay} from "../actions/api/workShiftActions"
import {pasteDay} from "../thunks/workShiftsThunk"

class DayControlsContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <DayControls
        copy={this.props.copy}
        paste={this.props.paste}
        copyActive={this.props.thisCopied}
        copyEnabled={this.props.hasEvents}
        pasteEnabled={this.props.anyCopied && !this.props.thisCopied && !this.props.hasEvents}
      />
    )
  }
}

DayControlsContainer.propTypes = {
  copy: PropTypes.func.isRequired,
  paste: PropTypes.func.isRequired,
  thisCopied: PropTypes.bool,
  anyCopied: PropTypes.bool,
  hasEvents: PropTypes.bool
}

function mapStateToProps(state, ownProps) {
  let date = moment(ownProps.value)
  let copied = state.schedule.copiedDay
  let events = state.entities.workShiftsByStartDate [date.format("DD.MM.YYYY")]
  return {
    date,
    thisCopied: copied && date.isSame(copied),
    anyCopied: !!copied,
    hasEvents: events && events.length > 0
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  let date = moment(ownProps.value)
  return {
    copy: () => dispatch(copyDay(date)),
    paste: () => dispatch(pasteDay(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayControlsContainer)

