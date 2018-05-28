import React, { Component, Fragment } from 'react'
import LoginContainer from "../components/login/LoginContainer"
import HeaderContainer from "../components/header/HeaderContainer"
import {Container} from "semantic-ui-react"

class LoginPage extends Component {
  render() {
    return (
      <Fragment>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container'>
            <LoginContainer/>
          </Container>
        </Container>
      </Fragment>
    )
  }
}

export default LoginPage
