import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "semantic-ui-react";
import AssistantFluidCard from "./AssistantFluidCard";

const AssistantCardGroup = (props) => {
  let {assistants} = props;

  return (
    <Card.Group>
      {assistants.map((assistant) => <AssistantFluidCard key={assistant.id} assistant={assistant}/>)}
    </Card.Group>
  );
};

AssistantCardGroup.propTypes = {
    assistants: PropTypes.array.isRequired
};

export default AssistantCardGroup;
