import React, { Component } from "react";
import ReactTable from "react-table";
import { Dropdown, DropdownButton } from "react-bootstrap";

import DropdownItems from "./DropdownItems.js";
import DBButtonToolbar from "./DBButtonToolbar.js";
import DataDisplay from "./DataDisplay.js";

import configdata from "../data/configdata.json";

//define columns for the data table
const columns = [
  {
    Header: "Name",
    accessor: "name", // String-based value accessors!
    width: 300
  },
  {
    Header: "Binary / ASCII",
    accessor: "binascii",
    width: 200
  },
  {
    Header: "Parameters",
    accessor: "params",
    width: 300
  },
  {
    Header: "Transmission Interval",
    accessor: "interval",
    width: 300
  },
  {
    Header: "# Platforms",
    accessor: "numplats",
    width: 200
  },
  {
    Header: "Description",
    accessor: "description"
  }
];

//this class implements the same table setup as sites and platforms
class Configurations extends Component {
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
      filterState: "All",
    };
  }

  //function that searches when text is entered in filter
  changeFilter(newState) {
    this.setState({ filterState: newState });
  }

  //function to show the data display box
  handleShow() {
    this.setState({ key: Math.random() });
    this.setState({ show: true });
  }

  //close the data display box
  handleClose() {
    this.setState({ show: false });
  }

  //scroll down to the bottom of the page
  scrollToBottom = () => {
    var pfdis = document.getElementById("page-bottom");
    pfdis.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  //scroll to bottom when adding a component or updating
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    let data = configdata;

    //filter based on dropdown select and what is entered in text box
    if (this.state.search) {
      data = data.filter(row => {
        switch (this.state.filterState) {
          case "Name":
            return row.name.includes(this.state.search);

          case "Binary / ASCII":
            return row.binascii.includes(this.state.search);

          case "Parameters":
            return row.params.includes(this.state.search);

          case "Transmission Interval":
            return row.interval.includes(this.state.search);

          case "Number of Platforms":
            return row.numplats.includes(this.state.search);

          case "Description":
            return row.description.includes(this.state.search);

          // search all columns
          default:
            return (
              row.name.includes(this.state.search) ||
              row.binascii.includes(this.state.search) ||
              row.params.includes(this.state.search) ||
              row.interval.includes(this.state.search) ||
              row.numplats.includes(this.state.search) ||
              row.description.includes(this.state.search)
            );
        }
      });
    }

    return (
      <div id="component-div">
        <div id="component-header" style={{ flexDirection: "row" }}>
          <h2 id="title"> Configurations </h2>

          {/* set up filter dropdown, bringing in external component DropdownItems */}
          <div id="filter">
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
            {/* this is the filterbox, which searches immediately when text is entered */}
            <input
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
            />
          </div>
        </div>
        {/* set up the data table */}
        <ReactTable
          data={data}
          columns={columns}
          // set the default number of rows to display. take away ability to change thos.
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
        {/* bring in external DBButtonToolbar component */}
        <DBButtonToolbar
          handleShow={this.handleShow}
          selectedIndex={this.state.selectedIndex}
          data={data}
          filename='configurations.json'
        />
        {this.state.show ? (
          <div id="data-display-container">
          {/* this brings in the DataDisplay component so data can be opened at the bottom of the screen */}
            <DataDisplay
              close={this.handleClose}
              displayData={
                this.state.selectedRow.row === undefined
                  ? [{ title: "", value: "" }]
                  : [
                      {
                        title: "Name",
                        value: this.state.selectedRow.row.name
                      },
                      {
                        title: "Binary / ASCII",
                        value: this.state.selectedRow.row.binascii
                      },
                      {
                        title: "Parameters",
                        value: this.state.selectedRow.row.params
                      },
                      {
                        title: "Transmission Interval",
                        value: this.state.selectedRow.row.interval
                      },
                      {
                        title: "Number of Platforms",
                        value: this.state.selectedRow.row.numplats
                      },
                      {
                        title: "Description",
                        value: this.state.selectedRow.row.description
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

export default Configurations;
