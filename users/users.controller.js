const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');

// routes
router.post('/authenticate', authenticate);     // public route
router.post('/', create);     // public route
router.get('/', authorize(Role.Admin), getAll); // admin only
router.get('/:id', authorize(), getById);       // all authenticated users
module.exports = router;

console.log('in the users controller');

function authenticate(req, res, next) {
    console.log('authentication controller');
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

    function create(req, res) {
        User.create({
        name: req.body.name,
        firstname: req.body.firstname,
        pseudo: req.body.pseudo,
        token: req.body.token,
        mail: req.body.mail,
        password: req.body.password,
        role: req.body.role
    })
        .then((user) => res.status(201).send(user))
        .catch((error) => res.status(400).send(error));
}




