import React, { Component } from 'react';
import '../App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import platformdata from './platformdata.json';
import {Button, ButtonToolbar} from 'react-bootstrap';
import './bootstrap.min.css'

class Platforms extends Component {
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
