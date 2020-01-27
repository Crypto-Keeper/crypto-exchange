import React from 'react';

function Orderbook(props) {
  const askList = [];
  for (const el of props.asks) {
    askList.push(<li>{el}</li>);
  }
  const bidList = [];
  for (const el of props.bids) {
    bidList.push(<li>{el}</li>);
  }
  return (
    <div>
      <div>
        <h3>Asks</h3>
        <ul id="askList">
          {askList}
        </ul>
      </div>
      <div>
        <h3>Bids</h3>
        <ul id="bidList">
          {bidList}
        </ul>
      </div>
    </div>
  );
}

export default Orderbook;
