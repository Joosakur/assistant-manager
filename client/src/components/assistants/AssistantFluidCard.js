import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Card, Header, Icon} from "semantic-ui-react";

const AssistantFluidCard = (props) => {
  let {assistant: {firstName, lastName, backgroundColor}} = props;

  let archived = false;

  if(!backgroundColor)
    backgroundColor = "#333333";

  return (
    <Card fluid color="green">
      <Card.Content>
        <Header>
          <div className="float-left">
            <Icon circular bordered name="user" style={{color: backgroundColor}}/>
            {firstName} {lastName}
          </div>
          <ButtonGroup floated="right">
            {!archived && <Button className="hover-warning">Archive</Button>}
            {archived && <Button>Delete</Button>}
            {!archived && <Button secondary>Edit</Button>}
            {archived && <Button secondary>Reactivate</Button>}
          </ButtonGroup>
        </Header>
      </Card.Content>
    </Card>
  );
};

AssistantFluidCard.propTypes = {
  assistant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    nickName: PropTypes.string,
    backgroundColor: PropTypes.string.isRequired,
  }).isRequired
};

export default AssistantFluidCard;
