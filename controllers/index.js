const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const blogRoutes = require('./blog-routes.js');
const viewRoutes = require('./view-route.js')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blog', blogRoutes);
router.use('/post', viewRoutes);

module.exports = router;
