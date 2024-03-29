let router = require('express').Router();

//Import Card Controller
let cardController = require('../controllers/cardController');

// Card routes
router.route('/')
    .get(cardController.index)
    .post(cardController.add);

router.route('/:card_id')
    .get(cardController.view)
    .patch(cardController.update)
    .put(cardController.update)
    .delete(cardController.delete);
// Extra routes
router.route('/column/:column_id')
    .get(cardController.viewColumn)
router.route('/column/columns=:column_id_list/count')
    .get(cardController.viewCardCountByColumnList)
//Export API routes
module.exports = router;