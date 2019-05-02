import React, { Component } from "react";
import ReactTable from "react-table";
import { Dropdown, DropdownButton } from "react-bootstrap";

import DropdownItems from "./DropdownItems.js";
import DBButtonToolbar from "./DBButtonToolbar.js";
import DataDisplay from "./DataDisplay.js";

import locationdata from "../data/locationdata.json";

//define columns for the data table
const columns = [
  {
    Header: "Number",
    accessor: "number" // String-based value accessors!
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Transmission ID",
    accessor: "transmission"
  },
  {
    Header: "Active",
    accessor: "active"
  },
  {
    Header: "Comments",
    accessor: "comments"
  }
];

//location component. operates similarly to configs / platforms
class Locations extends Component {
  constructor(props) {
    super(props);

    //bind functions
    this.changeFilter = this.changeFilter.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      selectedIndex: -1,
      selectedRow: {},
      search: "",
      show: false,
      filterState: "All"
    };
  }

  //filter on update
  changeFilter(newState) {
    this.setState({ filterState: newState });
  }

  //show datadisplay
  handleShow() {
    this.setState({ key: Math.random() });
    this.setState({ show: true });
  }

  //close datadisplay
  handleClose() {
    this.setState({ show: false });
  }

  //smooth scroll to bottom of document
  scrollToBottom = () => {
    var pfdis = document.getElementById("page-bottom");
    pfdis.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  //scroll to botton on mount
  componentDidMount() {
    this.scrollToBottom();
  }

  //scroll to bottom on update
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    let data = locationdata;

    //implement search function as in platforms / configs
    if (this.state.search) {
      data = data.filter(row => {
        switch (this.state.filterState) {
          case "Number":
            return row.number.includes(this.state.search);

          case "Name":
            return row.name.includes(this.state.search);

          case "Transmission ID":
            return row.transmission.includes(this.state.search);

          case "Active":
            return row.active.includes(this.state.search);

          case "Comments":
            return row.comments.includes(this.state.search);

          // search all columns
          default:
            return (
              row.number.includes(this.state.search) ||
              row.name.includes(this.state.search) ||
              row.transmission.includes(this.state.search) ||
              row.acive.includes(this.state.search) ||
              row.comments.includes(this.state.search)
            );
        }
      });
    }

    return (
      <div id="component-div">
        <div id="component-header" style={{ flexDirection: "row" }}>
          <h2 id="title"> Locations </h2>

          <div id="filter">
            {/* bring in DropdownItems component */}
            <DropdownButton id="filter-dropdown" title={this.state.filterState}>
              <DropdownItems
                columns={columns}
                filterState={this.state.filterState}
                changeFilter={this.changeFilter}
              />
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  this.changeFilter("All");
                }}
              >
                All
              </Dropdown.Item>
            </DropdownButton>
            <input
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
            />
          </div>
        </div>
        {/* set up data table */}
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          showPageSizeOptions={false}
          //this is code to make elements within the table selectable
          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: () => {
                  this.setState({
                    selectedIndex: rowInfo.index,
                    selectedRow: rowInfo
                  });
                },
                style: {
                  background:
                    rowInfo.index === this.state.selectedIndex
                      ? "#00afec"
                      : "white",
                  color:
                    rowInfo.index === this.state.selectedIndex
                      ? "white"
                      : "black"
                }
              };
            } else {
              return {};
            }
          }}
        />
        {/* bring in button toolbar component */}
        <DBButtonToolbar
          handleShow={this.handleShow}
          selectedIndex={this.state.selectedIndex}
        />
        {this.state.show ? (
          <div id="data-display-container">
            {/* bring in DataDisplay */}
            <DataDisplay
              close={this.handleClose}
              displayData={
                this.state.selectedRow.row === undefined
                  ? [{ title: "", value: "" }]
                  : [
                      {
                        title: "Number",
                        value: this.state.selectedRow.row.number
                      },
                      {
                        title: "Name",
                        value: this.state.selectedRow.row.name
                      },
                      {
                        title: "Transmission ID",
                        value: this.state.selectedRow.row.transmission
                      },
                      {
                        title: "Active",
                        value: this.state.selectedRow.row.active
                      },
                      {
                        title: "Comments",
                        value: this.state.selectedRow.row.comments
                      }
                    ]
              }
            />
          </div>
        ) : null}
        <div id="page-bottom" />
      </div>
    );
  }
}

export default Locations;
