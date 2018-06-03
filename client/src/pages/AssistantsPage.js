import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import {Button, Container, Divider, Header, Icon} from 'semantic-ui-react'

import AssistantsListContainer from '../components/assistants/AssistantsListContainer'
import HeaderContainer from '../components/header/HeaderContainer'
import AssistantEditorContainer from '../components/assistants/edit/AssistantEditorContainer'
import {openAssistantModal} from '../actions/ui/assistantActions'
import {listAssistants} from '../actions/api/assistantActions'


const addUserIcon = (
  <Icon.Group size='large' style={{marginRight: '2rem'}}>
    <Icon name='user'/><Icon name='add' color='green' corner/>
  </Icon.Group>
)

class AssistantsPage extends React.Component {

  componentDidMount() {
    this.props.loadAssistants()
  }

  render() {
    const {translate, openCreateAssistantDialog} = this.props

    return (
      <Fragment>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container'>
            <Header floated='left' as='h1'><Icon name='address book'/> {translate('assistants.title')}</Header>
            <Button primary size='large' floated='right' icon={addUserIcon}
                    content={translate('assistants.buttons.new')}
                    onClick={openCreateAssistantDialog}/>
            <Divider hidden section clearing/>
            <AssistantsListContainer/>
          </Container>
        </Container>
        <AssistantEditorContainer/>
      </Fragment>
    )
  }
}

AssistantsPage.propTypes = {
  translate: PropTypes.func.isRequired,
  loadAssistants: PropTypes.func.isRequired,
  openCreateAssistantDialog: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.locale),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadAssistants: () => dispatch(listAssistants()),
    openCreateAssistantDialog: () => dispatch(openAssistantModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssistantsPage)
