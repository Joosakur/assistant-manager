import React from 'react';
import HeaderContainer from "../containers/HeaderContainer";
import Container from "semantic-ui-react/dist/es/elements/Container/Container";

class RegisteredPage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <Container className="page-container">
            <h1>Thank you for registering!</h1>
            <h3>Verification pending</h3>
            <p>Your email still needs to be verified. Please check your email and visit the verification link before
              logging in.</p>
          </Container>
        </Container>
      </div>
    );
  }
}

export default RegisteredPage;
