let router = require('express').Router();

//Import Board Controller
let boardController = require('../controllers/boardController');

// Board routes
router.route('/')
    .get(boardController.index)
    .post(boardController.add);

router.route('/:board_id')
    .get(boardController.view)
    .patch(boardController.update)
    .put(boardController.update)
    .delete(boardController.delete);
// Extra routes
router.route('/user/:user_id')
    .get(boardController.viewUser)
//Export API routes
module.exports = router;