import React from 'react'
import PropTypes from 'prop-types'
import Container from 'semantic-ui-react/dist/es/elements/Container/Container'
import {Divider, Icon, Message} from 'semantic-ui-react'
import {localize} from 'react-localize-redux'

import HeaderContainer from '../components/header/HeaderContainer'

class RegisteredPage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container'>
            <h1>{this.props.translate('signUp.verifying.title')}</h1>
            <Divider hidden/>
            <Message info floating icon size='large'>
              <Icon name='mail'/>
              <Message.Content>
                <Message.Header>{this.props.translate('signUp.verifying.subtitle')}</Message.Header>
                <p>{this.props.translate('signUp.verifying.p1')}</p>
              </Message.Content>
            </Message>
          </Container>
        </Container>
      </div>
    )
  }
}

RegisteredPage.propTypes = {
  translate: PropTypes.func.isRequired
}

export default localize(RegisteredPage, 'locale')
