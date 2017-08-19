import React from 'react';
import HeaderContainer from "../containers/HeaderContainer";
import Container from "semantic-ui-react/dist/es/elements/Container/Container";
import {Divider, Icon, Message} from "semantic-ui-react";

class RegisteredPage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <Container className="page-container">
            <h1>Thank you for registering!</h1>
            <Divider hidden/>
            <Message info floating icon size="large">
              <Icon name="mail"/>
              <Message.Content>
                <Message.Header>Email verification pending</Message.Header>
                <p>Your email still needs to be verified. Please check your email and visit the verification link before
                  logging in.</p>
              </Message.Content>
            </Message>
          </Container>
        </Container>
      </div>
    );
  }
}

export default RegisteredPage;
