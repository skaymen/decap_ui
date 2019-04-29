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
    accessor: "platform" // String-based value accessors!
  },
  {
    Header: "Location Number",
    accessor: "location_number"
  },
  {
    Header: "Location Name",
    accessor: "location_name"
  },
  {
    Header: "Active",
    accessor: "active"
  },
  {
    Header: "Transmission ID",
    accessor: "transmission_id"
  },
  {
    Header: "Description",
    accessor: "description"
  }
];

class Platforms extends Component {
  constructor(props) {
    super(props);

    //bind functions to show and close the modal
    this.handleShow = this.handleShow.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.handleClosePlatformDisplay = this.handleClosePlatformDisplay.bind(
      this
    );

    this.state = {
      selectedIndex: -1,
      selectedRow: {},
      search: "",
      show: false,
      filterState: "All",
      showPlatformDisplay: false
    };

    this.windowNode = document.createElement("div");
  }

  handleShow() {
    this.setState({ show: true });
    this.setState({ key: Math.random() });
    this.setState({ showPlatformDisplay: true });

    // window.onload = function() {
    // }
  }

  handleClosePlatformDisplay() {
    this.setState({ showPlatformDisplay: false });
  }

  changeFilter(newState) {
    this.setState({ filterState: newState });
  }

  scrollToBottom = () => {
    var pfdis = document.getElementById("page-bottom");
    pfdis.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    let data = platformdata;

    //create the pop-up window in a portal attached to its own node
    var window = ReactDOM.createPortal(
      <Window
        show={this.state.show}
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
                { title: "Active", value: this.state.selectedRow.row.active },
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

          case "Transport-ID":
            return row.location_name.includes(this.state.search);

          case "Config":
            return row.active.includes(this.state.search);

          case "Expiration":
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

    return (
      <div id="component-div">
        {/* put some style here to make the title and filter box go where they are supposed to */}
        <div id="component-header" style={{ flexDirection: "row" }}>
          <h2 id="title"> Platforms </h2>

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
            Filter:{" "}
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
        />

        {window}
        {this.state.showPlatformDisplay ? (
          <div id="data-display-container">
            <DataDisplay
              close={this.handleClosePlatformDisplay}
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
