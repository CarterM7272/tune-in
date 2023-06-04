const router = require('express').Router();

const apiRoutes = require('./api');
const pageRouts = require('./homeRoutes');


router.use('/api', apiRoutes);
router.use('/', pageRouts);

module.exports = router;
