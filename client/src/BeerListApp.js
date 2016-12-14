import React, { Component } from 'react';
import axios from 'axios';

class BeerListApp extends Component {
  constructor() {
    super();

    this.state = {
      beerLists: []
    };
  }

  // componentDidMount() {
  //
  // }

  render() {
    return (
      <h1>Badass Beer Lists</h1>
    );
  }

}//End List

export default BeerListApp;
