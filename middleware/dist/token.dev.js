"use strict";

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var debug = require("debug")("angular-login-starter:token"); // User Model


var User = require("../models/users");

exports.token = function (req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password; // Validation

  if (!email || !password) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  } // Check for existing user


  User.findOne({
    email: email
  }).then(function (user) {
    if (!user) return res.status(400).json({
      msg: "Email does not exist"
    }); // Validate password

    bcrypt.compare(password, user.password).then(function (isMatch) {
      if (!isMatch) return res.status(400).json({
        msg: "Invalid credentials"
      }); // Create and send token

      jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET, {
        expiresIn: "3h"
      }, function (err, token) {
        if (err) {
          debug(err);
          return res.status(400).json({
            msg: "Unexpected Error"
          });
        }

        var name = user.name,
            email = user.email,
            date = user.date;
        return res.json({
          token: token,
          user: {
            name: name,
            email: email,
            date: date
          },
          msg: "OK"
        });
      });
    })["catch"](function (err) {
      debug(err);
      return res.status(400).json({
        msg: "Unexpected Error"
      });
    });
  })["catch"](function (err) {
    debug(err);
    return res.status(400).json({
      msg: "Unexpected Error"
    });
  });
};