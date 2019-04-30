import React, { Component } from "react";
import { Button } from "react-bootstrap";

//this component is for the data display box that opens at the bottom of the screen
class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlatformDisplay: this.props.showPlatformDisplay
    };
  }

  render() {
    // iterate through all the data provided by the parent and display it
    var data = this.props.displayData.map(function(column) {
      return (
        <p key={column.title + column.value}>
          <b>{column.title}</b>: {column.value}
        </p>
      );
    });

    //return the data with the first column's data as the title
    return (
      <div id="data-display">
        <h3 id="display-title">{this.props.displayData[0].value}</h3>
        {data}
        {/* define a close button */}
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
