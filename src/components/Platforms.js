import React, { Component } from "react";
import ReactTable from "react-table";
import {
  Button,
  ButtonToolbar,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import Window from "./Window.js";

import "../styles/App.css";
import "../styles/Platforms.css";
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
    Header: "Agency",
    accessor: "agency"
  },
  {
    Header: "Transport-ID",
    accessor: "transportid"
  },
  {
    Header: "Config",
    accessor: "config"
  },
  {
    Header: "Expiration",
    accessor: "expiration"
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

    this.state = {
      selectedIndex: -1,
      selectedRow: {},
      search: "",
      show: false,
      filterState: "All",
    };
  }

  handleShow() {
    this.setState({ show: true });
    this.setState({ key: Math.random() });
  }

  changeFilter(newState) {
    this.setState({ filterState: newState });
  }

  render() {
    let data = platformdata;
    // define the filter functionality for the table-- which column is searched depends on what is selected
    if (this.state.search) {
      data = data.filter(row => {
        switch (this.state.filterState) {
          case "Platform":
            return row.platform.includes(this.state.search);

          case "Agency":
            return row.agency.includes(this.state.search);

          case "Transport-ID":
            return row.transportid.includes(this.state.search);

          case "Config":
            return row.config.includes(this.state.search);

          case "Expiration":
            return row.expiration.includes(this.state.search);

          case "Description":
            return row.description.includes(this.state.search);

          // search all columns
          default:
            return (
              row.platform.includes(this.state.search) ||
              row.agency.includes(this.state.search) ||
              row.transportid.includes(this.state.search) ||
              row.config.includes(this.state.search) ||
              row.expiration.includes(this.state.search) ||
              row.description.includes(this.state.search)
            );
        }
      });
    }

    return (
      <div id="platforms_div">
        {/* put some style here to make the title and filter box go where they are supposed to */}
        <div id="platform-header" style={{ flexDirection: "row" }}>
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
        <ButtonToolbar id="buttonbar">
          <Button
            variant="primary"
            id="platform-button"
            onClick={() => {
              if (this.state.selectedIndex >= 0) {
                //call the function to display the data modal
                this.handleShow();
              } else {
                alert("nothing selected!");
              }
            }}
          >
            Open
          </Button>

          <Button
            variant="primary"
            id="platform-button"
            onClick={() => {
              alert("Create new stuff goes here");
            }}
          >
            New
          </Button>

          <Button
            variant="primary"
            id="platform-button"
            onClick={() => {
              if (this.state.selectedIndex) {
                alert("copy row " + this.state.selectedIndex);
              } else {
                alert("nothing selected!");
              }
            }}
          >
            Copy
          </Button>

          <Button
            variant="danger"
            id="platform-button"
            onClick={() => {
              if (this.state.selectedIndex) {
                alert("delete row " + this.state.selectedIndex);
              } else {
                alert("nothing selected!");
              }
            }}
          >
            Delete
          </Button>
        </ButtonToolbar>

        <Window show={this.state.show} selectedRow={this.state.selectedRow} firstCol={this.state.selectedRow.platform} key={this.state.key}/>
      </div>
    );
  }
}

class DropdownItems extends Platforms {
  render() {
    var changeFilter = this.props.changeFilter;

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

export default Platforms;
