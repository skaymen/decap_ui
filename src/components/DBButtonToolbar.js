import React, { Component } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import fileDownload from "js-file-download"
import CopyToClipboard from "react-copy-to-clipboard";

//button toolbar for table interaction functionality
class DBButtonToolbar extends Component {

  handleDownload(data) {
    fileDownload(data, this.props.filename);
  }

  render() {
    return (
      <ButtonToolbar id="buttonbar">
        <Button
          variant="primary"
          id="db-button"
          onClick={() => {
            if (this.props.selectedIndex >= 0) {
              //call the function to display the data (via Window/modal or DataDisplay)
              this.props.handleShow();
            } else {
              alert("nothing selected!");
            }
          }}
        >
          Open
        </Button>

        {/* button for create new. Doesn't do anything now. Database call should be passed in via props */}
        <Button
          variant="primary"
          id="db-button"
          onClick={() => {
            alert("Create new stuff goes here");
          }}
        >
          New
        </Button>

        {/* copying doesn't do anything either */}
        <CopyToClipboard text={JSON.stringify(this.props.selectedRow)}>
        <Button
          variant="primary"
          id="db-button"
          onClick={() => {
            if (this.props.selectedIndex >= 0) {
              alert("row copied!");
            } else {
              alert("nothing selected!");
            }
          }}
        >
          Copy
        </Button>
        </CopyToClipboard>

          {/* download json as file */}
        <Button
          variant="primary"
          id="db-button"
          onClick={() => {
            this.handleDownload(JSON.stringify(this.props.data));
          }}
        >
          {" "}
          Download{" "}
        </Button>

        {/* delete. same as copy and new */}
        <Button
          variant="danger"
          id="db-button"
          onClick={() => {
            if (this.props.selectedIndex >= 0) {
              this.props.handleDelete();
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
