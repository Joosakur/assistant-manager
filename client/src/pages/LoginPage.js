import React from 'react';
import LoginContainer from "../containers/LoginContainer";
import HeaderContainer from "../containers/HeaderContainer";
import {Container} from "semantic-ui-react";

class LoginPage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <Container className="page-container">
            <LoginContainer/>
          </Container>
        </Container>
      </div>
    );
  }
}

export default LoginPage;
