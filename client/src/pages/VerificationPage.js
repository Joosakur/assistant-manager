import React from 'react';
import HeaderContainer from "../containers/HeaderContainer";
import Container from "semantic-ui-react/dist/es/elements/Container/Container";
import VerificationContainer from "../containers/VerificationContainer";

class VerificationPage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <Container className="page-container">
            <VerificationContainer token={this.props.location.query.token}/>
          </Container>
        </Container>
      </div>
    );
  }
}


export default VerificationPage;
