const express = require('express');

const cryptoController = require('./controller.js');

const router = express.Router();
// Test commit Abaas.

// login router 
router.get('/login', cryptoController.login, (req, res) => res.status(200).json(res.locals));

// market router
router.get('/market', cryptoController.getMarket, (req, res) => res.status(200).json(res.locals.body));

<<<<<<< HEAD
// limit router
router.get('/limit', cryptoController.getLimit, (req, res) => res.status(200).json(res.locals));
=======
// add limit
router.get('/sellLimit', cryptoController.sellLimit, cryptoController.getAsk, cryptoController.getBid, (req, res) => res.status(200).json(res.locals.body));
>>>>>>> dev


//need to handle post for update user
router.post('/login', cryptoController.addLogin, (req, res) => res.status(200).json());

// need to handle post for update market
router.post('/buyMarket', cryptoController.buyMarket, (req, res) => res.status(200).json());


// need to handle post for update limit
router.post('/buyLimit', cryptoController.buyLimit, (req, res) => res.status(200).json());


module.exports = router;