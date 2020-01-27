import React from 'react';
import loginPage from './loginPage.jsx'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
// import App from './App.jsx'

function Login() {
  return (
    <div>
      <div>LoginButton</div>
      {/* <Router>
        <button type="submit">
          <Link to="/loginPage">Login!</Link>
        </button>
        <Route exact path="/" component={App} />
        <Route path="/loginPage" component={loginPage} />
      </Router> */}

    </div>
  );
}

export default Login;
