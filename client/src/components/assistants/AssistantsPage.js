import React, {PropTypes} from "react";
import {Link} from "react-router";

class AssistantsPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      assistant: {
        name: ""
      }
    }

    this.onNameChange = this.onNameChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onNameChange(event) {
    const assistant = this.state.assistant;
    assistant.name = event.target.value;
    this.setState({assistant: assistant})
  }

  onClickSave(event) {
    alert(`Saving ${this.state.assistant.name}`);
  }

  render() {
    return (
      <div>
        <h1>Assistants</h1>
        <h2>Add Assistant</h2>
        <input type="text" onChange={this.onNameChange} value={this.state.assistant.name}/>
        <input type="submit" onClick={this.onClickSave} value="Save"/>
        <br/>
        <Link to="/" className="ui big green button">Home</Link>
      </div>
    );
  }
}

export default AssistantsPage;
