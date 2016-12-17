import React, { Component } from 'react';
import BeerList from './BeerList';

class BeerListList extends Component {

  showBeerList(listId) {
    console.log('You clicked on: ' + listId);
  }//End showBeerList

  render() {
    const { beerLists } = this.props;
    return(
      <div className='beer-lists'>
        {beerLists.map(list => {
          return(
            <BeerList
              key={list._id}
              id={list._id}
              title={list.title}
              avatar={list.avatar}
              showBeer={this.showBeerList.bind(this)}
            />
          )
        }
      )}
      </div>
    );
  }
}//End BeerList

export default BeerListList;
