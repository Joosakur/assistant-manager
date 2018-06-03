import React from 'react'
import {Loader, Segment} from 'semantic-ui-react'

const AuthLoader = () => {
  return (
    <Segment inverted style={{position: 'absolute', top:0, bottom:0, width: '100%', display: 'flex', alignItems: 'center'}}>
        <Loader active size='huge' content='Authenticating...'/>
    </Segment>
  )
}

export default AuthLoader

