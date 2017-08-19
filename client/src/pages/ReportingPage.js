import React from 'react';
import PropTypes from 'prop-types';
import {getAssistants} from "../thunks/assistantsThunk";
import {connect} from 'react-redux';
import AssistantListContainer from "../containers/AssistantListContainer";
import {Button, Container, Divider, Header, Icon} from "semantic-ui-react";
import HeaderContainer from "../containers/HeaderContainer";
import {startAssistantEdit} from "../actions/assistantActions";
import AssistantEditorContainer from "../containers/AssistantEditorContainer";
import ReportContainer from "../containers/ReportContainer";

class ReportingPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.dispatch(getAssistants());
  }

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <Container className="page-container">
            <Header floated="left" as="h1">
              <Icon name="text file"/>
              <Header.Content>
                Reporting
                <Header.Subheader>Export assistant work time reports for City's payment service</Header.Subheader>
              </Header.Content>
            </Header>
            <Divider hidden section clearing/>
            <ReportContainer/>
          </Container>
        </Container>
      </div>
    );
  }
}

ReportingPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(ReportingPage);
