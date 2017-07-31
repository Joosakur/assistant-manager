import React from 'react';
import RegistrationContainer from '../containers/RegistrationContainer';
import HeaderContainer from "../containers/HeaderContainer";
import Container from "semantic-ui-react/dist/es/elements/Container/Container";

class RegistrationPage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <Container className="page-container">
            <RegistrationContainer/>
          </Container>
        </Container>
      </div>
    );
  }
}

export default RegistrationPage;
