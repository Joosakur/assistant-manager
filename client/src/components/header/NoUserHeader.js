import React from 'react'
import {Link} from 'react-router-dom'
import {Icon, Menu} from 'semantic-ui-react'

import {SELF} from '../../constants/urls'
import s from '../../localization'

const NoUserHeader = () => {
  return (
      <Menu.Menu position='right'>
        <Menu.Item as={Link} to={SELF.login}><Icon name='sign in'/> {s.nav.signIn}</Menu.Item>
        <Menu.Item as={Link} to={SELF.register}> {s.nav.signUp}</Menu.Item>
      </Menu.Menu>
  )
}

export default NoUserHeader
