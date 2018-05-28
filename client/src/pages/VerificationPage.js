import React from 'react'
import PropTypes from 'prop-types'
import HeaderContainer from "../components/header/HeaderContainer"
import Container from "semantic-ui-react/dist/es/elements/Container/Container"
import VerificationContainer from "../components/registration/VerificationContainer"
class VerificationPage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container'>
            <VerificationContainer token={this.props.location.query.token}/>
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
