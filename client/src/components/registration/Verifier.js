import React from 'react';
import {Button, Icon, Loader, Message, Segment} from "semantic-ui-react";
import PropTypes from 'prop-types';
import {Link} from "react-router";
import {SELF} from "../../constants/urls";


class Verifier extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    let {loading, error, msg} = this.props;
    return (
      <div>
        {loading && (
          <Segment inverted style={{position: 'absolute', top:0, bottom:0, width: '100%', display: 'flex', alignItems: 'center'}}>
            <Loader active size="huge" content="Verifying..."/>
          </Segment>
        )}
        {!loading && error && (
          <Message negative floating icon>
            <Icon name="frown"/>
            <Message.Content>
              <Message.Header>Oops, something went wrong with verification</Message.Header>
              <p>{error}</p>
            </Message.Content>
          </Message>
        )}
        {!loading && !error && (
          <Message positive floating icon size="big">
            <Icon name="checkmark"/>
            <Message.Content>
              <Message.Header>{msg["signUp.verified.title"]}</Message.Header>
              <p>{msg["signUp.verified.subtitle"]}</p>
            </Message.Content>
            <Button as={Link} to={SELF.login} primary floated="right">
              {msg["signUp.verified.proceedBtn"]+" "}<Icon name="arrow right"/>
            </Button>
          </Message>
        )}

      </div>
    );
  }

}

Verifier.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onMount: PropTypes.func.isRequired,
  msg: PropTypes.object.isRequired
};

export default Verifier;

