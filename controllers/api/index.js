const router = require('express').Router();
const userRoutes = require('./userRoutes');
const youtubeRoutes = require('./youtubeRoutes');

router.use('/users', userRoutes);
router.use('/search', youtubeRoutes);

module.exports = router;
