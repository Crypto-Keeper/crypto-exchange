import React from "react";
import { Line } from "react-chartjs-2";

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
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Price Chart",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: tickerValues
      }
    ]
  };
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
      <Line data={data} />
    </div>
  );
}

export default Orderbook;
