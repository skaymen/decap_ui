import React, { Component } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";

//button toolbar for table interaction functionality
class DBButtonToolbar extends Component {
  render() {
    return (
      <ButtonToolbar id="buttonbar">
        <Button
          variant="primary"
          id="platform-button"
          onClick={() => {
            if (this.props.selectedIndex >= 0) {
              //call the function to display the data modal
              this.props.handleShow();
            } else {
              alert("nothing selected!");
            }
          }}
        >
          Open
        </Button>

        <Button
          variant="primary"
          id="platform-button"
          onClick={() => {
            alert("Create new stuff goes here");
          }}
        >
          New
        </Button>

        <Button
          variant="primary"
          id="platform-button"
          onClick={() => {
            if (this.props.selectedIndex) {
              alert("copy row " + this.props.selectedIndex);
            } else {
              alert("nothing selected!");
            }
          }}
        >
          Copy
        </Button>

        <Button
          variant="danger"
          id="platform-button"
          onClick={() => {
            if (this.props.selectedIndex) {
              alert("delete row " + this.props.selectedIndex);
            } else {
              alert("nothing selected!");
            }
          }}
        >
          Delete
        </Button>
      </ButtonToolbar>
    );
  }
}

export default DBButtonToolbar;
