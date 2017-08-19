import React from 'react';
import RegistrationContainer from '../containers/RegistrationContainer';
import HeaderContainer from "../containers/HeaderContainer";
import Container from "semantic-ui-react/dist/es/elements/Container/Container";
import {Divider} from "semantic-ui-react";

class RegistrationPage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <Container className="page-container narrow">
            <h1>Sign Up</h1>
            <h4>Please fill out your details.</h4>
            <Divider hidden/>
            <RegistrationContainer/>
          </Container>
        </Container>
      </div>
    );
  }
}

export default RegistrationPage;
