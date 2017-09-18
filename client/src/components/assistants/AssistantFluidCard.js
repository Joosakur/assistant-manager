import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Header, Icon, Popup, Segment} from "semantic-ui-react";
import {SELF} from "../../constants/urls";
import CopyButton from "../common/CopyButton";

class AssistantFluidCard extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {assistant: {id, firstName, lastName, backgroundColor}, onEdit, translate} = this.props;
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
                trigger={<Button icon="share alternate" content={translate('assistants.buttons.share')}/>}
                header={translate('assistants.share.title')}
                content={
                  <div>
                    <p>
                      {translate('assistants.share.p1')}<br/>
                      <a href={shareLink} target="_blank">{shareLink}</a>
                    </p>
                    <p className="details">
                      {translate('assistants.share.p2')}
                    </p>
                    <Segment basic textAlign="right">
                      <CopyButton text={shareLink} >
                        <Button id={"copy-btn-"+id} content={translate('assistants.share.copyBtn')} icon="clipboard"/>
                      </CopyButton>
                    </Segment>

                  </div>

                }
                on="click"
                position="left center"
                wide="very"
              />
              }
              <Button onClick={onEdit} icon="edit" content={translate('assistants.buttons.edit')}/>
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
  onEdit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
};

export default AssistantFluidCard;
