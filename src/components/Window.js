import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

import "../styles/App.css";
import "react-table/react-table.css";
import "../styles/bootstrap.min.css";

//this is a component to create a pop up modal window
class Window extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: this.props.show
    };
  }

  //function to close the window
  handleClose() {
    this.setState({ show: false });
  }

  render() {
    var row = this.props.selectedRow.row;

    //create a line for each column title and the value that goes in
    var data = this.props.displayData.map(function(column) {
      return (
        <p key={column.title + column.value}>
          <b>{column.title}</b>: {column.value}
        </p>
      );
    });

    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          {/* title is the first value given */}
          <Modal.Title>
            {row === undefined ? null : (
              <b>{this.props.displayData[0].value}</b>
            )}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* list all the data */}
          {row === undefined ? null : <React.Fragment>{data}</React.Fragment>}
        </Modal.Body>

        <Modal.Footer>
          {/* can be closed via this button or closeButton */}
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Window;
