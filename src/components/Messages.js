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

//messaging component for the database editor
class Messages extends Component {
  constructor(props) {
    super(props);

    this.setTransmissionSource = this.setTransmissionSource.bind(this);
    this.onEarlyTimeBoundChange = this.onEarlyTimeBoundChange.bind(this);
    this.onLateTimeBoundChange = this.onLateTimeBoundChange.bind(this);

    this.state = {
      //keep track of which message we are on
      index: 0,
      //example data to use for prototype. actual data will come from backend when implemented
      demo_data: {
        source: "Water Science Center",
        location: "17589_E76",
        time_period: "12:03-18-13:04:54",
        output_format: ".txt",
        message_text: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Eget dolor morbi non arcu risus. Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Vitae elementum curabitur vitae nunc sed. Dolor purus non enim praesent. Ut pharetra sit amet aliquam id diam maecenas ultricies mi. Senectus et netus et malesuada fames ac turpis egestas integer. Vel facilisis volutpat est velit egestas dui id ornare. Amet luctus venenatis lectus magna fringilla urna porttitor. Mi proin sed libero enim. Volutpat blandit aliquam etiam erat velit scelerisque in dictum non. Sed risus pretium quam vulputate dignissim suspendisse. Ut pharetra sit amet aliquam id. Tellus id interdum velit laoreet id. Sed blandit libero volutpat sed cras ornare. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Nisi est sit amet facilisis magna etiam.",
          "Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Urna cursus eget nunc scelerisque viverra mauris in. Nam aliquam sem et tortor consequat id porta nibh venenatis. Ultricies mi eget mauris pharetra et ultrices. Ac placerat vestibulum lectus mauris ultrices. Nunc congue nisi vitae suscipit tellus. Bibendum est ultricies integer quis auctor elit sed. Vel quam elementum pulvinar etiam non. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Et malesuada fames ac turpis egestas maecenas pharetra convallis. Orci nulla pellentesque dignissim enim. Gravida neque convallis a cras. Mauris ultrices eros in cursus turpis massa tincidunt dui. Leo vel fringilla est ullamcorper. Nunc congue nisi vitae suscipit tellus mauris. Mattis nunc sed blandit libero.",
          "Maecenas sed enim ut sem viverra aliquet. Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Faucibus purus in massa tempor nec feugiat nisl. Enim ut tellus elementum sagittis vitae. Adipiscing commodo elit at imperdiet dui accumsan sit amet. Urna molestie at elementum eu facilisis sed odio morbi quis. Morbi tristique senectus et netus et. A iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Neque volutpat ac tincidunt vitae semper quis lectus nulla. Nulla posuere sollicitudin aliquam ultrices sagittis. Quam pellentesque nec nam aliquam sem. Massa enim nec dui nunc mattis. Quis hendrerit dolor magna eget est lorem. Rutrum quisque non tellus orci ac auctor augue mauris augue. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Eget mi proin sed libero enim sed. Ut porttitor leo a diam. Turpis egestas integer eget aliquet nibh praesent. Ullamcorper malesuada proin libero nunc consequat interdum varius. Adipiscing enim eu turpis egestas pretium aenean.",
          "Elit eget gravida cum sociis natoque penatibus. Nibh tortor id aliquet lectus proin nibh. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Blandit turpis cursus in hac habitasse. Nibh mauris cursus mattis molestie a. In dictum non consectetur a erat nam. Justo nec ultrices dui sapien eget mi. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Viverra nibh cras pulvinar mattis nunc. At erat pellentesque adipiscing commodo elit at. Adipiscing tristique risus nec feugiat in fermentum. A arcu cursus vitae congue mauris. Amet massa vitae tortor condimentum lacinia quis. Nulla aliquet porttitor lacus luctus."
        ]
      },
      selected: null,
      transmissionSource: "Transmission Source",
      locationFilterState: "Location",
      timeFilterState: "Last",
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
  }

  changeTimeFilter(newState) {
    this.setState({ timeFilterState: newState });
  }

  changeOutputFormat(newState) {
    this.setState({ outputFormat: newState });
  }

  onEarlyTimeBoundChange(time) {
    this.setState({earlyTimeBound: time});
  }

  onLateTimeBoundChange(time) {
    this.setState({lateTimeBound: time});
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
      }
    ];

    let data = messagedata;
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
            ) : null}
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
