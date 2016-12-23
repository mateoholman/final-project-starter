import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import BeerListList from './BeerListList';
import { Link } from 'react-router';
import axios from 'axios';

class BeerListApp extends Component {
  constructor() {
    super();

    this.state = {
      beerLists: []
    };
  }

  handleClick(event) {
    //Pass this back to the main componenet so the browserHistory push works!
    event.preventDefault();
  }

  render() {
    return (
      <div className="beer-list-app">
        <h1>Badass Beer Lists</h1>
        <div className="new-list-button">
          <Link to="/newBeerList">Add New List</Link>
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
