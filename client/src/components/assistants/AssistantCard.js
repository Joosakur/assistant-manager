import React from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Header, Icon} from 'semantic-ui-react'

import SharePopup from './SharePopup'
import s from '../../localization'

const AssistantCard = ({assistant: {id, firstName, lastName, backgroundColor}, onEdit}) => {
  if(!backgroundColor)
    backgroundColor = '#333333'
  let archived = false

  return (
    <Card fluid color='green'>
      <Card.Content>
        <Header>
          <div className='float-left'>
            <Icon circular bordered name='user' style={{color: backgroundColor}}/>
            {firstName} {lastName}
          </div>
          <div style={{float: 'right'}}>
            {!archived && <SharePopup id={id}/>}
            <Button onClick={onEdit} icon='edit' content={s.assistants.buttons.edit}/>
          </div>
        </Header>
      </Card.Content>
    </Card>
  )
}

AssistantCard.propTypes = {
  assistant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    nickName: PropTypes.string,
    backgroundColor: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired
}

export default AssistantCard
