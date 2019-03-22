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
      selected: null,
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

        <ButtonToolbar id ="buttonbar">
          <Button variant="primary">Open</Button>
          <Button variant="primary">New</Button>
          <Button variant="primary">Copy</Button>
          <Button variant="danger">Delete</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Platforms;
