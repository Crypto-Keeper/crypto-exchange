const express = require('express');

const cryptoController = require('./controller.js');

const router = express.Router();

// login router 
router.get('/login', cryptoController.login, (req, res) => res.status(200).json(res.locals));

// market router
router.get('/market', cryptoController.getMarket, (req, res) => res.status(200).json(res.locals.body));

// limit router
router.get('/limit', cryptoController.getLimit, (req, res) => res.status(200).json(res.locals));


//need to handle post for update user
router.post('/login', cryptoController.addLogin, (req, res) => res.status(200).json());

// need to handle post for update market
router.post('/market', cryptoController.updateMarket, (req, res) => res.status(200).json());


// need to handle post for update limit
router.post('/limit', cryptoController.updateLimit, (req, res) => res.status(200).json());


module.exports = router;