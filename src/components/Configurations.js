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
    accessor: "name" // String-based value accessors!
  },
  {
    Header: "Binary / ASCII",
    accessor: "binascii"
  },
  {
    Header: "Parameters",
    accessor: "params"
  },
  {
    Header: "Transmission Interval",
    accessor: "interval"
  },
  {
    Header: "Number of Platforms",
    accessor: "numplats"
  },
  {
    Header: "Description",
    accessor: "description"
  }
];

class Configurations extends Component {
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
    let data = configdata;

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
