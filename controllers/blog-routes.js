const router = require("express").Router();
const { User, Blog } = require("../models");

const withAuth = require("../utils/auth")

router.post("/", withAuth, async (req, res) => {

  try {
    const user = await User.findByPk(req.session.user_id);
    const blogData = await Blog.create({
      title: req.body.blogTitle,
      content: req.body.blogContent,
      user_id: user.id,
    });
    blogData.setUser(user);
    res.json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", withAuth, async (req, res) => {

 
    try {
      const userData = await User.findByPk(req.session.user_id, {
        include: [{ model: Blog,
            attributes: [
                'id',
                'title',
                'content',
                'blog_date',
                'user_id',
                
              ],
             },
            ],    
      });      

      const user = userData.get({ plain: true });
      
      res.render("dashboard", {user, loggedIn: req.session.loggedIn} );
      

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});


module.exports = router;