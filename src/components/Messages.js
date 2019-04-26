import React, { Component } from "react";
// import { Button } from "react-bootstrap";
import ReactTable from "react-table";

import "../styles/Messages.css";

// import Play from "../images/play.svg";
// import Forward from "../images/skipforward.svg";
// import Back from "../images/skipback.svg";
// import Refresh from "../images/update-arrows.svg";

import messagedata from "../data/messages.json";

const columns = [
  {
    Header: "Message Text",
    accessor: "message_text" // String-based value accessors!
  },
  {
    Header: "Decoded Data",
    accessor: "decoded_data"
  }
];

//messaging component for the database editor
class Messages extends Component {
  constructor(props) {
    super(props);
    this.skipForward = this.skipForward.bind(this);
    this.skipBack = this.skipBack.bind(this);
    this.decode = this.decode.bind(this);
    this.refresh = this.refresh.bind(this);

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
      selected: null

    };
  }

  skipForward() {
    //move to the next element in the message list, or start over if at end
    let i = this.state.index;
    i < this.state.demo_data.message_text.length - 1 ? (i += 1) : (i = 0);
    this.setState({ index: i });
  }

  skipBack() {
    //move to previous element, or final element if at beginning
    let i = this.state.index;
    i > 0 ? (i -= 1) : (i = this.state.demo_data.message_text.length - 1);
    this.setState({ index: i });
  }

  decode() {
    //replace a given message with "decoded." should be replaced with something that makes more sense
    let data = this.state.demo_data;
    data.message_text[this.state.index] = "decoded!";
    this.setState({ demo_data: data });
  }

  refresh() {
    //not actually sure what should happen here. replace this code as needed
    let data = this.state.demo_data;
    data.message_text[this.state.index] = "refreshed!";
    this.setState({ demo_data: data });
  }

  render() {
    let data = messagedata;
    return (
      <div id="messages">
        {/* list relevant informaiton along the top */}
        <div id="top-boxes">
          <div className="text-box">
            <h3>Message Source</h3>
            {/* <p>{this.state.demo_data.source}</p> */}
            <input/>
          </div>
          <div className="text-box">
            <h3>Location / Transmission ID</h3>
            {/* <p>{this.state.demo_data.location}</p> */}
            <input/>
          </div>
          <div className="text-box">
            <h3>Time Period</h3>
            {/* <p>{this.state.demo_data.time_period}</p> */}
            <input/>
          </div>
          <div className="text-box">
            <h3>Message Output Format</h3>
            {/* <p>{this.state.demo_data.output_format}</p> */}
            <input/>
          </div>
        </div>
        <div id="message-data-box">
          <div id="message-data">
          <ReactTable
          data={data}
          columns={columns}
          // set the default number of rows to display. take away ability to change thos.
          defaultPageSize={5}
          showPageSizeOptions={false}
          //this is code to make elements within the table selectable
          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: (e) => {
                  this.setState({
                    selected: rowInfo.index
                  })
                },
                style: {
                  background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                  color: rowInfo.index === this.state.selected ? 'white' : 'black'
                }
              }
            }else{
              return {}
            }
          }}
         />
            {/* <h3>
              {/* print message data, page number, etc */}
              {/* Message Data - {this.state.index + 1} of{" "}
              {this.state.demo_data.message_text.length}
              {/* <button id="refresh-button" onClick={this.refresh}>
                <img src={Refresh} alt="refresh" id="refresh"/>
              </button> */}
              {/* <input
                type="image"
                src={Refresh}
                id="refresh"
                alt="refresh"
                onClick={this.refresh}
              /> */}
            {/* </h3> */}
            {/* <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            {/* <div id="data-display">
              <p>{this.state.demo_data.message_text[this.state.index]}</p>
            </div> */}
          </div>

          {/* buttons for skip and play */}
          {/* <div id="buttons">
            <Button
              variant="outline-info"
              className="message-button"
              onClick={this.skipBack}
            >
              <img className="message-icon" src={Back} alt="back" id="back" />
            </Button>
            <Button
              variant="outline-info"
              className="message-button"
              onClick={this.decode}
            >
              <img className="message-icon" src={Play} alt="play" id="play" />
            </Button>
            <Button
              variant="outline-info"
              className="message-button"
              onClick={this.skipForward}
            >
              <img
                className="message-icon"
                src={Forward}
                alt="forward"
                id="forward"
              />
            </Button>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Messages;
