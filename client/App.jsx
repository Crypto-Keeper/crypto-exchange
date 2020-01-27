import React, { useState } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Portfolio from './portfolio.jsx';
import Orderbook from './orderbook.jsx';
import Login from './login.jsx';
import LoginPage from './loginPage.jsx';
// Top-level react app component container

// Making use of react-router-dom in order to log the user in and take in their portfolio. Decided to make use of react hooks instead of class components.

function App() {
  // This is similar to having state in a React class component.
  // [piece of state, updater function(triggers rerender)]

  const [isLoggedIn, updateLogin] = useState(false);
  const [portfolio, updatePortfolio] = useState(['user', 10000, 0]);
  const [asks, updateAsks] = useState([5, 5, 5, 5, 3]);
  const [bids, updateBids] = useState([2, 2, 2, 2, 1]);

  let renderComponent;

  // Router redirects to LoginPage.jsx when button is clicked. Displays orderbook component without portfolio otherwise.
  if (isLoggedIn) {
    renderComponent = <Portfolio
      isLoggedIn={isLoggedIn}
      portfolio={portfolio}
      asks={asks}
      bids={bids}
      updateLogin={updateLogin}
      updatePortfolio={updatePortfolio}
      updateAsks={updateAsks}
      updateBids={updateBids}
    />
  } else {
    renderComponent = (<Route exact path="/">
      <button type="submit">
        <Link to="/loginPage">Login</Link>
      </button>
    </Route>)
  }

  return (
    <Router>
      {renderComponent}
      <Route exact path="/" render={() => <Orderbook asks={asks} bids={bids} />} />
      <Route exact path="/loginPage" render={() => <LoginPage
        updateLogin={updateLogin}
        updatePortfolio={updatePortfolio}
        updateBids={updateBids}
        updateAsks={updateAsks} />} />
      {/* <Route path='/' component={OrderBook} /> */}

    </Router>
    // <div>
    //   {userBox}
    // <Orderbook asks={asks} bids={bids} />

    // </div>

  );
}

export default App;
