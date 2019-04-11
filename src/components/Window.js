import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

import "../styles/App.css";
import "../styles/Platforms.css";
import "react-table/react-table.css";
import "../styles/bootstrap.min.css";

class Window extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: this.props.show
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    var row = this.props.selectedRow.row;

    var data = this.props.displayData.map(function(column) {
      return (
        <p>
          {column.title}: {column.value}
        </p>
      );
    });

    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {row === undefined ? null : this.props.displayData[0].value}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {row === undefined ? null : (
            <React.Fragment>{data}</React.Fragment>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Window;
