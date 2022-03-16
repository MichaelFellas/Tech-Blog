const router = require('express').Router();
const { Gallery, Painting } = require('../models');
const withAuth = require('../utils/auth')

// GET all galleries for homepage
router.get('/hi', async (req, res) => {
  try {
    

    res.render('main', {

      Hello
      
    });
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

// GET one painting
router.get('/painting/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the painting
    try {
      const dbPaintingData = await Painting.findByPk(req.params.id);

      const painting = dbPaintingData.get({ plain: true });

      res.render('painting', { painting, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
