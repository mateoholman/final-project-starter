import React, { Component } from 'react';
import BeerList from './BeerList';

class BeerListList extends Component {
  render() {
    const { beerLists } = this.props;
    return(
      <div className='container'>
        {beerLists.map(list => {
          return(
            <BeerList
              key={list._id}
              id={list._id}
              title={list.title}
              avatar={list.avatar}
            />
          )
        }
      )}
      </div>
    );
  }
}//End BeerList

export default BeerListList;
