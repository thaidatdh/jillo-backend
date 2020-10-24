//initialize express router
let router = require('express').Router();

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to Jillo API'
    });
});

let boardRoutes = require('./routes/boardRoutes');
router.use('/board', boardRoutes);
let userRoutes = require('./routes/userRoutes');
router.use('/user', userRoutes);
let columnRoutes = require('./routes/columnRoutes');
router.use('/column', columnRoutes);
let cardRoutes = require('./routes/cardRoutes');
router.use('/card', cardRoutes);
let commentRoutes = require('./routes/commentRoutes');
router.use('/comment', commentRoutes);
//Export API routes
module.exports = router;