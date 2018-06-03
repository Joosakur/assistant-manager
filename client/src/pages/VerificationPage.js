import React from 'react'
import PropTypes from 'prop-types'
import Container from 'semantic-ui-react/dist/es/elements/Container/Container'
import { parse } from 'query-string'

import HeaderContainer from '../components/header/HeaderContainer'
import VerificationContainer from '../components/verification/VerificationContainer'

class VerificationPage extends React.Component {
  render() {
    const token = parse(this.props.location.search).token
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container'>
            <VerificationContainer token={token}/>
          </Container>
        </Container>
      </div>
    )
  }
}

VerificationPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default VerificationPage
