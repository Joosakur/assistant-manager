import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Icon, Menu} from 'semantic-ui-react'
import UserHeader from './UserHeader'
import NoUserHeader from './NoUserHeader'
import {SELF} from '../../constants/urls'

class AppHeader extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Menu id='header' fixed='top' inverted size='large'>
        <Menu.Item as={Link} to={SELF.home} ><Icon name='home'/><div className='hide-mobile'> {this.props.translate('nav.home')}</div></Menu.Item>
        {
          this.props.authenticated && <Fragment>
            <Menu.Item as={Link} to={SELF.assistants} ><Icon name='address book'/> {this.props.translate('nav.assistants')}</Menu.Item>
            <Menu.Item as={Link} to={SELF.schedule} ><Icon name='calendar'/> {this.props.translate('nav.schedule')}</Menu.Item>
            <Menu.Item as={Link} to={SELF.reporting} ><Icon name='text file outline'/> {this.props.translate('nav.reporting')}</Menu.Item>
          </Fragment>
        }
        {
          this.props.authenticated
            ? <UserHeader onLogout={this.props.onLogout} userData={this.props.userData} translate={this.props.translate}/>
            : <NoUserHeader translate={this.props.translate}/>
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
  }),
  translate: PropTypes.func.isRequired
}

export default AppHeader
