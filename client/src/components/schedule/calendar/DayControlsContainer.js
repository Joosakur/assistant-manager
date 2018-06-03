import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import moment from 'moment'

import DayControls from './DayControls'
import {copyDay} from '../../../actions/ui/workShiftActions'
import {pasteDay} from '../../../actions/api/workShiftActions'
import {selCopiedDay} from '../../../selectors/pages/schedule'
import {selWorkShiftsByStartDate} from '../../../selectors/entities/workShifts'

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
  let copied = selCopiedDay(state)
  let events = selWorkShiftsByStartDate(date)(state)
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
