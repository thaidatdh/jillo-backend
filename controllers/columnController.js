//Import Column Model
Column = require('../models/columnModel');

//For index
exports.index = function (req, res) {
    Column.get(function (err, column) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Column Successfully!",
            data: column       
        });
    });
};

//For creating new column
exports.add = function (req, res) {
    let column = new Column();
    column.name = req.body.name ? req.body.name : column.name;
    column.board_id = req.body.board_id ? req.body.board_id : column.board_id;
    column.color = req.body.color ? req.body.color : column.color;
    column.order = req.body.order ? req.body.order : column.order;

    //Save and check error
    column.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "New Column Added!",
            data: column
        });
    });
};

// View Column
exports.view = function (req, res) {
    Column.findById(req.params.column_id, function (err, column) {
        if (err)
            res.send(err);
        res.json({
            message: 'Column Details',
            data: column
        });
    });
};

// Update Column
exports.update = function (req, res) {
    Column.findById(req.params.column_id, function (err, column) {
        if (err)
            res.send(err);
            column.name = req.body.name ? req.body.name : column.name;
            column.board_id = req.body.board_id ? req.body.board_id : column.board_id;
            column.color = req.body.color ? req.body.color : column.color;
            column.order = req.body.order ? req.body.order : column.order;

        //save and check errors
        column.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Column Updated Successfully",
                data: column
            });
        });
    });
};

// Delete Column
exports.delete = function (req, res) {
    Column.deleteOne({
        _id: req.params.column_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Column Deleted'
        });
    });
};