import React from "react";
import HeaderContainer from "../containers/HeaderContainer";
import Container from "semantic-ui-react/dist/es/elements/Container/Container";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <Container className="page-container">
            <h1>Assistant manager</h1>
            <p>Web-application for planning, tracking and reporting personal assistant working hours.</p>
          </Container>
        </Container>
      </div>
    );
  }
}

export default HomePage;
