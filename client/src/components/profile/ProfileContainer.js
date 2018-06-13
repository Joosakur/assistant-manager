import React, { Component } from 'react'

import Profile from './Profile'

class ProfileContainer extends Component {
  state = { }

  handleItemClick = (e, { name }) => this.setState({ activeTab: name })

  render() {
    const { activeTab } = this.state

    return (
      <Profile activeTab={activeTab} onTabChange={this.handleItemClick} />
    )
  }
}

export default ProfileContainer
