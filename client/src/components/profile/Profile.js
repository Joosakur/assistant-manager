import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Menu } from 'semantic-ui-react'

import UserDetails from './UserDetails/UserDetailsFormContainer'
import PasswordChange from './PasswordChange/PasswordChangeFormContainer'
import s from '../../localization'

const TABS = ['userDetails', 'passwordChange']

const Profile = ({activeTab, onTabChange}) => (
  <Grid>
    <Grid.Column width={4}>
      <Menu fluid vertical tabular>
        { TABS.map(tab => (
          <Menu.Item name={tab} active={activeTab === tab} onClick={onTabChange} key={tab}>
            {s.profile.tabs[tab]}
          </Menu.Item>)
        ) }
      </Menu>
    </Grid.Column>

    <Grid.Column stretched width={12}>
      { activeTab === TABS[0] && <UserDetails /> }
      { activeTab === TABS[1] && <PasswordChange /> }
    </Grid.Column>
  </Grid>
)

Profile.propTypes = {
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func.isRequired
}

Profile.defaultProps = {
  activeTab: TABS[0]
}

export default Profile
