import React from 'react';
import PropTypes from 'prop-types';
import {Card, Icon} from "semantic-ui-react";

const AssistantFluidCard = ({firstName, lastName}) => {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <Icon name="user"/> {firstName} {lastName}
          </Card.Header>
        </Card.Content>
      </Card>
    );
};

AssistantFluidCard.propTypes = {
    //foobar: PropTypes.string.isRequired
};

export default AssistantFluidCard;
