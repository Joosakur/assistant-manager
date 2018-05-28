import React from 'react'
import PropTypes from 'prop-types'
import {getAssistants} from "../../src-old/thunks/assistantsThunk"
import {connect} from 'react-redux'
import {Container, Divider, Header, Icon, Message} from "semantic-ui-react"
import HeaderContainer from "../components/header/HeaderContainer"
import ReportContainer from "../components/reporting/ReportContainer"
import { getTranslate } from 'react-localize-redux'


class ReportingPage extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    this.props.dispatch(getAssistants())
  }

  render() {
    return (
      <div>
        <HeaderContainer/>
        <Container fluid id="main-container">
          <Container className="page-container">
            <Header floated="left" as="h1">
              <Icon name="text file"/>
              <Header.Content>
                {this.props.translate('reporting.title')}
                <Header.Subheader>{this.props.translate('reporting.subtitle')}</Header.Subheader>
              </Header.Content>
            </Header>
            <Divider hidden section clearing/>
            <p>
              {this.props.translate('reporting.p1')}
            </p>
            <Divider hidden clearing/>
            <ReportContainer/>
            <Divider hidden section clearing/>
            <Message warning>
              {this.props.translate('reporting.p2')}
            </Message>
          </Container>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.locale)
  }
}

ReportingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(ReportingPage)
