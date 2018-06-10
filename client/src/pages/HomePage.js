import React, { Component, Fragment } from 'react'
import Container from 'semantic-ui-react/dist/es/elements/Container/Container'

import HeaderContainer from '../components/header/HeaderContainer'
import s from '../localization'

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container'>
            <h1>{s.home.title}</h1>
            <p>{s.home.p1}</p>
          </Container>
        </Container>
      </Fragment>
    )
  }
}

export default HomePage
