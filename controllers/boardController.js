//Import Board Model
Board = require('../models/boardModel');

//For index
exports.index = function (req, res) {
    Board.get(function (err, board) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Board Successfully!",
            data: board       
        });
    });
};

//For creating new board
exports.add = function (req, res) {
    let board = new Board();
    board.name = req.body.name? req.body.name: board.name;
    board.owner_id = req.body.owner_id;

    //Save and check error
    board.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "New Board Added!",
            data: board
        });
    });
};

// View Board
exports.view = function (req, res) {
    Board.findById(req.params.board_id, function (err, board) {
        if (err)
            res.send(err);
        res.json({
            message: 'Board Details',
            data: board
        });
    });
};
// Get Boards by user_id
exports.viewUser = function (req, res) {
    Board.find({ owner_id : req.params.user_id.toString() })
    .populate({
        path: 'columns',
        options: {sort: {order: 1}},
    })
    .exec(function (err, board) {
        if (err)
            res.send(err);
        res.json({
            message: 'Users\'s Boards ' + req.params.user_id.toString(),
            data: board
        });
    });
};
// Update Board
exports.update = function (req, res) {
    Board.findById(req.params.board_id, function (err, board) {
        if (err)
            res.send(err);
            board.name = req.body.name ? req.body.name : board.name;
            board.owner_id = req.body.owner_id ? req.body.owner_id : board.owner_id;

        //save and check errors
        board.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Board Updated Successfully",
                data: board
            });
        });
    });
};

// Delete Board
exports.delete = function (req, res) {
    Board.deleteOne({
        _id: req.params.board_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Board Deleted'
        });
    });
};