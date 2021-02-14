const express = require('express');
const router = express.Router();
const { verifySignUp } = require("../middleware");


const userController = require('../controllers/user');
const authController = require('../controllers/auth.controller');


console.log('in index.js routes');

/* Authentication router */
router.post('/api/auth/signup',
    [
        verifySignUp.checkDuplicateloginOrEmail,
        verifySignUp.checkRolesExisted
    ],
    authController.signup);
router.post("/api/auth/signin",  authController.signin);


/* User router */
router.get('/user', userController.list);
router.get('/user/:id', userController.getById);
router.post('/user', userController.add);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);


module.exports = router;
