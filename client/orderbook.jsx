import React from "react";

function Orderbook(props) {
  const { tickerValues, bids, asks } = props;
  const askList = [];
  for (const el of asks) {
    askList.push(<li>{el}</li>);
  }
  const bidList = [];
  for (const el of bids) {
    bidList.push(<li>{el}</li>);
  }
  function displayTicker() {
    if (tickerValues.length === 0) {
      console.log(bids[0]);
      return (Number(asks[4].slice(1)) + Number(bids[0].slice(1))) / 2;
    } else {
      return tickerValues[tickerValues.length - 1];
    }
  }
  return (
    <div>
      <div>
        <h3>Asks</h3>
        <ul id="askList">{askList}</ul>
      </div>
      <div id="Ticker">Last Traded price: {displayTicker()}</div>
      <div>
        <h3>Bids</h3>
        <ul id="bidList">{bidList}</ul>
      </div>
    </div>
  );
}

export default Orderbook;
