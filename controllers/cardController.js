//Import Card Model
Card = require('../models/cardModel');

//For index
exports.index = function (req, res) {
    Card.get(function (err, card) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Card Successfully!",
            data: card       
        });
    });
};

//For creating new card
exports.add = function (req, res) {
    let card = new Card();
    card.desc = req.body.desc;
    card.column_id = req.body.column_id;
    card.order = req.body.order ? req.body.order : card.order;
    //Save and check error
    card.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "New Card Added!",
            data: card
        });
    });
};

// View Card
exports.view = function (req, res) {
    Card.findById(req.params.card_id, function (err, card) {
        if (err)
            res.send(err);
        res.json({
            message: 'Card Details',
            data: card
        });
    });
};
// Get Cards by column_id
exports.viewColumn = function (req, res) {
    Card.find({ 'column_id': req.params.column_id.toString() })
    .exec(function (err, card) {
        if (err)
            res.send(err);
        res.json({
            message: ' Column\'s Cards ' + req.params.column_id.toString(),
            data: card
        });
    });
};
// Get Cards count by column_id list
exports.viewCardCountByColumnList = function (req, res) {
    Card.countDocuments({ 'column_id': { "$in" : req.params.column_id_list.split(',')} })
    .exec(function (err, count) {
        if (err)
            res.send(err);
        res.json({
            message: ' Column\'s Cards count ' + req.params.column_id_list.toString(),
            data: count
        });
    });
};
// Update Card
exports.update = function (req, res) {
    Card.findById(req.params.card_id, function (err, card) {
        if (err)
            res.send(err);
            card.desc = req.body.desc ? req.body.desc : card.desc;
            card.column_id = req.body.column_id ? req.body.column_id : card.column_id;
            card.order = req.body.order ? req.body.order : card.order;

        //save and check errors
        card.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Card Updated Successfully",
                data: card
            });
        });
    });
};

// Delete Card
exports.delete = function (req, res) {
    Card.deleteOne({
        _id: req.params.card_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Card Deleted'
        });
    });
};