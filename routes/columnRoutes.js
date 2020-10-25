let router = require('express').Router();

//Import Column Controller
let columnController = require('../controllers/columnController');

// Column routes
router.route('/')
    .get(columnController.index)
    .post(columnController.add);

router.route('/:column_id')
    .get(columnController.view)
    .patch(columnController.update)
    .put(columnController.update)
    .delete(columnController.delete);

// Extra routes
router.route('/board/:board_id')
    .get(columnController.viewBoard)

//Export API routes
module.exports = router;