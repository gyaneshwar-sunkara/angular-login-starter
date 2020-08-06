const bcrypt = require("bcryptjs");
const debug = require("debug")("angular-login-starter:users");

// User Model
const User = require("../models/users");

// Create a new user
exports.Create = (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email })
    .then((user) => {
      if (user) return res.status(400).json({ msg: "Email already exists" });

      // Create new user
      const newUser = new User({
        name,
        email,
        password,
      });

      // Generate salt
      bcrypt.genSalt(10, (err, salt) => {
        // Create hash for password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            debug(err);
            return res.status(400).json({ msg: "Unexpected Error" });
          }
          newUser.password = hash;
          // Save new user
          newUser
            .save()
            .then((user) => {
              // Next middleware
              next();
            })
            .catch((err) => {
              debug(err);
              return res.status(400).json({ msg: "Unexpected Error" });
            });
        });
      });
    })
    .catch((err) => {
      debug(err);
      return res.status(400).json({ msg: "Unexpected Error" });
    });
};

// Read a user
exports.Read = (req, res) => {
  // Check for existing user
  User.findById(req.user.id)
    .select("-_id -password -__v")
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      res.json({ user, msg: "OK" });
    })
    .catch((err) => {
      debug(err);
      return res.status(400).json({ msg: "Unexpected Error" });
    });
};

// Update a user
exports.Update = (req, res) => {
  // Check for existing user
  User.findById(req.user.id)
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      // Check if fields are changed
      const name = req.body.name ? req.body.name : user.name;

      if (name !== user.name) {
        user.name = name;
        user.save((err) => {
          if (err) {
            debug(err);
            return res.status(400).json({ msg: "Unexpected Error" });
          }
          const { name, email, date } = user;
          res.json({ user: { name, email, date }, msg: "OK" });
        });
      } else {
        return res.status(400).json({ msg: "Nothing to update" });
      }
    })
    .catch((err) => {
      debug(err);
      return res.status(400).json({ msg: "Unexpected Error" });
    });
};

// Delete a user
exports.Delete = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      else {
        user.deleteOne({ _id: req.user.id }, (err) => {
          if (err) {
            debug(err);
            return res.status(400).json({ msg: "Unexpected Error" });
          }
          res.status(200).json({ msg: "OK" });
        });
      }
    })
    .catch((err) => {
      debug(err);
      return res.status(400).json({ msg: "Unexpected Error" });
    });
};
