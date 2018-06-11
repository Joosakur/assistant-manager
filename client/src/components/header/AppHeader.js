import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Icon, Menu} from 'semantic-ui-react'

import UserHeader from './UserHeader'
import NoUserHeader from './NoUserHeader'
import {SELF} from '../../constants/urls'
import s from '../../localization'

class AppHeader extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Menu id='header' fixed='top' inverted size='large'>
        <Menu.Item as={Link} to={SELF.home} ><Icon name='home'/><div className='hide-mobile'> {s.nav.home}</div></Menu.Item>
        {
          this.props.authenticated && <Fragment>
            <Menu.Item as={Link} to={SELF.assistants} ><Icon name='address book'/> {s.nav.assistants}</Menu.Item>
            <Menu.Item as={Link} to={SELF.schedule} ><Icon name='calendar'/> {s.nav.schedule}</Menu.Item>
            <Menu.Item as={Link} to={SELF.reporting} ><Icon name='text file outline'/> {s.nav.reporting}</Menu.Item>
          </Fragment>
        }
        {
          this.props.authenticated
            ? <UserHeader onLogout={this.props.onLogout} userData={this.props.userData}/>
            : <NoUserHeader/>
        }
      </Menu>
    )
  }
}

AppHeader.propTypes = {
  authenticated: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  })
}

export default AppHeader
