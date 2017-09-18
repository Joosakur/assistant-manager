import React from "react";
import PropTypes from 'prop-types';
import HeaderContainer from "../containers/HeaderContainer";
import Container from "semantic-ui-react/dist/es/elements/Container/Container";
import { localize } from 'react-localize-redux';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <Container className="page-container">
            <h1>{this.props.translate('home.title')}</h1>
            <p>{this.props.translate('home.p1')}</p>
          </Container>
        </Container>
      </div>
    );
  }
}

HomePage.propTypes = {
  translate: PropTypes.func.isRequired
};


export default localize(HomePage, 'locale');
