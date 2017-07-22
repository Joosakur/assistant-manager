import React from 'react';
import {getAssistants} from "../thunks/assistantsThunk";
import {connect} from 'react-redux';
import AssistantListContainer from "../containers/AssistantListContainer";
import {Button, Divider, Header, Icon} from "semantic-ui-react";

const addUserIcon = <Icon.Group size="large" style={{marginRight: '2rem'}}>
  <Icon name="user"/><Icon name="add" color="green" corner/>
</Icon.Group>;

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
        <Header floated="left" as='h1'><Icon name="address book"/> My Assistants</Header>
        <Button primary size="large" floated="right" icon={addUserIcon} content="Create new"/>
        <Divider hidden section clearing="both"/>
        <AssistantListContainer/>
      </div>
    );
  }
}

export default connect()(AssistantsPage);
