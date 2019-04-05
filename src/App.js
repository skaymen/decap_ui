import React, { Component } from 'react';
import Platforms from './components/Platforms';
import {Button, ButtonToolbar} from 'react-bootstrap';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './styles/App.css';
import './styles/bootstrap.min.css'

import Logo from './images/usgs_logo.svg';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // the platforms component is loaded by default
      selectedPage: 'Platforms'
    };
    this.change = this.change.bind(this)
  }

  change(value) {
    this.setState({selectedPage: value});
  }


  render() {

    //TODO: these if statements are probably not the best way to handle this
    // best practice seems to be mounting / unmounting components based on state change

    //display the selected page/component-- only platforms are currently set up
    if (this.state.selectedPage === 'Platforms') {
      return (
        <div className="App">
          {/* pass in selected page and change function to the header component */}
          <Header selectedPage={this.state.selectedPage} change={this.change}/>
          <Platforms />
        </div>
      );
    }

    else if (this.state.selectedPage === 'Sites') {
      return ( 
        <div className="App">
          <Header selectedPage={this.state.selectedPage} change={this.change}/>
          <h2> Sites</h2>
        </div>
      );
    }

    else if (this.state.selectedPage === 'Configurations') {
      return (
        <div className="App">
          <Header selectedPage={this.state.selectedPage} change={this.change}/>
          <h2> Configurations</h2>
        </div>
      );
    }

    else if (this.state.selectedPage === 'Messages') {
      return (
        <div className="App">
          <Header selectedPage={this.state.selectedPage} change={this.change}/>
          <h2> Messages</h2>
        </div>
      );
    }

    //most likely unreachable edgecase
    else {
      return (
        <div className="App">
          <Header selectedPage={this.state.selectedPage} change={this.change}/>
        </div>
      );
    }
  }
}

//separate component for the header. contains 
class Header extends App {

  render() {return (
  <header className="App-header">

  <img src={Logo} alt="usgs_logo" id="logo"/>

  <div id="title-buttons">
  <h1 id="decap-title"> DECAP Database Editor </h1>

  {/* button toolbar for navigating between pages. on click, change state to display the correct page */}
  <ButtonToolbar>
    <Button variant="outline-primary" onClick = {() => {
      // this may not be the best-practice way to change the state. maybe something like displayPlatforms=true?
      this.props.change('Platforms');
    }}>Platforms</Button>

    <Button variant="outline-primary" onClick = {() => {
      this.props.change('Sites');
    }}>Sites</Button>

    <Button variant="outline-primary" onClick = {() => {
      this.props.change('Configurations');
    }}>Configurations</Button>

    <Button variant="outline-primary" onClick = {() => {
      this.props.change('Messages')
    }}>Messages</Button>
  </ButtonToolbar>
  </div>



</header>)
}}

// This is code for making the app multi-page. For now, we are simply adding and removing components on a single page

// function Page2() {
//   return <h1>Page 2!</h1>;
// }

// function AppRouter() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">App</Link>
//             </li>
//             <li>
//               <Link to="/page2/">Page2</Link>
//             </li>
//           </ul>
//         </nav>

//         <Route path="/" exact component={App} />
//         <Route path="/page2/" component={Page2} />
//       </div>
//     </Router>
//   );
// }

export default App;
