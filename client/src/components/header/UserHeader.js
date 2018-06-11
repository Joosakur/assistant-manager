import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Menu} from 'semantic-ui-react'

import s from '../../localization'

const UserHeader = ({onLogout, userData: {firstName, lastName}}) => {
  return (
      <Menu.Menu position='right'>
        <Menu.Item header>{s.nav.loggedIn} {' '+firstName+' '+lastName}</Menu.Item>
        <Menu.Item onClick={onLogout}><Icon name='sign out'/> {s.nav.signOut}</Menu.Item>
      </Menu.Menu>
  )
}

UserHeader.propTypes = {
  onLogout: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired
}

export default UserHeader
