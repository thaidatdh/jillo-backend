//Import Comment Model
Comment = require('../models/commentModel');

//For index
exports.index = function (req, res) {
    Comment.get(function (err, comment) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Comment Successfully!",
            data: comment       
        });
    });
};

//For creating new comment
exports.add = function (req, res) {
    let comment = new Comment();
    comment.content = req.body.content ? req.body.content : comment.content;
    comment.card_id = req.body.card_id ? req.body.card_id : comment.card_id;
    comment.user_id = req.body.user_id ? req.body.user_id : comment.user_id;

    //Save and check error
    comment.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "New Comment Added!",
            data: comment
        });
    });
};

// View Comment
exports.view = function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err)
            res.send(err);
        res.json({
            message: 'Comment Details',
            data: comment
        });
    });
};

// Update Comment
exports.update = function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err)
            res.send(err);
            comment.content = req.body.content;
            comment.card_id = req.body.card_id ? req.body.card_id : comment.card_id;
            comment.user_id = req.body.user_id ? req.body.user_id : comment.user_id;

        //save and check errors
        comment.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Comment Updated Successfully",
                data: comment
            });
        });
    });
};

// Delete Comment
exports.delete = function (req, res) {
    Comment.deleteOne({
        _id: req.params.comment_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Comment Deleted'
        });
    });
};