const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.userContent = (req, res) => {
    User.findOne({
      where: {id: req.userId},
      attributes: ['name', 'login', 'email'],
      include: [{
        model: Role,
        attributes: ['id', 'name'],
        through: {
          attributes: ['userId', 'roleId'],
        }
      }]
    }).then(user => {
      res.status(200).json({
        "description": "User Content Page",
        "user": user
      });
    }).catch(err => {
      res.status(500).json({
        "description": "Can not access User Page",
        "error": err
      });
    })
  }
  exports.allUsers = (req,res) => {
    User.findAll().then( users => {
      res.status(200).json({
        "description": "get all users",
        "users": users
      });
    }).catch(err => {
      res.status(500).json({
        "description": "Can not access all User Page",
        "error": err
      });
    })
  }