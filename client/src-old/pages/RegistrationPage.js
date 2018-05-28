import React from 'react'
import PropTypes from 'prop-types'
import RegistrationContainer from '../components/registration/RegistrationContainer'
import HeaderContainer from "../components/header/HeaderContainer"
import Container from "semantic-ui-react/dist/es/elements/Container/Container"
import {Divider} from "semantic-ui-react"
import { localize } from 'react-localize-redux'

class RegistrationPage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <Container className="page-container narrow">
            <h1>{this.props.translate('signUp.title')}</h1>
            <h4>{this.props.translate('signUp.subtitle')}</h4>
            <Divider hidden/>
            <RegistrationContainer/>
          </Container>
        </Container>
      </div>
    )
  }
}

RegistrationPage.propTypes = {
  translate: PropTypes.func.isRequired
}

export default localize(RegistrationPage, "locale")
