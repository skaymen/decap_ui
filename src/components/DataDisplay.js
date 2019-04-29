import React, { Component } from "react";
import { Button } from "react-bootstrap";

class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlatformDisplay: this.props.showPlatformDisplay
    };
  }

  render() {
    var data = this.props.displayData.map(function(column) {
      return (
        <p key={column.title + column.value}>
          <b>{column.title}</b>: {column.value}
        </p>
      );
    });

    return (
      <div id="data-display">
        <h3 id="display-title">{this.props.displayData[0].value}</h3>
        {data}
        <Button
          variant="secondary"
          id="close-button"
          onClick={() => {
            this.props.close();
          }}
        >
          Close
        </Button>
      </div>
    );
  }
}

export default DataDisplay;
