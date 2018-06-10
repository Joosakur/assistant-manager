import React from 'react'
import Container from 'semantic-ui-react/dist/es/elements/Container/Container'
import {Divider, Icon, Message} from 'semantic-ui-react'

import HeaderContainer from '../components/header/HeaderContainer'
import s from '../localization'

class RegisteredPage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container'>
            <h1>{s.registered.title}</h1>
            <Divider hidden/>
            <Message info floating icon size='large'>
              <Icon name='mail'/>
              <Message.Content>
                <Message.Header>{s.registered.subtitle}</Message.Header>
                <p>{s.registered.p1}</p>
              </Message.Content>
            </Message>
          </Container>
        </Container>
      </div>
    )
  }
}

export default RegisteredPage
