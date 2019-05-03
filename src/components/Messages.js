import React, { Component } from "react";
// import { Button } from "react-bootstrap";
import ReactTable from "react-table";
import { DropdownButton, Dropdown } from "react-bootstrap";
import DropdownItems from "./DropdownItems.js";
import TimeField from "react-simple-timefield";

import "../styles/Messages.css";

import messagedata from "../data/messages.json";

const dropdownItems = [
  { Header: "lrgseros1.cr.usgs.gov" },
  { Header: "lrgseros2.cr.usgs.gov" },
  { Header: "lrgseros3.cr.usgs.gov" },
  { Header: "lrgs2hq.er.usgs.gov" },
  { Header: "lrgseddn1.cr.usgs.gov" },
  { Header: "lrgseddn2.cr.usgs.gov" },
  { Header: "lrgseddn3.cr.usgs.gov" }
];

const timePeriods = [
  { Header: "1 hour" },
  { Header: "4 hours" },
  { Header: "24 hours" },
  { Header: "2 days" },
  { Header: "7 days" }
];

//messaging component for the database editor
class Messages extends Component {
  constructor(props) {
    super(props);

    this.setTransmissionSource = this.setTransmissionSource.bind(this);
    this.onEarlyTimeBoundChange = this.onEarlyTimeBoundChange.bind(this);
    this.onLateTimeBoundChange = this.onLateTimeBoundChange.bind(this);
    this.changeTimePeriodFilter = this.changeTimePeriodFilter.bind(this);

    this.state = {
      //keep track of which message we are on
      index: 0,
      //example data to use for prototype. actual data will come from backend when implemented
      selected: null,
      transmissionSource: "All",
      locationFilterState: "Location",
      timeFilterState: "Last",
      timePeriodFilterState: "All",
      outputFormat: "raw",
      earlyTimeBound: "00:00:01",
      lateTimeBound: "23:59:59",
      search: ""
    };
  }

  setTransmissionSource(newSource) {
    this.setState({ transmissionSource: newSource });
  }

  changeLocationFilter(newState) {
    this.setState({ locationFilterState: newState });
    this.setState({ search: "" });
  }

  changeTimeFilter(newState) {
    this.setState({ timeFilterState: newState });
  }

  changeTimePeriodFilter(newState) {
    this.setState({ timePeriodFilterState: newState});
  }

  changeOutputFormat(newState) {
    this.setState({ outputFormat: newState });
  }

  onEarlyTimeBoundChange(time) {
    this.setState({ earlyTimeBound: time });
  }

  onLateTimeBoundChange(time) {
    this.setState({ lateTimeBound: time });
  }

  render() {
    var columns = [
      {
        Header: "Message Text",
        accessor: "message_text" // String-based value accessors!
      },
      {
        Header: "Data",
        accessor: this.state.outputFormat
      },
      {
        Header: "Source",
        accessor: "source"
      },
      {
        Header: "Time",
        accessor: "time"
      },
      {
        Header: "Location",
        accessor: "location"
      },
      {
        Header: "Transmission ID",
        accessor: "transmission_id"
      }
    ];

    let data = messagedata;

    if (this.state.transmissionSource !== "All") {
      data = data.filter(row => {
        return row.source.includes(this.state.transmissionSource);
      });
    }

    if (this.state.timeFilterState === "Between") {
      data = data.filter(row => {
        return (
          row.time >= this.state.earlyTimeBound &&
          row.time <= this.state.lateTimeBound
        );
      });
    }

    if (this.state.locationFilterState === "Location") {
      data = data.filter(row => {
        return row.location.includes(this.state.search);
      });
    } else if (this.state.locationFilterState === "Transmission ID") {
      data = data.filter(row => {
        return row.transmission_id.includes(this.state.search);
      });
    }

    if (this.state.timePeriodFilterState !== "All") {
      data = data.filter(row => {
        switch(this.state.timePeriodFilterState) {

          case "1 hour":
            return row.time >= "23:00:00";

          case "4 hours":
            return row.time >= "20:00:00";

          case "24 hours":
            return row.time >= "00:00:00";

          case "2 days":
            return row.time;

          case "7 days":
            return row.time;

          default:
            return null;

          

        }
      });
    }
    return (
      <div id="messages">
        {/* list relevant informationon along the top. Inputs are not yet functional */}
        <div id="top-boxes">
          <div className="text-box">
            <h3>Message Source</h3>
            {/* bring in DropdownItems component */}
            <div id="transmissions-dropdown-container">
              <DropdownButton
                id="transmissions-dropdown"
                title={this.state.transmissionSource}
              >
                <DropdownItems
                  columns={dropdownItems}
                  filterState={this.state.transmissionSource}
                  changeFilter={this.setTransmissionSource}
                />

                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    this.setTransmissionSource("All");
                  }}
                >
                  All
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>

          <div className="text-box">
            <h3>Location / Transmission ID</h3>
            <div id="transmissions-filter">
              <DropdownButton
                id="transmission-dropdown"
                title={this.state.locationFilterState}
              >
                <Dropdown.Item
                  onClick={() => {
                    this.changeLocationFilter("Location");
                  }}
                >
                  Location
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    this.changeLocationFilter("Transmission ID");
                  }}
                >
                  {" "}
                  Transmission ID
                </Dropdown.Item>
              </DropdownButton>{" "}
              <input
                id="transmission-input"
                value={this.state.search}
                onChange={e => this.setState({ search: e.target.value })}
              />
            </div>
          </div>

          <div className="text-box">
            <h3>Time Period</h3>
            <div id="time-dropdown-input">
              <div id="transmissions-dropdown-container">
                <DropdownButton
                  id="transmission-dropdown"
                  title={this.state.timeFilterState}
                >
                  <Dropdown.Item
                    onClick={() => {
                      this.changeTimeFilter("Last");
                    }}
                  >
                    Last
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      this.changeTimeFilter("Between");
                    }}
                  >
                    {" "}
                    Between
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              {this.state.timeFilterState === "Between" ? (
                <div id="time-inputs">
                  {" "}
                  <TimeField
                    id="time-input"
                    value={this.state.earlyTimeBound}
                    onChange={this.onEarlyTimeBoundChange}
                    showSeconds={true}
                    style={{
                      border: "2px solid #666",
                      fontSize: 14,
                      width: 75,
                      padding: "5px 8px",
                      color: "#333",
                      borderRadius: 3
                    }}
                  />
                  and
                  <TimeField
                    id="time-input"
                    value={this.state.lateTimeBound}
                    onChange={this.onLateTimeBoundChange}
                    showSeconds={true}
                    style={{
                      border: "2px solid #666",
                      fontSize: 14,
                      width: 75,
                      padding: "5px 8px",
                      color: "#333",
                      borderRadius: 3
                    }}
                  />
                </div>
              ) : (
                <div id="time-period-dropdown-container">
                  <DropdownButton
                id="transmissions-dropdown"
                title={this.state.timePeriodFilterState}
              >
                <DropdownItems
                  columns={timePeriods}
                  filterState={this.state.timePeriodFilterState}
                  changeFilter={this.changeTimePeriodFilter}
                />
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    this.changeTimePeriodFilter("All");
                  }}
                >
                  All
                </Dropdown.Item>
              </DropdownButton>
                </div>
              )}
            </div>
          </div>
          <div className="text-box">
            <h3>Message Output Format</h3>
            <div id="transmissions-filter">
              <DropdownButton
                id="transmission-dropdown"
                title={this.state.outputFormat}
              >
                <Dropdown.Item
                  onClick={() => {
                    this.changeOutputFormat("raw");
                  }}
                >
                  raw
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    this.changeOutputFormat("decoded");
                  }}
                >
                  {" "}
                  decoded
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </div>
        <div id="message-data-box">
          <div id="message-data">
            {/* similar table as used in sites/platforms/configs */}
            <ReactTable
              data={data}
              columns={columns}
              defaultPageSize={5}
              showPageSizeOptions={false}
              getTrProps={(state, rowInfo) => {
                if (rowInfo && rowInfo.row) {
                  return {
                    onClick: e => {
                      this.setState({
                        selected: rowInfo.index
                      });
                    },
                    style: {
                      background:
                        rowInfo.index === this.state.selected
                          ? "#00afec"
                          : "white",
                      color:
                        rowInfo.index === this.state.selected
                          ? "white"
                          : "black"
                    }
                  };
                } else {
                  return {};
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;
