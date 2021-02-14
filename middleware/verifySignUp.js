const db = require("../models");
const ROLES = require("../models").Role;
const User = require("../models").User;

checkDuplicateloginOrEmail = (req, res, next) => {
  console.log('in check duplicate login or mail')
  // login
  User.findOne({
    where: {
      login: req.body.login
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! login is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateloginOrEmail: checkDuplicateloginOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
