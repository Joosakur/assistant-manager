import React, { Component, Fragment } from "react"
import PropTypes from 'prop-types'
import HeaderContainer from "../components/header/HeaderContainer"
import Container from "semantic-ui-react/dist/es/elements/Container/Container"
import { localize } from 'react-localize-redux'

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container'>
            <h1>{this.props.translate('home.title')}</h1>
            <p>{this.props.translate('home.p1')}</p>
          </Container>
        </Container>
      </Fragment>
    )
  }
}

HomePage.propTypes = {
  translate: PropTypes.func.isRequired
}

export default localize(HomePage, 'locale')
