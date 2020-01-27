const express = require('express');

const cryptoController = require('./controller.js');

const router = express.Router();

// login router 
router.post('/login', cryptoController.login, cryptoController.getAsk, cryptoController.getBid, (req, res) => res.status(200).json(res.locals));

// market router
// router.get('/market', cryptoController.getMarket, (req, res) => res.status(200).json(res.locals.body));

// add limit
router.get('/limit', cryptoController.addLimit, cryptoController.getAsk, cryptoController.getBid, (req, res) => res.status(200).json(res.locals.body));


//need to handle post for update user
// router.post('/login', cryptoController.addLogin, (req, res) => res.status(200).json());

// need to handle post for update market
router.post('/market', cryptoController.updateMarket, (req, res) => res.status(200).json());


// need to handle post for update limit
router.post('/limit', cryptoController.updateLimit, (req, res) => res.status(200).json());


module.exports = router;