// need to add connection to db
const db = require('../db/crypto_db.js')
const bcrypt = require('bcrypt');

const saltRounds = 2;

const cryptoController = {};


// login controller
cryptoController.login = (req, res, next) => {
  console.log('server got request');
  console.log(req.body);
  // add login query here
  //TODO
  //need to send something back if not found in the db
  const user = req.body.username;
  const pass = req.body.password;
  const getUserQuery = (`SELECT username, password, usd, eth FROM accounts WHERE username = '${user}'`)
  db.query(getUserQuery)
    .then(data => {
      if (!data.rows[0]) { return res.send(false) }
      else {
        // console.log('data', data.rows[0].password)
        bcrypt.compare(pass, data.rows[0].password, function (err, result) {
          // console.log('result', result)
          if (result === true) {
            res.locals.body = data.rows;
            next();
          } else {
            return res.send(false)
          }
        })
      }
    })
}

// signup controller
cryptoController.signup = (req, res, next) => {
  console.log('signing up!')
  const user = req.body.username
  const pass = req.body.password

  bcrypt.hash(pass, saltRounds, function (err, hash) {
    const getCreateUser = (`INSERT INTO accounts (username,password,usd,eth) VALUES ('${user}', '${hash}', 10000, 100)`)
    db.query(getCreateUser)
      .then(data => {
        next()
      }
      )
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
  const getAsk = (`SELECT * FROM orders WHERE txn_type = 'ASK' ORDER BY rate ASC LIMIT 5`)
  db.query(getAsk)
    .then(data => {
      // console.log(data.rows)
      res.locals.body = res.locals.body.concat(data.rows)
      next();
    })
}

cryptoController.getBid = (req, res, next) => {
  // get 5 lastest prices people are trying to buy at
  const getBid = (`SELECT * FROM orders WHERE txn_type = 'BID' ORDER BY rate DESC LIMIT 5`)
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
cryptoController.findMarket = (req, res, next) => {
  // get the lowest Ask
  const findLowest = (`SELECT _id, username, rate, eth FROM orders WHERE txn_type = 'ASK' ORDER BY rate ASC LIMIT 1`)
  db.query(findLowest)
    .then(data => {
      // console.log("data: ", data.rows);
      res.locals.body = data.rows
      // console.log(deleteLowest)
      next();
    })
}

cryptoController.deleteMarket = (req, res, next) => {
  const deleteInfo = (`DELETE FROM orders WHERE _id = ${res.locals.body[0]["_id"]}`)
  db.query(deleteInfo)
    .then((data) => {
      // console.log("its gone")
      res.locals.body = res.locals.body;
      next();
    })
}

// TODO
// need to update profile of the person that sold it
// need to update the profile of the person that bought it
cryptoController.updateProfile = (req, res, next) => {
  // console.log('this is rate', res.locals.body[0]['rate'])
  const rate = res.locals.body[0]['rate'];
  const rateSlice = rate.slice(1)

  const updateSell = (`UPDATE accounts SET usd = usd + CAST(${rateSlice} AS money), eth = eth - ${res.locals.body[0]['eth']} WHERE username = '${res.locals.body[0]['username']}'`)
  const updateBuy = (`UPDATE accounts SET usd = usd - CAST(${rateSlice} AS money), eth = eth + ${res.locals.body[0]['eth']} WHERE username = '${req.body.username}'`)
  Promise.all([db.query(updateSell), db.query(updateBuy)])
    .then(() => {
      res.locals.body = req.body.username;
      next();
    })
}

cryptoController.getProfile = (req, res, next) => {
  console.log(res.locals.body)
  const getProfile = (`SELECT * FROM accounts WHERE username = '${res.locals.body}'`)
  db.query(getProfile)
    .then(data => {
      res.locals.body = data.rows;
      next();
    })
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
