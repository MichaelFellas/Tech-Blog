const router = require('express').Router();
const {Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth')

// Gets Homepage
router.get('/', async (req, res) => {
  try {  

    const blogData = await Blog.findAll({
      include: [{model: Comment},{model: User}
      ],
    });

    const blogs = blogData.map((element) => element.get({ plain: true }));

    console.log(blogs);

    res.render('home', { blogs, loggedIn: req.session.loggedIn }) //RENDERS MAIN WITH HOME
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Gets dashboard
router.get('/dashboard', async (req, res) => {
  try {    

    res.render('dashboard', {     
      loggedIn: req.session.loggedIn,
    }) //RENDERS MAIN WITH dash
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery ALSO correct use of withAuth which will redirect if not logged in.
router.get('/gallery/:id', withAuth, async (req, res) => {

    try {
      const dbGalleryData = await Gallery.findByPk(req.params.id, {
        include: [
          {
            model: Painting,
            attributes: [
              'id',
              'title',
              'artist',
              'exhibition_date',
              'filename',
              'description',
            ],
          },
        ],
      });
      const gallery = dbGalleryData.get({ plain: true });
      res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
});


//Goes to login Page, if logged in goes to home
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//Goes to signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
