import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Button, Popup, Segment} from 'semantic-ui-react'

import {SELF} from '../../constants/urls'
import CopyButton from '../common/CopyButton'
import s from '../../localization'

const SharePopup = ({id}) => {
  let shareLink = SELF.origin+SELF.scheduleShare+'/'+id

  return (
    <Popup
      className='assistant-share-popup'
      trigger={<Button icon='share alternate' content={s.assistants.buttons.share}/>}
      header={s.assistants.share.title}
      on='click'
      position='left center'
      wide='very'
      content={
        <Fragment>
          <p>
            {s.assistants.share.p1}<br/>
            <a href={shareLink} target='_blank'>{shareLink}</a>
          </p>
          <p className='details'>
            {s.assistants.share.p2}
          </p>
          <Segment basic textAlign='right'>
            <CopyButton text={shareLink} >
              <Button id={'copy-btn-'+id} content={s.assistants.share.copyBtn} icon='clipboard'/>
            </CopyButton>
          </Segment>
        </Fragment>
      }
    />
  )
}

SharePopup.propTypes = {
  id: PropTypes.string.isRequired
}

export default SharePopup
