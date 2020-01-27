import React, { useState } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router';

import Orderbook from './orderbook.jsx';
import { Portfolio } from './portfolio.jsx';


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
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');

  const [success, updateSuccess] = useState(false);


  const handleLogin = () => {
    console.log(username, password);
    // Fetch to server with username
    const loginPostBody = {
      username,
      password,
    };

    fetch('/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(loginPostBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Response should be boolean false if invalid username
        if (!data) {
          alert('Enter a valid username');
          return;
        }
        const {
          updateLogin, updatePortfolio, updateBids, updateAsks,
        } = props;
        const { username, usd, eth } = data.body[0];
        const asks = data.body.slice(1, 6).map((ask) => [ask.rate]);
        const bids = data.body.slice(6).map((bid) => [bid.rate]);

        updatePortfolio([username, usd, eth]);
        updateAsks(asks);
        updateBids(bids);

        updateLogin(true);
        updateSuccess(true); // should only occur if user logged in
      })
      .catch((err) => console.log(err));
  };

  const handleSignup = () => {
    console.log(username, password);
    // Fetch to server with username
    const signupObj = {
      username,
      password,
    };

    fetch('/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(signupObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Response should be boolean false if invalid username
        if (!data) {
          alert('Enter a valid username');
          return;
        }
        const {
          updateLogin, updatePortfolio, updateBids, updateAsks,
        } = props;
        const { username, usd, eth } = data.body[0];
        const asks = data.body.slice(1, 6).map((ask) => [ask.rate]);
        const bids = data.body.slice(6).map((bid) => [bid.rate]);

        updatePortfolio([username, usd, eth]);
        updateAsks(asks);
        updateBids(bids);

        updateLogin(true);
        updateSuccess(true); // should only occur if user logged in
      })
      .catch((err) => console.log(err));

  };

  const storeUsername = (e) => {
    updateUsername(e.target.value);
  };

  const storePassword = (e) => {
    updatePassword(e.target.value);
  };

  if (success) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <input type="text" onChange={storeUsername} placeholder="username" />
      <input type="text" onChange={storePassword} placeholder="password" />
      <button type="submit" onClick={handleLogin}>Login</button>
      <button type="submit" onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default LoginPage;
