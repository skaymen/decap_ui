import React, { Component } from "react";
import Platforms from "./components/Platforms";
import Messages from "./components/Messages";
import Decoder from "./components/Decoder";
import Configurations from "./components/Configurations";
import { Button, ButtonToolbar } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles/App.css";
import "./styles/bootstrap.min.css";

import Logo from "./images/usgs_logo.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // the platforms component is loaded by default
      selectedPage: "Platforms"
    };
    this.change = this.change.bind(this);
  }

  change(value) {
    this.setState({ selectedPage: value });
  }

  render() {
    //display the selected page/component-- only platforms are currently set up
    return (
      <div className="App">
        <Header selectedPage={this.state.selectedPage} change={this.change} />
        <Body selectedPage={this.state.selectedPage} />
      </div>
    );
  }
}

//separate component for the header. contains
class Header extends App {
  render() {
    return (
      <header className="App-header">
        <img src={Logo} alt="usgs_logo" id="logo" />

        <div id="title-buttons">
          <h1 id="decap-title"> DECAP Database Editor </h1>

          {/* button toolbar for navigating between pages. on click, change state to display the correct page */}
          <ButtonToolbar id="comp-toolbar">
            <Button
              variant="outline-primary"
              onClick={() => {
                // this may not be the best-practice way to change the state. maybe something like displayPlatforms=true?
                this.props.change("Platforms");
              }}
            >
              Platforms
            </Button>

            <Button
              variant="outline-primary"
              onClick={() => {
                this.props.change("Sites");
              }}
            >
              Sites
            </Button>

            <Button
              variant="outline-primary"
              onClick={() => {
                this.props.change("Configurations");
              }}
            >
              Configurations
            </Button>

            <Button
              variant="outline-primary"
              onClick={() => {
                this.props.change("Messages");
              }}
            >
              Messages
            </Button>

            <Button
              variant="outline-primary"
              onClick={() => {
                this.props.change("Decoder");
              }}
            >
              Decoder
            </Button>

          </ButtonToolbar>
        </div>
      </header>
    );
  }
}

class Body extends Component {
  render() {
    switch (this.props.selectedPage) {
      case "Platforms":
        return <Platforms />;

      case "Sites":
        return <h2>Sites</h2>;

      case "Configurations":
        return <Configurations />;

      case "Messages":
        return <Messages/>;

      case "Decoder":
        return <Decoder/>;

      default:
        return null;
    }
  }
}

// This is code for making the app multi-page. For now, we are simply adding and removing components on a single page

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>Database Editor</div>,
    main: () => <App />
  },
  {
    path: "/page2",
    sidebar: () => <div>Page 2</div>,
    main: () => <h2>Page 2</h2>
  }
];

function Sidebar() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "10%",
            background: "#f0f0f0"
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }} id="sidebar-list">
            <Link to="/">
              <Button variant="outline-primary" id="sidebar-button">
                Database Editor
              </Button>
            </Link>

            <Link to="/page2">
              <Button variant="outline-primary" id="sidebar-button">
                Page 2
              </Button>
            </Link>
          </ul>

          {routes.map((route, index) => (
            // You can render a <Route> in as many places
            // as you want in your app. It will render along
            // with any other <Route>s that also match the URL.
            // So, a sidebar or breadcrumbs or anything else
            // that requires you to render multiple things
            // in multiple places at the same URL is nothing
            // more than multiple <Route>s.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
            />
          ))}
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          {routes.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
    </Router>
  );
}

export default Sidebar;
