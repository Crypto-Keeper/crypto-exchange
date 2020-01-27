// need to add connection to db
const db = require('../db/crypto_db.js')

const cryptoController = {};


// login controller
cryptoController.login = (req, res, next) => {
  console.log('server got request');
  console.log(req.body);
  // add login query here
  //TODO
  //need to send something back if not found in the db
  const user = req.body.username;
  const getUserQuery = (`SELECT username, usd, eth FROM accounts WHERE username = '${user}'`)
  db.query(getUserQuery)
    .then(data => {
      if (!data.rows[0]) return res.send(false)
      else {
        // TODO
        // need to set body for user info
        console.log(data.rows);
        res.locals.body = data.rows;
        next();
      }

    })

}


// // get market
// cryptoController.getMarket = (req, res, next) => {
//   // add get market query here
//   // TODO 
//   // need to sort the info in the query  
//   const order = "ASK";
//   const getMarketQuery = (`SELECT * FROM orders WHERE txn_type = '${order}' LIMIT 5`)
//   db.query(getMarketQuery)
//     .then(data => {
//       res.locals.body = data.rows
//       next();
//     })
// }


//get limit
cryptoController.sellLimit = (req, res, next) => {
  // inserts an ask into orders
  // {username: 'Will'; rate: 1.25; amount: 1} from frontend
  const username = req.body.username;
  const rate = req.body.rate;
  const amount = req.body.amount;

  const insertLimit = (`INSERT INTO orders (username, txn_type, rate, eth) VALUES ('${username}','BID', ${rate}, ${amount})`);

  db.query(insertLimit)
  next();
}

cryptoController.getAsk = (req, res, next) => {
  // get 5 lastest prices people are trying to sell at
  const getAsk = (`SELECT * FROM orders WHERE txn_type = 'ASK' ORDER BY rate DESC LIMIT 5`)
  db.query(getAsk)
    .then(data => {
      console.log(data.rows)
      res.locals.body = res.locals.body.concat(data.rows)
      next();
    })
}

cryptoController.getBid = (req, res, next) => {
  // get 5 lastest prices people are trying to buy at
  const getBid = (`SELECT * FROM orders WHERE txn_type = 'BID' ORDER BY rate ASC LIMIT 5`)
  db.query(getBid)
    .then(data => {
      // console.log("date: ", data.rows)
      res.locals.body = res.locals.body.concat(data.rows)
      next()
    })

}


// update user
cryptoController.addLogin = (req, res, next) => {
  // insert new user 
}

// update market
cryptoController.buyMarket = (req, res, next) => {
  // get the lowest Ask
  const findLowest = (`SELECT _id FROM orders WHERE txn_type = 'ASK' ORDER BY rate ASC LIMIT 1`)
  db.query(findLowest)
    .then(data => {
      console.log("data: ", data.rows);
    })
  //delete shit 

}

//update limit
cryptoController.buyLimit = (req, res, next) => {
  // inserts a bid into orders
  // {username: 'Will'; rate: 1.25; amount: 1} from frontend
  const username = req.body.username;
  const rate = req.body.rate;
  const amount = req.body.amount;

  const insertQuery = (`INSERT INTO orders (username, txn_type, rate, eth) VALUES ('${username}','BID', ${rate}, ${amount})`);

  db.query(insertQuery)
  next();
}



module.exports = cryptoController;