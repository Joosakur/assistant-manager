import React from 'react'
import Container from 'semantic-ui-react/dist/es/elements/Container/Container'

import HeaderContainer from '../components/header/HeaderContainer'
import ProfileContainer from '../components/profile/ProfileContainer'

class ProfilePage extends React.Component {

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container'>
            <ProfileContainer/>
          </Container>
        </Container>
      </div>
    )
  }
}

export default ProfilePage
