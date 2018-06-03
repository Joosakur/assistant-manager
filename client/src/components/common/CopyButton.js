import React from 'react'
import PropTypes from 'prop-types'
import {toastr} from 'react-redux-toastr'
import Clipboard from 'clipboard'

class CopyButton extends React.Component {
  componentDidMount() {
    let clipboard = new Clipboard('#'+this.props.children.props.id)
    clipboard.on('success', () => toastr.success('Success', 'Link was copied to the clipboard.'))
    clipboard.on('error', () => toastr.error('Error', 'Copy failed, please copy manually.'))
    this.cb=clipboard
  }

  componentWillUnmount() {
    this.cb.destroy()
  }

  render() {
    return (
      <div>{React.cloneElement(this.props.children, {'data-clipboard-text': this.props.text})}</div>
    )
  }
}

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default CopyButton
