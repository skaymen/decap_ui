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

    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.selectedRow.row === undefined
              ? null
              : this.props.selectedRow.row.platform}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.props.selectedRow.row === undefined ? null : (
            <React.Fragment>
              <p>Agency: {this.props.selectedRow.row.agency}</p>
              <p>Transport-ID: {this.props.selectedRow.row.transportid}</p>
              <p>Config: {this.props.selectedRow.row.config}</p>
              <p>Expiration: {this.props.selectedRow.row.expiration}</p>
              <p>Description: {this.props.selectedRow.row.description}</p>
            </React.Fragment>
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
