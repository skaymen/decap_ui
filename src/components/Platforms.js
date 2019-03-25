import React, { Component } from 'react';
import '../App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import platformdata from './platformdata.json';
import {Button, ButtonToolbar} from 'react-bootstrap';
import './bootstrap.min.css'

class Platforms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      selectedRow: null
    };
  }
  render() {
    const data = platformdata;

    const columns = [{
      Header: 'Platform',
      accessor: 'platform', // String-based value accessors!
    }, {
      Header: 'Agency',
      accessor: 'agency',
    }, {
      Header: 'Transport-ID',
      accessor: 'transportid',
    }, {
      Header: 'Config',
      accessor: 'config',
    }, {
      Header: 'Expiration',
      accessor: 'expiration',
    }, {
      Header: 'Description',
      accessor: 'description',
    },
    ];


    return (
      <div>
        <h2 id="title"> Platforms </h2>

        <ReactTable
          data={data}
          columns={columns}

          defaultPageSize={10}
          showPageSizeOptions={false}

          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: (e) => {
                  this.setState({
                    selectedIndex: rowInfo.index,
                    selectedRow: rowInfo
                  })
                },
                style: {
                  background: rowInfo.index === this.state.selectedIndex ? '#00afec' : 'white',
                  color: rowInfo.index === this.state.selectedIndex ? 'white' : 'black'
                }
              }
            }else{
              return {}
            }
          }}
        />

        <ButtonToolbar id ="buttonbar">

          <Button variant="primary" onClick={(rowInfo)=>{
            if (this.state.selectedRow) {
              alert("Platform: " + this.state.selectedRow.row.platform + "\n" +
                      "Agency: " + this.state.selectedRow.row.agency + "\n" +
                      "Transport-ID: " + this.state.selectedRow.row.transportid + "\n" +
                      "Config: " + this.state.selectedRow.row.config + "\n" +
                      "Expiration: " + this.state.selectedRow.row.expiration + "\n" +
                      "Description: " + this.state.selectedRow.row.description + "\n"); 
            } else {
              alert("nothing selected!");
            }
          }}>Open</Button>

          <Button variant="primary" onClick={(rowInfo)=>{
            alert("Create new stuff goes here");
          }}
          >New</Button>

          <Button variant="primary" onClick={(rowInfo)=>{
            if (this.state.selectedIndex) {
              alert("copy row " + this.state.selectedIndex); 
            } else {
              alert("nothing selected!");
            }
          }}>Copy</Button>

          <Button variant="danger" onClick={(rowInfo)=>{
            if (this.state.selectedIndex) {
              alert("delete row " + this.state.selectedIndex); 
            } else {
              alert("nothing selected!");
            }
          }}>Delete</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Platforms;
