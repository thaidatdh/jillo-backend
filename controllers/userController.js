//Import User Model
User = require('../models/userModel');

//For index
exports.index = function (req, res) {
    User.get(function (err, user) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got User Successfully!",
            data: user       
        });
    });
};

//For creating new user
exports.add = function (req, res) {
    let user = new User();
    user.name = req.body.name? req.body.name: user.name;
    user.username = req.body.username? req.body.username: user.username;
    user.password = req.body.password? req.body.password: user.password;
    user.email = req.body.email? req.body.email: user.email;
    user.photo_link = req.body.photo_link? req.body.photo_link: user.photo_link;

    //Save and check error
    user.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "New User Added!",
            data: user
        });
    });
};

// View User
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User Details',
            data: user
        });
    });
};

// Update User
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
            user.name = req.body.name? req.body.name: user.name;
            user.username = req.body.username? req.body.username: user.username;
            user.password = req.body.password? req.body.password: user.password;
            user.email = req.body.email? req.body.email: user.email;
            user.photo_link = req.body.photo_link? req.body.photo_link: user.photo_link;

        //save and check errors
        user.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "User Updated Successfully",
                data: user
            });
        });
    });
};

// Delete User
exports.delete = function (req, res) {
    User.deleteOne({
        _id: req.params.user_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'User Deleted'
        });
    });
};