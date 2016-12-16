import React, { Component } from 'react';

class BeerList extends Component {

  render() {
    return (
      <div className="beer-list">
        <div className="beer-list-avatar">
          <img src={this.props.avatar} alt="A frosty mug of beer" />
        </div>
        <div className="beer-list-title">
          <h2>{this.props.title}</h2>
        </div>
      </div>
    )
  }

}//End Beer

export default BeerList;
