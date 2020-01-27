import React, { useState } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router';

import Orderbook from './orderbook.jsx';
import { Portfolio } from './portfolio.jsx';
import "./styles/style.css"


// Login Screen: currently takes only username which gets stored in
// database as unique key for account information

// Eventually to include password hashing and OAuth

// User tries to login and is verified against the database.
// If successful, user is rerouted back to orderbook with their portfolio displayed.

function LoginPage(props) {
  // const [isLoggedIn, updateLogin] = useState(false);
  // const [asks, updateAsks] = useState([5, 5, 5, 5, 3]); // 5 latest asks
  // const [bids, updateBids] = useState([2, 2, 2, 2, 1]); // 5 latest bids
  // const [portfolio, updatePortfolio] = useState(['user', 10000, 0]); // user, usd, eth balances

  const [success, updateSuccess] = useState(false);


  const handleClick = () => {
    // Fetch to server with username
    // const postObj = {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   body: {

    //   }
    // };


    fetch("/login")
      .then((res) => res.json())
      .then((data) => {
        const { updateLogin, updatePortfolio, updateBids, updateAsks } = props;
        const { username, usd, eth } = data.body;
        // destructure asks and bids as well
        updatePortfolio([username, usd, eth]);
        //update asks and bids as well
        
        updateLogin(true);
        updateSuccess(true);
      })
    // Upon successful response

    // updateAsks()
    // updateBids()
    // updateLogin(true);
  };

  const storeUsername = (e) => {
    username = e.target.value;
  };

  let conditionalRenders;

  // if (isLoggedIn) {
  //   conditionalRenders = <Redirect to="/" />;
  // } else {
  //   conditionalRenders = <h1>Provide a valid log in</h1>;
  // }


  // if !success
    // render the form
  // else
    // render a redirect
  if (success) {
    return <Redirect to="/" />;
  }

  return (
    // <Redirect to="/" />
    <div>
      <input type="text" onChange={storeUsername} placeholder="username" />
      <button type="submit" onClick={handleClick}>Login</button>
      {/* {conditionalRenders} */}
      <Router>
        {/* <Route exact path="/loginPage">
          <div>LoginPage</div>
          <button type="submit">
            <Link to="/">To Orderbook</Link>
          </button>
        </Route> */}
        {/* <Route exact path="/" render={() => <Orderbook asks={asks} bids={bids} />} />
        <Route exact path="/" render={() => <Portfolio portfolio={portfolio} />} /> */}
      </Router>
    </div>
  );
}

export default LoginPage;
