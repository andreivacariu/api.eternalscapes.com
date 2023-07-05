        const express = require('express');
const router = express.Router();
const apicache = require("apicache");
const cache = apicache.middleware;
const userController = require('../controllers/user.controller');

//get all user list
router.get('/loaderio-71e135707a6991edf3f91216759b5268.txt', userController.getVerifyString);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Get Server Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//get all user list
router.get('/api/v2/users',cache('30 minutes'), userController.getAllUsers);

//get capes from DB
router.get('/api/v2/capes', cache('60 minutes'), userController.getCapes);

//get cosmetics
router.get('/api/v2/cosmetics', cache('60 minutes'), userController.getCosmetics);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Get User Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// get user by ID
router.get('/api/v2/user/:id', cache('5 minutes'), userController.getUserByUsername);

//get inventory from db
router.get('/api/v2/user/:id/inventory', cache('5 minutes'), userController.getInventory);

//get currentCosmetics from DB
router.get('/users/:id.cfg', cache('5 minutes'), userController.getCurrentCosmetics);

//get current cape  
router.get('/capes/:id.png', cache('5 minutes'), userController.getCape);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Change User Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//change cape
router.put('/api/v2/user/:id/cape/:id', userController.changeCape);

//check otp
router.get('/api/v2/supersecretsection/:uuid/:otp', userController.checkOTP);

//change cosmetic
router.put('/api/v2/user/:id/cosmetic/:cosmetic', userController.equipCosmetic);

//remove cosmetic
router.delete('/api/v2/user/:id/cosmetic/:cosmetic', userController.removeCosmetic);

// create new user
router.post('/api/v2/user', userController.createNewUser);

// update user
router.put('/api/v2/user/:id', userController.updateUser);

// delete user
router.delete('/api/v2/user/:id', userController.deleteUser);




module.exports = router;