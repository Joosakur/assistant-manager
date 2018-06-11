import React from 'react'
import Container from 'semantic-ui-react/dist/es/elements/Container/Container'
import {Divider} from 'semantic-ui-react'

import RegistrationContainer from '../components/registration/RegistrationContainer'
import HeaderContainer from '../components/header/HeaderContainer'
import s from '../localization'

class RegistrationPage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container narrow'>
            <h1>{s.signUp.title}</h1>
            <Divider hidden/>
            <RegistrationContainer/>
          </Container>
        </Container>
      </div>
    )
  }
}

export default RegistrationPage
