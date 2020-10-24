let router = require('express').Router();

//Import Comment Controller
let commentController = require('../controllers/commentController');

// Comment routes
router.route('/')
    .get(commentController.index)
    .post(commentController.add);

router.route('/:column_id')
    .get(commentController.view)
    .patch(commentController.update)
    .put(commentController.update)
    .delete(commentController.delete);

//Export API routes
module.exports = router;