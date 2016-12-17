import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import BeerListList from './BeerListList';
import axios from 'axios';

class BeerListApp extends Component {
  constructor() {
    super();

    this.state = {
      beerLists: []
    };
  }

  render() {
    return (
      <div className="beer-list-app">
        <h1>Badass Beer Lists</h1>
        <div className="new-list-button">
          <Button bsSize="large" block>Add New List</Button>
        </div>
        <BeerListList beerLists={this.state.beerLists} />
      </div>
    );
  }

  componentDidMount() {
    axios.get('/api/lists', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {
        this.setState({
          ...this.state,
          beerLists: resp.data
        });
      })
      .catch(err => console.log(`Error! ${err}`));
  }//End componentDidMount

}//End List

export default BeerListApp;
