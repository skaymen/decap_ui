import React, { Component } from "react";
import ReactTable from "react-table";
import {
  Button,
  ButtonToolbar,
  Modal,
  Dropdown,
  DropdownButton
} from "react-bootstrap";

import "../styles/App.css";
import "../styles/Platforms.css";
import "react-table/react-table.css";
import "../styles/bootstrap.min.css";

import platformdata from "../data/platformdata.json";

class Platforms extends Component {
  constructor(props) {
    super(props);

    //bind functions to show and close the modal
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      selectedIndex: -1,
      //dummy data so we don't have an error with the modal-- probably best to get rid of this somehow, but not sure how
      selectedRow: {
        original: {
          platform: "XXX",
          agency: " ESRD",
          transportid: " 444824AA",
          config: " Shef-AE-WQ-002",
          expiration: " ",
          description: " Northern Emergency Portable Unit"
        },
        row: {
          _original: {
            platform: "ABNMS5-goes",
            agency: " ESRD",
            transportid: " 444824AA",
            config: " Shef-AE-WQ-002",
            expiration: " ",
            description: " Northern Emergency Portable Unit"
          },
          _index: 4,
          _nestingLevel: 0,
          platform: "ABNMS5-goes",
          agency: " ESRD",
          transportid: " 444824AA",
          config: " Shef-AE-WQ-002",
          expiration: " ",
          description: " Northern Emergency Portable Unit",
          _viewIndex: 4
        },
        index: 4,
        viewIndex: 4,
        pageSize: 10,
        page: 0,
        level: 0,
        nestingPath: [4]
      },
      search: "",
      show: false,
      filterState: "All"
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  changeFilter(newState) {
    this.setState({ filterState: newState });
  }

  render() {
    let data = platformdata;

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
            {/* dropdown buttons for selecting what to filter by */}
            <DropdownButton id="filter-dropdown" title={this.state.filterState}>
              <Dropdown.Item
                onClick={() => {
                  this.changeFilter("Platform");
                }}
              >
                Platform
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  this.changeFilter("Agency");
                }}
              >
                Agency
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  this.changeFilter("Transport-ID");
                }}
              >
                Transport-ID
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  this.changeFilter("Config");
                }}
              >
                Config
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  this.changeFilter("Expiration");
                }}
              >
                Expiration
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  this.changeFilter("Description");
                }}
              >
                Description
              </Dropdown.Item>
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
            onClick={() => {
              alert("Create new stuff goes here");
            }}
          >
            New
          </Button>

          <Button
            variant="primary"
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

        {/* this is a modal, or pop-up window, that displays data from a selected row on clicking the "open" button
        we are using a modal here so we can have a pop up window instead of a new component */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedRow.row.platform}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Agency: {this.state.selectedRow.row.agency}</p>
            <p>Transport-ID: {this.state.selectedRow.row.transportid}</p>
            <p>Config: {this.state.selectedRow.row.config}</p>
            <p>Expiration: {this.state.selectedRow.row.expiration}</p>
            <p>Description: {this.state.selectedRow.row.description}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Platforms;
