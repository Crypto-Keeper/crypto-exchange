import React, { useState } from "react";

// Portfolio must persist all aspects of state
function Portfolio(props) {
  const {
    isLoggedIn,
    portfolio,
    asks,
    bids,
    updateLogin,
    updatePortfolio,
    updateAsks,
    updateBids,
    updateChart
  } = props;
  let [username, usd, eth] = portfolio;

  const [amount, updateAmount] = useState(0);
  const [rate, updateRate] = useState(0);

  const handleLogout = () => {
    return updateLogin(false);
  };

  // To stay DRY when updating state in each market/limit order handler
  const updateState = (newPortfolio, newAsks, newBids) => {
    updatePortfolio(newPortfolio);
    updateAsks(newAsks);
    updateBids(newBids);
  };

  const handleMarketBuy = () => {
    // Deny order if user does not have funds

    let price = asks[4][0];
    price = Number(price.slice(1)); // market buy always made at lowest Ask
    usd = Number(usd.slice(1).split(',').join(''));
    console.log(typeof price, 'price: ', price);
    console.log(typeof usd, 'usd: ', usd);
    if (price > usd) {
      return alert("You do not have enough USD");
    }

    // Send post request
    const buyObj = {
      username,
      amount,
      price,
    };
    fetch('/buyMarket', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(buyObj),
    })
      .then((res) => res.json())
      .then((data) => {
        // const { username, usd, eth } = data.body[0];
        console.log(data);
        const newAsks = data.slice(0, 5).reverse().map((ask) => [ask.rate]);
        const newBids = data.slice(5).map((bid) => [bid.rate]);

        // updateState(portfolio, asks, bids);
        // updatePortfolio([username, usd, eth]); // duplicate names in upper scope
        updateAsks(newAsks);
        updateBids(newBids);
      })
      .catch((err) => console.log(err));

    updateChart(chart => {
      let newChart = [];
      for (let el of chart) {
        newChart.push(el);
      }
      newChart.push(price);
      console.log(newChart);
      return newChart;
    });
  };

  const handleMarketSell = () => {
    // Deny order if user does not have funds

    const price = bids[0][0]; // market sell always made at highest Bid
    // Assume market sells are only made with 1 ETH at a time
    if (eth < 1) {
      return alert("You do not have enough USD");
    }

    // Send post request
    const sellObj = {
      username,
      amount,
      price
    };

    // fetch(/* route */)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // updateState(portfolio, asks, bids)

    //   })
    //   .catch((err) => console.log(err));
    updateChart(chart => {
      let newChart = [];
      for (let el of chart) {
        newChart.push(el);
      }
      newChart.push(Number(price.slice(1)));
      console.log(newChart);
      return newChart;
    });
  };

  const handleLimitAsk = () => {
    // confirm user has enough funds
    if (amount > eth) {
      return alert("You do not have enough ETH");
    }

    const askObj = {
      username,
      amount,
      rate,
    };
    // send post request
    fetch('/sellLimit', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(askObj),
    })
      .then((res) => res.json())
      .then((data) => {
        // const { username, usd, eth } = data.body[0];
        console.log(data);
        const newAsks = data.slice(0, 5).reverse().map((ask) => [ask.rate]);
        const newBids = data.slice(5).map((bid) => [bid.rate]);

        // updateState(portfolio, asks, bids);
        // updatePortfolio([username, usd, eth]); // duplicate names in upper scope
        updateAsks(newAsks);
        updateBids(newBids);
      })
      .catch((err) => console.log(err));
  };

  const handleLimitBid = () => {};

  // Store user-input amount, assumed to be 1 in above functionality
  const storeAmt = e => {
    updateAmount(e.target.value);
  };

  // Store user-input rate for limit orders
  const storeRate = e => {
    updateRate(e.target.value);
  };

  return (
    <div>
      <p>Welcome to your portfolio, {username}.</p>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
      <p>USD Balance: {usd}</p>
      <p>ETH Balance: {eth}</p>
      <input type="text" onChange={storeAmt} placeholder="Amount" />
      <input
        type="text"
        onChange={storeRate}
        placeholder="Rate (if Limit Order)"
      />
      <div>
        <button type="submit" onClick={handleMarketBuy}>
          Market Buy
        </button>
        <button type="submit" onClick={handleMarketSell}>
          Market Sell
        </button>
        <button type="submit" onClick={handleLimitAsk}>
          Limit Ask
        </button>
        <button type="submit" onClick={handleLimitBid}>
          Limit Bid
        </button>
      </div>
    </div>
  );
}

export default Portfolio;
