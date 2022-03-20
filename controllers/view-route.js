const router = require("express").Router();
const { User, Blog } = require("../models");

const withAuth = require("../utils/auth")

router.get("/:id", async (req, res) => {

 
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [{ model: User,
            attributes: [
                'name',
                
                
              ],
             },
            ],    
      });      

      const blog = blogData.get({ plain: true });
      
      res.render('posts', { blog, loggedIn: req.session.loggedIn } );
      

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;