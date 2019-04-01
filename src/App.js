import React, { Component } from 'react';
import './styles/App.css';
import Platforms from './components/Platforms';
import {Button, ButtonToolbar} from 'react-bootstrap';
import './styles/bootstrap.min.css'
import Logo from './images/usgs_logo.svg';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 'Platforms'
    };
    this.change = this.change.bind(this)
  }

  change(value) {
    this.setState({selectedPage: value});
  }


  render() {

    if (this.state.selectedPage === 'Platforms') {
      return (
        <div className="App">
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

    else {
      return (
        <div className="App">
          <Header selectedPage={this.state.selectedPage} change={this.change}/>
        </div>
      );
    }
  }
}

class Header extends App {

  render() {return (
  <header className="App-header">

  <img src={Logo} alt="usgs_logo" id="logo"/>

  <div id="title-buttons">
  <h1 id="decap-title"> DECAP Database Editor </h1>

  <ButtonToolbar>
    <Button variant="outline-primary" onClick = {() => {
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

export default App;
