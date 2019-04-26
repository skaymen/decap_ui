import React, { Component } from "react";
import { Button } from "react-bootstrap";

import "../styles/Decoder.css";

class Decoder extends Component {
  constructor(props) {
    super(props);

    this.addStatement = this.addStatement.bind(this);
    this.removeStatement = this.removeStatement.bind(this);

    this.state = {
      statements: [{ code: "xxxdsfghsdfgjdfgjdfgbvcvbnherghsdfgvxcvefrdsgsdfgds", id: 1 }, { code: "yfasdfasfxcverqagvdcfbsdfgsdfgsdfgdsfgdfgdfgdfyy", id: 2}, { code: "zzsadfasdvewfasgragxvbdrfeatfsdfcsdfasdgazz", id: 3}]
    };
  }
  addStatement() {
    var temp = this.state.statements;
    var rand = Math.random();
    temp.push({code: "aadfgrwtshasdfasefaegerdthadhawergtfeswrfswaaa", id: rand});
    this.setState({ statements: temp });
  }

  removeStatement(target) {
    var temp = this.state.statements;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id === target) {
        temp.splice(i, 1);
      }
    }
    this.setState({ statements: temp});
  }

  render() {
    return (
      <div id="decoder">
      <div id="format-statements">
        <h3 id="title">Format Statements</h3>
        <FormatStatements
          statements={this.state.statements}
          removeStatement={this.removeStatement}
        />
        <Button onClick={this.addStatement}> Add Statement </Button>
        <Button>Apply</Button>
      </div>

      <div id="message-decoder">
      <h3 id="title">Message Decoder</h3>
      <div id="message-blocks">
      </div>
      </div>
    
      </div>
    );
  }
}

class FormatStatements extends Decoder {
  render() {
    var removeStatement = this.props.removeStatement;

    //map each column header to its change function
    var items = this.props.statements.map(function(statement) {
      return (
        <div className="statement" key={statement.id}>
          <Button variant="light" className="format-close-button" onClick={() => removeStatement(statement.id)}>x</Button>
          <input className="format-input" />
          {statement.code}
        </div>
      );
    });

    return items;
  }
}

export default Decoder;
