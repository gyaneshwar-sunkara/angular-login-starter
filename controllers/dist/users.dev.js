"use strict";

var bcrypt = require("bcryptjs");

var debug = require("debug")("angular-login-starter:users"); // User Model


var User = require("../models/users"); // Create a new user


exports.Create = function (req, res, next) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password; // Validation

  if (!name || !email || !password) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  } // Check for existing user


  User.findOne({
    email: email
  }).then(function (user) {
    if (user) return res.status(400).json({
      msg: "Email already exists"
    }); // Create new user

    var newUser = new User({
      name: name,
      email: email,
      password: password
    }); // Generate salt

    bcrypt.genSalt(10, function (err, salt) {
      // Create hash for password
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          debug(err);
          return res.status(400).json({
            msg: "Unexpected Error"
          });
        }

        newUser.password = hash; // Save new user

        newUser.save().then(function (user) {
          // Next middleware
          next();
        })["catch"](function (err) {
          debug(err);
          return res.status(400).json({
            msg: "Unexpected Error"
          });
        });
      });
    });
  })["catch"](function (err) {
    debug(err);
    return res.status(400).json({
      msg: "Unexpected Error"
    });
  });
}; // Read a user


exports.Read = function (req, res) {
  // Check for existing user
  User.findById(req.user.id).select("-_id -password -__v").then(function (user) {
    if (!user) return res.status(400).json({
      msg: "User does not exist"
    });
    res.json({
      user: user,
      msg: "OK"
    });
  })["catch"](function (err) {
    debug(err);
    return res.status(400).json({
      msg: "Unexpected Error"
    });
  });
}; // Update a user


exports.Update = function (req, res) {
  // Check for existing user
  User.findById(req.user.id).then(function (user) {
    if (!user) return res.status(400).json({
      msg: "User does not exist"
    }); // Check if fields are changed

    var name = req.body.name ? req.body.name : user.name;

    if (name !== user.name) {
      user.name = name;
      user.save(function (err) {
        if (err) {
          debug(err);
          return res.status(400).json({
            msg: "Unexpected Error"
          });
        }

        var name = user.name,
            email = user.email,
            date = user.date;
        res.json({
          user: {
            name: name,
            email: email,
            date: date
          },
          msg: "OK"
        });
      });
    } else {
      return res.status(400).json({
        msg: "Nothing to update"
      });
    }
  })["catch"](function (err) {
    debug(err);
    return res.status(400).json({
      msg: "Unexpected Error"
    });
  });
}; // Delete a user


exports.Delete = function (req, res) {
  User.findById(req.user.id).then(function (user) {
    if (!user) return res.status(400).json({
      msg: "User does not exist"
    });else {
      user.deleteOne({
        _id: req.user.id
      }, function (err) {
        if (err) {
          debug(err);
          return res.status(400).json({
            msg: "Unexpected Error"
          });
        }

        res.status(200).json({
          msg: "OK"
        });
      });
    }
  })["catch"](function (err) {
    debug(err);
    return res.status(400).json({
      msg: "Unexpected Error"
    });
  });
};