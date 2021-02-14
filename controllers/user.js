const User = require('../models').User;
const Character = require('../models').Character;
const userService = require('../users/user.service');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");


console.log('in the users controller');

module.exports = {


    authenticate(req, res) {
        console.log('in authenticate !');
    /*userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err)); */
        User.findOne({
            where: {
                pseudo: req.body.username
            }
        })
            .then(user => {
                console.log('auth : check if user exist');
                if (!user) {
                    console.log('user not found');
                    return res.status(404).send({ message: "User Not found." });
                }

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );

                if (!passwordIsValid) {
                    console.log('check if password valid');
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }

                var token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });

              /*  var authorities = [];
                user.then(roles => {
                    console.log('getting role in auth');
                    for (let i = 0; i < roles.length; i++) {
                        authorities.push("ROLE_" + roles[i].name.toUpperCase());
                    }

                }); */
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                   // roles: authorities,
                    accessToken: token
                });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    },

    list(req, res) {
        return User.findAll({
            include: [{
                model: Character,
                as: 'characters'
            }],
        })
            .then((users) => res.status(200).send(users))
            .catch((error) => { res.status(400).send(error)});
    },

    getById(req, res)  {
        return User.getById(req.params.id, {
            include: [{
                model: Character,
                as: 'characters'
            }],
        })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User not found'
                    });
                }
                return  res.status(200).send(user);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return User.create({
            name: req.body.name,
            firstname: req.body.firstname,
            pseudo: req.body.pseudo,
            mail: req.body.mail,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role
        })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return User.getById(req.params.id, {
            include: [{
                model: Character,
                as: 'characters'
            }],
        })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User not found'
                    });
                }
                return user.update({
                    name: req.body.name | user.name,
                    firstname: req.body.firstname || user.firstname,
                    pseudo: req.body.pseudo || user.pseudo,
                    token: req.body.token || user.token,
                    mail: req.body.mail || user.mail,
                    password: req.body.password || user.password,
                    role: req.body.role || user.role,
                    characters: req.body.characters || user.characters
                })
                    .then((user) => res.status(201).send(user))
                    .catch((error) => res.status(400).send(error));

            })
    },

    delete(req, res) {
        return User.getById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User not found'
                    });
                }
                return User
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
    }

};


