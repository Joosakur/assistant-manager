import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Divider, Header, Icon, Message} from 'semantic-ui-react'
import { getTranslate } from 'react-localize-redux'

import HeaderContainer from '../components/header/HeaderContainer'
import ReportContainer from '../components/reporting/ReportContainer'
import {listAssistants} from '../actions/api/assistantActions'

class ReportingPage extends React.Component {

  componentDidMount() {
    this.props.listAssistants()
  }

  render() {
    const { translate } = this.props
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container'>
            <Header floated='left' as='h1'>
              <Icon name='text file'/>
              <Header.Content>
                {translate('reporting.title')}
                <Header.Subheader>{translate('reporting.subtitle')}</Header.Subheader>
              </Header.Content>
            </Header>
            <Divider hidden section clearing/>
            <p>
              {translate('reporting.p1')}
            </p>
            <Divider hidden clearing/>
            <ReportContainer/>
            <Divider hidden section clearing/>
            <Message warning>
              {translate('reporting.p2')}
            </Message>
          </Container>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.locale)
  }
}

const mapDispatchToProps = {
  listAssistants
}

ReportingPage.propTypes = {
  translate: PropTypes.func.isRequired,
  listAssistants: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportingPage)
