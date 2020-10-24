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

// Update Board
exports.update = function (req, res) {
    Board.findById(req.params.board_id, function (err, board) {
        if (err)
            res.send(err);
            board.name = req.body.name ? req.body.name : board.name;
            board.owner_id = req.body.owner_id;

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