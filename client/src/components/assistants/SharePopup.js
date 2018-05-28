import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Button, Popup, Segment} from 'semantic-ui-react'
import {SELF} from '../../constants/urls'
import CopyButton from '../common/CopyButton'

const SharePopup = ({translate, id}) => {
  let shareLink = SELF.origin+SELF.scheduleShare+'/'+id

  return (
    <Popup
      className='assistant-share-popup'
      trigger={<Button icon='share alternate' content={translate('assistants.buttons.share')}/>}
      header={translate('assistants.share.title')}
      on='click'
      position='left center'
      wide='very'
      content={
        <Fragment>
          <p>
            {translate('assistants.share.p1')}<br/>
            <a href={shareLink} target='_blank'>{shareLink}</a>
          </p>
          <p className='details'>
            {translate('assistants.share.p2')}
          </p>
          <Segment basic textAlign='right'>
            <CopyButton text={shareLink} >
              <Button id={'copy-btn-'+id} content={translate('assistants.share.copyBtn')} icon='clipboard'/>
            </CopyButton>
          </Segment>
        </Fragment>
      }
    />
  )
}

SharePopup.propTypes = {
  id: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired
}

export default SharePopup
