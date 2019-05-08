import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactTable from "react-table";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Window from "./Window.js";
import DropdownItems from "./DropdownItems.js";
import DBButtonToolbar from "./DBButtonToolbar.js";
import DataDisplay from "./DataDisplay.js";

import "../styles/App.css";
import "react-table/react-table.css";
import "../styles/bootstrap.min.css";

import platformdata from "../data/platformdata.json";

//define columns for the data table
const columns = [
  {
    Header: "Platform",
    accessor: "platform", // String-based value accessors!
    width: 300
  },
  {
    Header: "Location Number",
    accessor: "location_number",
    width: 300
  },
  {
    Header: "Location Name",
    accessor: "location_name",
    width: 300
  },
  {
    Header: "Active",
    accessor: "active",
    width: 100
  },
  {
    Header: "Transmission ID",
    accessor: "transmission_id",
    width: 300
  },
  {
    Header: "Description",
    accessor: "description"
  }
];

//platforms component. this is where original work for data table / modal / data display / buttons / etc. was done
class Platforms extends Component {
  constructor(props) {
    super(props);

    //bind functions to show and close the modal
    this.handleShow = this.handleShow.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.handleCloseDataDisplay = this.handleCloseDataDisplay.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      selectedIndex: -1,
      selectedRow: {},
      search: "",
      showModal: false,
      filterState: "All",
      showDataDisplay: false,
      deletevalues: []
    };

    this.windowNode = document.createElement("div");
  }

  //show both the Window / modal and DataDisplay
  handleShow() {
    //uncomment this to show the pop up window
    // this.setState({ showModal: true });
    this.setState({ key: Math.random() });
    this.setState({ showDataDisplay: true });
  }

  //close the data display
  handleCloseDataDisplay() {
    this.setState({ showDataDisplay: false });
  }

  //update the filter
  changeFilter(newState) {
    this.setState({ filterState: newState });
  }

  //smooth scroll to bottom of page
  scrollToBottom = () => {
    var pfdis = document.getElementById("page-bottom");
    pfdis.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  //scroll to bottom on mount
  componentDidMount() {
    this.scrollToBottom();
  }

  //scroll to bottom on update
  componentDidUpdate() {
    this.scrollToBottom();
  }

  //add a row to the array of deleted rows
  handleDelete() {
    let delvals = this.state.deletevalues;
    delvals.push(this.state.selectedRow.original);
    this.setState({ deletevalues: delvals });
    this.setState({ selectedRow: {} });
    this.setState({ selectedIndex: -1 });
    this.handleCloseDataDisplay();
  }

  render() {
    let data = platformdata;

    //create the pop-up window in a portal attached to its own node. this window functionality is opposed to using DataDisplay
    var window = ReactDOM.createPortal(
      <Window
        show={this.state.showModal}
        selectedRow={this.state.selectedRow}
        firstCol={this.state.selectedRow.platform}
        key={this.state.key}
        displayData={
          this.state.selectedRow.row === undefined
            ? [{ title: "", value: "" }]
            : [
                {
                  title: "Platform",
                  value: this.state.selectedRow.row.platform
                },
                {
                  title: "Location Number",
                  value: this.state.selectedRow.row.location_number
                },
                {
                  title: "Location Name",
                  value: this.state.selectedRow.row.location_name
                },
                {
                  title: "Active",
                  value: this.state.selectedRow.row.active
                },
                {
                  title: "Transmission ID",
                  value: this.state.selectedRow.row.transmission_id
                },
                {
                  title: "Description",
                  value: this.state.selectedRow.row.description
                }
              ]
        }
      />,
      this.windowNode
    );
    // define the filter functionality for the table-- which column is searched depends on what is selected
    if (this.state.search) {
      data = data.filter(row => {
        switch (this.state.filterState) {
          case "Platform":
            return row.platform.includes(this.state.search);

          case "Location Number":
            return row.location_number.includes(this.state.search);

          case "Location Name":
            return row.location_name.includes(this.state.search);

          case "Active":
            return row.active.includes(this.state.search);

          case "Transmission ID":
            return row.transmission_id.includes(this.state.search);

          case "Description":
            return row.description.includes(this.state.search);

          // search all columns
          default:
            return (
              row.platform.includes(this.state.search) ||
              row.location_number.includes(this.state.search) ||
              row.location_name.includes(this.state.search) ||
              row.active.includes(this.state.search) ||
              row.transmission_id.includes(this.state.search) ||
              row.description.includes(this.state.search)
            );
        }
      });
    }

    //only return rows that are not in the array of deleted rows
    if (this.state.deletevalues.length > 0) {
      data = data.filter(row => {
        return !this.state.deletevalues.includes(row);
      });
    }

    return (
      <div id="component-div">
        <div id="component-header" style={{ flexDirection: "row" }}>
          <h2 id="title"> Platforms </h2>

          {/* bring in DropdownItems component */}
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
            <input
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
            />
          </div>
        </div>

        {/* define the data table */}
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

        {/* button toolbar for table interaction functionality */}
        <DBButtonToolbar
          handleShow={this.handleShow}
          selectedIndex={this.state.selectedIndex}
          selectedRow={this.state.selectedRow.row}
          data={data}
          handleDelete={this.handleDelete}
          filename="platforms.json"
        />

        {window}
        {/* bring in DataDisplay component */}
        {this.state.showDataDisplay ? (
          <div id="data-display-container">
            <DataDisplay
              close={this.handleCloseDataDisplay}
              displayData={
                this.state.selectedRow.row === undefined
                  ? [{ title: "", value: "" }]
                  : [
                      {
                        title: "Platform",
                        value: this.state.selectedRow.row.platform
                      },
                      {
                        title: "Location Number",
                        value: this.state.selectedRow.row.location_number
                      },
                      {
                        title: "Location Name",
                        value: this.state.selectedRow.row.location_name
                      },
                      {
                        title: "Active",
                        value: this.state.selectedRow.row.active
                      },
                      {
                        title: "Transmission ID",
                        value: this.state.selectedRow.row.transmission_id
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

export default Platforms;
