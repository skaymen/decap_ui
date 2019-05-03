import React, { Component } from "react";
import Platforms from "./components/Platforms";
import Messages from "./components/Messages";
import Decoder from "./components/Decoder";
import Configurations from "./components/Configurations";
import Locations from "./components/Locations";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles/App.css";
import "./styles/bootstrap.min.css";

import Logo from "./images/usgs_logo.svg";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      // the platforms component is loaded by default
      value: 1
    };
  }

  handleChange(value, event) {
    this.setState({ value });
  }

  render() {
    //display the selected page/component-- only platforms are currently set up
    return (
      <div className="App">
        <Header value={this.state.value} handleChange={this.handleChange} />
        <Body value={this.state.value} />
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

          {/* radio buttons for navigating between components */}
          <ToggleButtonGroup
            type="radio"
            defaultValue={1}
            onChange={this.props.handleChange}
            name="component-select"
          >
            <ToggleButton value={1}>Platforms</ToggleButton>
            <ToggleButton value={2}>Locations</ToggleButton>
            <ToggleButton value={3}>Configurations</ToggleButton>
            <ToggleButton value={4}>Messages</ToggleButton>
            <ToggleButton value={5}>Decoder</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </header>
    );
  }
}

//choose which component to display based on selectedPage
class Body extends Component {
  render() {
    switch (this.props.value) {
      case 1:
        return <Platforms />;

      case 2:
        return <Locations />;

      case 3:
        return <Configurations />;

      case 4:
        return <Messages />;

      case 5:
        return <Decoder />;

      default:
        return null;
    }
  }
}

// This is code for making the app multi-page. For now, we are simply adding and removing components on a single page
// const routes = [
//   {
//     path: "/",
//     exact: true,
//     sidebar: () => <div>Database Editor</div>,
//     main: () => <App />
//   },
//   {
//     path: "/page2",
//     sidebar: () => <div>Page 2</div>,
//     main: () => <h2>Page 2</h2>
//   }
// ];

//sidebar contains the router between different pages
// function Sidebar() {
//   return (
//     <Router>
//       <div style={{ display: "flex" }}>
//         <div
//           style={{
//             padding: "10px",
//             width: "10%",
//             background: "#f0f0f0"
//           }}
//         >
//           <ul style={{ listStyleType: "none", padding: 0 }} id="sidebar-list">
//             <Link to="/">
//               <Button variant="outline-primary" id="sidebar-button">
//                 Database Editor
//               </Button>
//             </Link>

//             <Link to="/page2">
//               <Button variant="outline-primary" id="sidebar-button">
//                 Page 2
//               </Button>
//             </Link>
//           </ul>

//           {routes.map((route, index) => (
//             // You can render a <Route> in as many places
//             // as you want in your app. It will render along
//             // with any other <Route>s that also match the URL.
//             // So, a sidebar or breadcrumbs or anything else
//             // that requires you to render multiple things
//             // in multiple places at the same URL is nothing
//             // more than multiple <Route>s.
//             <Route
//               key={index}
//               path={route.path}
//               exact={route.exact}
//               component={route.sidebar}
//             />
//           ))}
//         </div>

//         <div style={{ flex: 1, padding: "10px" }}>
//           {routes.map((route, index) => (
//             // Render more <Route>s with the same paths as
//             // above, but different components this time.
//             <Route
//               key={index}
//               path={route.path}
//               exact={route.exact}
//               component={route.main}
//             />
//           ))}
//         </div>
//       </div>
//     </Router>
//   );
// }

//in order to use the sidebar, change App to Sidebar in this line
export default App;
