import React, { useState } from 'react';

// Portfolio must persist all aspects of state
function Portfolio(props) {

  const { isLoggedIn, portfolio, asks, bids, updateLogin, updatePortfolio, updateAsks, updateBids } = props;
  const [username, usd, eth] = portfolio;

  const [amount, updateAmount] = useState(0);
  const [rate, updateRate] = useState(0);

  const handleLogout = () => {
    return updateLogin(false);
  }

  // To stay DRY when updating state in each market/limit order handler
  const updateState = (newPortfolio, newAsks, newBids) => {
    updatePortfolio(newPortfolio);
    updateAsks(newAsks);
    updateBids(newBids);
  }

  const handleMarketBuy = () => {
    // Deny order if user does not have funds

    const price = asks[4]; // market buy always made at lowest Ask

    if (price > usd) {
      return alert('You do not have enough USD');
    }

    // Send post request
    const buyObj = {
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
  };

  const handleMarketSell = () => {
    // Deny order if user does not have funds

    const price = bids[0]; // market sell always made at highest Bid
    // Assume market sells are only made with 1 ETH at a time
    if (eth < 1) {
      return alert('You do not have enough USD');
    }

    // Send post request
    const sellObj = {
      username,
      amount,
      price
    }

    // fetch(/* route */)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // updateState(portfolio, asks, bids)

    //   })
    //   .catch((err) => console.log(err));

  };

  const handleLimitAsk = () => {
    // confirm user has enough funds
    if (amount > eth) {
      return alert('You do not have enough ETH');
    }

    const askObj = {
      username,
      amount,
      rate
    }
    // send post request
    // fetch(/* route */)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // updateState(portfolio, asks, bids)

    //   })
    //   .catch((err) => console.log(err));

  };

  const handleLimitBid = () => {

  };

  // Store user-input amount, assumed to be 1 in above functionality
  const storeAmt = (e) => {
    updateAmount(e.target.value);
  }

  // Store user-input rate for limit orders
  const storeRate = (e) => {
    updateRate(e.target.value);
  }

  return (
    <div>
      <p>Welcome to your portfolio, {username}.</p>
      <button type="submit" onClick={handleLogout}>Logout</button>
      <p>USD Balance: {usd}</p>
      <p>ETH Balance: {eth}</p>
      <input type="text" onChange={storeAmt} placeholder="Amount" />
      <input type="text" onChange={storeRate} placeholder="Rate (if Limit Order)" />
      <button type="submit" onClick={handleMarketBuy}>Market Buy</button>
      <button type="submit" onClick={handleMarketSell}>Market Sell</button>
      <button type="submit" onClick={handleLimitAsk}>Limit Ask</button>
      <button type="submit" onClick={handleLimitBid}>Limit Bid</button>
    </div>
  );
}

export default Portfolio;
