import React from "react";
import {Link} from "react-router";
import {Button} from "semantic-ui-react";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Assistant manager</h1>
        <p>Web-application for planning, tracking and reporting personal assistant working hours.</p>
        <Button as={Link} to='assistants' size='large' color='green' >Assistants</Button>
      </div>
    );
  }
}

export default HomePage;
