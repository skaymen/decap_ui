import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

//generic component for Dropdown items
class DropdownItems extends Component {
  render() {
    var changeFilter = this.props.changeFilter;

    //map each column header to its change function
    var items = this.props.columns.map(function(column) {
      return (
        <Dropdown.Item
          onClick={() => {
            changeFilter(column.Header);
          }}
        >
          {column.Header}
        </Dropdown.Item>
      );
    });

    return items;
  }
}

export default DropdownItems;
