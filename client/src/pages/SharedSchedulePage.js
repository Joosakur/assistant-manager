import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container} from "semantic-ui-react";
import moment from 'moment';
import DateContentRow from 'react-big-calendar/lib/DateContentRow';
import SharedScheduleContainer from "../containers/SharedScheduleContainer";
import {getWorkShifts} from "../thunks/workShiftsThunk";
import {getCoworkers} from "../thunks/assistantsThunk";

class SharedSchedulePage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    let assistantId = this.props.params.shareId;
    console.log(assistantId);
    DateContentRow.prototype.getRowLimit = () => 7;
    this.props.dispatch(getCoworkers(assistantId));
    let from = moment(new Date).date(1).add(-7, 'days').hours(0).minutes(0).second(0).millisecond(0).format();
    let to = moment(new Date).add(1, 'month').date(1).add(7, 'days').hours(0).minutes(0).second(0).millisecond(0).format();
    this.props.dispatch(getWorkShifts(from, to, assistantId));
  }

  render() {
    return (
      <div>
        <Container fluid id="main-container">
          <SharedScheduleContainer assistantId={this.props.params.shareId}/>
        </Container>
      </div>
    );
  }
}

SharedSchedulePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    shareId: PropTypes.string.isRequired
  }).isRequired
};

export default connect()(SharedSchedulePage);
