import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Container, Divider, Header, Icon, Message} from 'semantic-ui-react'

import HeaderContainer from '../components/header/HeaderContainer'
import ReportContainer from '../components/reporting/ReportContainer'
import {listAssistants} from '../actions/api/assistantActions'
import s from '../localization'

class ReportingPage extends React.Component {

  componentDidMount() {
    this.props.listAssistants()
  }

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id='main-container'>
          <Container className='page-container'>
            <Header floated='left' as='h1'>
              <Icon name='text file'/>
              <Header.Content>
                {s.reporting.title}
                <Header.Subheader>{s.reporting.subtitle}</Header.Subheader>
              </Header.Content>
            </Header>
            <Divider hidden section clearing/>
            <p>
              {s.reporting.p1}
            </p>
            <Divider hidden clearing/>
            <ReportContainer/>
            <Divider hidden section clearing/>
            <Message warning>
              {s.reporting.p2}
            </Message>
          </Container>
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = {
  listAssistants
}

ReportingPage.propTypes = {
  listAssistants: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(ReportingPage)
