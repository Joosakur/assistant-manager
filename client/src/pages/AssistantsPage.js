import React from 'react';
import PropTypes from 'prop-types';
import {getAssistants} from "../thunks/assistantsThunk";
import {connect} from 'react-redux';
import AssistantListContainer from "../containers/AssistantListContainer";
import {Button, Container, Divider, Header, Icon} from "semantic-ui-react";
import HeaderContainer from "../containers/HeaderContainer";
import {startAssistantEdit} from "../actions/assistantActions";
import AssistantEditorContainer from "../containers/AssistantEditorContainer";
import { getTranslate } from 'react-localize-redux';


const addUserIcon = (
  <Icon.Group size="large" style={{marginRight: '2rem'}}>
    <Icon name="user"/><Icon name="add" color="green" corner/>
  </Icon.Group>
);

class AssistantsPage extends React.Component {

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
        <AssistantEditorContainer/>
        <Container fluid id="main-container">
          <Container className="page-container">
            <Header floated="left" as="h1"><Icon name="address book"/> {this.props.translate('assistants.title')}</Header>
            <Button primary size="large" floated="right" icon={addUserIcon}
                    content={this.props.translate('assistants.buttons.new')}
                    onClick={() => this.props.dispatch(startAssistantEdit(null))}/>
            <Divider hidden section clearing/>
            <AssistantListContainer/>
          </Container>
        </Container>
      </div>
    );
  }
}

AssistantsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    translate: getTranslate(state.locale),
  };
}

export default connect(mapStateToProps)(AssistantsPage);
