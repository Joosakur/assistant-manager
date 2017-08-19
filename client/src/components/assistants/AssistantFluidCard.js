import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Card, Header, Icon, Popup, Segment} from "semantic-ui-react";
import {SELF} from "../../constants/urls";
import CopyButton from "../common/CopyButton";

class AssistantFluidCard extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {assistant: {id, firstName, lastName, backgroundColor}, onEdit} = this.props;
    if(!backgroundColor)
      backgroundColor = "#333333";
    let archived = false;
    let shareLink = SELF.origin+SELF.scheduleShare+"/"+id;

    return (
      <Card fluid color="green">
        <Card.Content>
          <Header>
            <div className="float-left">
              <Icon circular bordered name="user" style={{color: backgroundColor}}/>
              {firstName} {lastName}
            </div>
            <div style={{float: "right"}}>
              {!archived &&
              <Popup
                className="assistant-share-popup"
                trigger={<Button icon="share alternate" content="Share"/>}
                header="Share link to assistant"
                content={
                  <div>
                    <p>
                      Your assistant may check his work schedule via this link: <br/>
                      <a href={shareLink} target="_blank">{shareLink}</a>
                    </p>
                    <p className="details">
                      Assistant's own work shifts are shown with the chosen color. Other assistant's shift are also
                      shown as dimmed, excluding archived assistants and sick leaves.
                    </p>
                    <Segment basic textAlign="right">
                      <ButtonGroup>
                        <Popup
                          trigger={<Button content="Send by email" icon="mail"/>}
                          content="Not yet implemented :("
                          size="tiny"
                          inverted
                        />
                        <Button.Or/>
                        <CopyButton text={shareLink} >
                          <Button id={"copy-btn-"+id} content="Copy to clipboard" icon="clipboard"/>
                        </CopyButton>
                      </ButtonGroup>
                    </Segment>

                  </div>

                }
                on="click"
                position="left center"
                wide="very"
              />
              }
              <Button onClick={onEdit} icon="edit" content="Edit"/>
            </div>
          </Header>
        </Card.Content>
      </Card>
    );
  }
}

AssistantFluidCard.propTypes = {
  assistant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    nickName: PropTypes.string,
    backgroundColor: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired
};

export default AssistantFluidCard;
