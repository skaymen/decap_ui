import React, { Component } from "react";
import ReactTable from "react-table";
import { Dropdown, DropdownButton } from "react-bootstrap";

import DropdownItems from "./DropdownItems.js";
import DBButtonToolbar from "./DBButtonToolbar.js";
import DataDisplay from "./DataDisplay.js";

import sitedata from "../data/sitedata.json";

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

class Sites extends Component {
  constructor(props) {
    super(props);

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

  changeFilter(newState) {
    this.setState({ filterState: newState });
  }

  handleShow() {
    this.setState({ show: true });
    this.setState({ key: Math.random() });
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
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
    let data = sitedata;

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
        {/* put some style here to make the title and filter box go where they are supposed to */}
        <div id="component-header" style={{ flexDirection: "row" }}>
          <h2 id="title"> Sites </h2>

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
        <DBButtonToolbar
          handleShow={this.handleShow}
          selectedIndex={this.state.selectedIndex}
        />
        {this.state.show ? (
          <div id="data-display-container">
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

export default Sites;
