import React, { Component } from "react";

import "../styles/Messages.css";

import Play from "../images/play.svg";
import Forward from "../images/skipforward.svg";
import Back from "../images/skipback.svg";

class Messages extends Component {
  render() {
    return (
      <div id="messages">
        <div id="top-boxes">
          <div class="text-box">
            <h3>Message Source</h3>
            <p>nebraska</p>
          </div>
          <div class="text-box">
            <h3>Location / Transmission ID</h3>
            <p>1124376886</p>
          </div>
          <div class="text-box">
            <h3>Time Period</h3>
            <p>12:03:18-13:04:54</p>
          </div>
          <div class="text-box">
            <h3>Message Output Format</h3>
            <p>text</p>
          </div>
        </div>
        <div id="message-data-box">
          <div id="message-data">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </div>
          <div id="buttons">
            <img class="message-button" src={Back} alt="back" id="back" />
            <img class="message-button" src={Play} alt="play" id="play" />
            <img class="message-button" src={Forward} alt="forward" id="forward" />
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;
