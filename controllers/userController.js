let jwt = require("jsonwebtoken");
const config = require("../passport/config");
//Import User Model
User = require("../models/userModel");

//For index
exports.index = function (req, res) {
  User.get(function (err, user) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    res.json({
      status: "success",
      message: "Got User Successfully!",
      data: user,
    });
  });
};

//For creating new user
exports.add = function (req, res) {
  let user = new User();
  user.name = req.body.name ? req.body.name : user.name;
  user.username = req.body.username ? req.body.username : user.username;
  user.password = req.body.password ? req.body.password : user.password;
  user.email = req.body.email ? req.body.email : user.email;
  user.photo_link = req.body.photo_link ? req.body.photo_link : user.photo_link;

  //Save and check error
  user.save(function (err) {
    if (err) res.json(err);

    res.json({
      message: "New User Added!",
      data: user,
    });
  });
};

// View User
exports.view = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.send(err);
    res.json({
      message: "User Details",
      data: user,
    });
  });
};

// Update User
exports.update = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.send(err);
    user.name = req.body.name ? req.body.name : user.name;
    user.username = req.body.username ? req.body.username : user.username;
    user.password = req.body.password ? req.body.password : user.password;
    user.email = req.body.email ? req.body.email : user.email;
    user.photo_link = req.body.photo_link
      ? req.body.photo_link
      : user.photo_link;

    //save and check errors
    user.save(function (err) {
      if (err) res.json(err);
      let newUser = new User({
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      });
      // if user is found and password is right create a token
      let token = jwt.sign(JSON.stringify(newUser), config.secret);
      res.json({
        message: "User Updated Successfully",
        data: user,
        token: token,
      });
    });
  });
};

// Delete User
exports.delete = function (req, res) {
  User.deleteOne(
    {
      _id: req.params.user_id,
    },
    function (err, contact) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "User Deleted",
      });
    }
  );
};

exports.signup = function (req, res) {
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.json({
      success: false,
      msg: "Please enter email, username and password.",
    });
  } else {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
    });
    // save the user
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) {
        return res.status(401).send({
          success: false,
          msg: "Error when Register",
        });
      }

      if (!user) {
        newUser.save(function (err) {
          if (err) {
            return res.json({
              success: false,
              msg: "Username already exists.",
            });
          }
          res.json({ success: true, msg: "Successful created new user." });
        });
      } else {
        return res.json({ success: false, msg: "Username already exists." });
      }
    });
  }
};
exports.checkPassword = function (req, res) {
  User.findById(req.body.user_id, function (err, user) {
    if (err) {
      res.status(401).send({
        success: false,
        msg: err,
      });
    } else
    if (!user) {
      res.status(401).send({
        success: false,
        msg: "User not found.",
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          res.json({ success: true });
        } else {
          res.status(401).send({
            success: false,
            msg: "Wrong password",
          });
        }
      });
    }
  });
};

exports.signin = function (req, res) {
  User.findOne(
    { $or: [{ email: req.body.email }, { username: req.body.email }] },
    function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found.",
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            let newUser = new User({
              _id: user._id,
              username: user.username,
              name: user.name,
              email: user.email,
              created_at: user.created_at,
            });
            // if user is found and password is right create a token
            let token = jwt.sign(JSON.stringify(newUser), config.secret);
            // return the information including token as JSON
            res.json({ success: true, token: token, data: user._id });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      }
    }
  );
};
