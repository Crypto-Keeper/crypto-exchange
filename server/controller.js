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
  const pass = req.body.password;
  const getUserQuery = (`SELECT username, password, usd, eth FROM accounts WHERE username = '${user}'`)
  db.query(getUserQuery)
    .then(data => {
      console.log('here',data.rows)
      if (!data.rows[0]) return res.send(false)
      else if (
        data.rows[0].password !== pass) {
        return res.send(false)
      }
      else {
        // TODO
        // need to set body for user info
        console.log(data.rows);
        res.locals.body = data.rows;
        next();
      }

    })

}

// signup controller
cryptoController.signup = (req, res, next) => {
  console.log('signing up!')
  const user = req.body.username
  const pass = req.body.password
  const getCreateUser = (`INSERT INTO accounts (username,password,usd,eth) VALUES ('${user}', '${pass}', 10000, 100)`)
  db.query(getCreateUser)
  .then(data => {
    next()
  }
  ) 

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
  // add get limit query here
  // TODO 
  // need to change the hard code of addLimit
  const addLimit = ['Will', 1.25, 1]
  const insertLimit = (`INSERT INTO orders (username, txn_type, rate, eth) VALUES ('${addLimit[0]}','BID', ${addLimit[1]}, ${addLimit[2]})`);
  db.query(insertLimit)
  next();
}

cryptoController.getAsk = (req, res, next) => {
  const getAsk = (`SELECT * FROM orders WHERE txn_type = 'ASK' ORDER BY rate DESC LIMIT 5`)
  db.query(getAsk)
    .then(data => {
      console.log(data.rows)
      res.locals.body = res.locals.body.concat(data.rows)
      next();
    })
}

cryptoController.getBid = (req, res, next) => {
  const getBid = (`SELECT * FROM orders WHERE txn_type = 'BID' ORDER BY rate ASC LIMIT 5`)
  db.query(getBid)
    .then(data => {
      console.log("date: ", data.rows)
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
  const findLowest = (`SELECT _id FROM orders WHERE txn_type = 'ASK' ORDER BY rate ASC LIMIT 1`)
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
      res.locals.body = data.rows;
      next();
    })
}

//update limit
cryptoController.buyLimit = (req, res, next) => {
  // insert into limit


}



module.exports = cryptoController;
