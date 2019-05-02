import React, { Component } from "react";
import { Button } from "react-bootstrap";

import "../styles/Decoder.css";

import Play from "../images/play.svg";
import Forward from "../images/skipforward.svg";
import Back from "../images/skipback.svg";
import Refresh from "../images/update-arrows.svg";

//decoder component. navigate through messages and decode them with buttons
class Decoder extends Component {
  constructor(props) {
    super(props);

    this.addStatement = this.addStatement.bind(this);
    this.removeStatement = this.removeStatement.bind(this);
    this.skipForward = this.skipForward.bind(this);
    this.skipBack = this.skipBack.bind(this);
    this.decode = this.decode.bind(this);
    this.refresh = this.refresh.bind(this);

    this.state = {
      //set up some default format statements
      statements: [
        { id: 1, label: "first one", format_statement: "xxx" },
        { id: 2, label: "second one", format_statement: "yyy" },
        { id: 3, label: "third one", format_statement: "zzz" }
      ],
      //keep track of which message we are on
      index: 0,
      //example data to use for prototype. actual data will come from backend when implemented
      message_text: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Eget dolor morbi non arcu risus. Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Vitae elementum curabitur vitae nunc sed. Dolor purus non enim praesent. Ut pharetra sit amet aliquam id diam maecenas ultricies mi. Senectus et netus et malesuada fames ac turpis egestas integer. Vel facilisis volutpat est velit egestas dui id ornare. Amet luctus venenatis lectus magna fringilla urna porttitor. Mi proin sed libero enim. Volutpat blandit aliquam etiam erat velit scelerisque in dictum non. Sed risus pretium quam vulputate dignissim suspendisse. Ut pharetra sit amet aliquam id. Tellus id interdum velit laoreet id. Sed blandit libero volutpat sed cras ornare. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Nisi est sit amet facilisis magna etiam.",
        "Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Urna cursus eget nunc scelerisque viverra mauris in. Nam aliquam sem et tortor consequat id porta nibh venenatis. Ultricies mi eget mauris pharetra et ultrices. Ac placerat vestibulum lectus mauris ultrices. Nunc congue nisi vitae suscipit tellus. Bibendum est ultricies integer quis auctor elit sed. Vel quam elementum pulvinar etiam non. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Et malesuada fames ac turpis egestas maecenas pharetra convallis. Orci nulla pellentesque dignissim enim. Gravida neque convallis a cras. Mauris ultrices eros in cursus turpis massa tincidunt dui. Leo vel fringilla est ullamcorper. Nunc congue nisi vitae suscipit tellus mauris. Mattis nunc sed blandit libero.",
        "Maecenas sed enim ut sem viverra aliquet. Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Faucibus purus in massa tempor nec feugiat nisl. Enim ut tellus elementum sagittis vitae. Adipiscing commodo elit at imperdiet dui accumsan sit amet. Urna molestie at elementum eu facilisis sed odio morbi quis. Morbi tristique senectus et netus et. A iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Neque volutpat ac tincidunt vitae semper quis lectus nulla. Nulla posuere sollicitudin aliquam ultrices sagittis. Quam pellentesque nec nam aliquam sem. Massa enim nec dui nunc mattis. Quis hendrerit dolor magna eget est lorem. Rutrum quisque non tellus orci ac auctor augue mauris augue. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Eget mi proin sed libero enim sed. Ut porttitor leo a diam. Turpis egestas integer eget aliquet nibh praesent. Ullamcorper malesuada proin libero nunc consequat interdum varius. Adipiscing enim eu turpis egestas pretium aenean.",
        "Elit eget gravida cum sociis natoque penatibus. Nibh tortor id aliquet lectus proin nibh. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Blandit turpis cursus in hac habitasse. Nibh mauris cursus mattis molestie a. In dictum non consectetur a erat nam. Justo nec ultrices dui sapien eget mi. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Viverra nibh cras pulvinar mattis nunc. At erat pellentesque adipiscing commodo elit at. Adipiscing tristique risus nec feugiat in fermentum. A arcu cursus vitae congue mauris. Amet massa vitae tortor condimentum lacinia quis. Nulla aliquet porttitor lacus luctus."
      ],
      decoded_data: ["", "", "", "", ""]
    };
  }

  //code to add a new format statement
  addStatement() {
    var temp = this.state.statements;
    var rand = Math.random();
    //just filled with default text for now
    temp.push({
      id: rand,
      label: "another one",
      format_statement: "aaa"
    });
    this.setState({ statements: temp });
  }

  //code to find a statement by its id and remove it from the array
  removeStatement(target) {
    var temp = this.state.statements;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id === target) {
        temp.splice(i, 1);
      }
    }
    this.setState({ statements: temp });
  }

  skipForward() {
    //move to the next element in the message list, or start over if at end
    let i = this.state.index;
    i < this.state.message_text.length - 1 ? (i += 1) : (i = 0);
    this.setState({ index: i });
  }

  skipBack() {
    //move to previous element, or final element if at beginning
    let i = this.state.index;
    i > 0 ? (i -= 1) : (i = this.state.message_text.length - 1);
    this.setState({ index: i });
  }

  decode() {
    //replace a given message with "decoded." should be replaced with something that makes more sense
    let data = this.state.decoded_data;
    data[this.state.index] = this.state.message_text[this.state.index];
    this.setState({ decoded_data: data });
  }

  refresh() {
    //not actually sure what should happen here. replace this code as needed
    let data = this.state.message_text;
    data[this.state.index] = "refreshed!";
    this.setState({ message_text: data });
  }

  render() {
    return (
      <div id="decoder">
        <div id="format-statements">
          <h3 id="title">Format Statements</h3>
          {/* bring in FormatStatements component */}
          <FormatStatements
            statements={this.state.statements}
            removeStatement={this.removeStatement}
          />
          <Button onClick={this.addStatement}> Add Statement </Button>
          {/* button doesn't actually do anything right now */}
          <Button>Apply</Button>
        </div>

        <div id="message-decoder">
          <div id="title-and-refresh">
            <h3 id="title">
              {/* show title and where we are in the list */}
              Message Decoder - {this.state.index + 1} of{" "}
              {this.state.message_text.length}{" "}
            </h3>
            {/* refresh button */}
            <Button variant="light" id="refresh-button" onClick={this.refresh}>
              <img src={Refresh} alt="refresh" id="refresh" />
            </Button>
          </div>
          {/* show the message text and decoded data of the current list element */}
          <div id="message-blocks">
            <div className="message">
              <h4>Message Text</h4>
              {this.state.message_text[this.state.index]}
            </div>
            <div className="message">
              <h4>Decoded Data</h4>
              {this.state.decoded_data[this.state.index]}
            </div>
          </div>
          {/* skip back, play, and skip forward buttons */}
          <div id="message-nav-buttons">
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
          </div>
        </div>
      </div>
    );
  }
}

//component to create the format statements
class FormatStatements extends Decoder {
  render() {
    var removeStatement = this.props.removeStatement;

    //map each column header to its change function
    var items = this.props.statements.map(function(statement) {
      return (
        <div className="statement" key={statement.id}>
          <Button
            variant="light"
            className="format-close-button"
            onClick={() => removeStatement(statement.id)}
          >
            x
          </Button>
          Label{" "}
          <input className="label-input" defaultValue={statement.label} />
          Format Statement{" "}
          <input
            className="format-statement-input"
            defaultValue={statement.format_statement}
          />
        </div>
      );
    });

    return items;
  }
}

export default Decoder;
