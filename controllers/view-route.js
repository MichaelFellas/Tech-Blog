const router = require("express").Router();
const { User, Blog, Comment } = require("../models");

const withAuth = require("../utils/auth")

router.get("/:id", async (req, res) => {

       
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [{ model: User,
            attributes: [
                'name',
                
                
              ],
             },{
              model: Comment,
              include: [{ model: User, attributes: ["name"] }],
            },
          ],
          order: [[{ model: Comment}, "createdAt", "DESC"]],
        });

      
      
      if(blogData){

      const blog = blogData.get({ plain: true });
      
     
      console.log(blog);
      
      res.render('posts', { blog, loggedIn: req.session.loggedIn } );
      }

      if(!blogData) {
        res.redirect('/blog');
      }
      

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.put("/:id", async (req, res) => {
console.log ("request here");
try {
  const updateBlog = await Blog.update(
    {
      title: req.body.blogTitle,
      content: req.body.blogContent,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).json(updateBlog);
} catch (err) {
  console.log(err);
}
});

router.delete("/:id", async (req, res) => {
  console.log ("request here");
  try {
    const deleteBlog = await Blog.destroy(
            {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(deleteBlog);
    res.redirect('/blog');
  } catch (err) {
    console.log(err);
  }
});

router.get("/edit/:id", async (req, res) => {

       
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User,
          attributes: [
              'name',
              'id',
              
              
            ],
           },
          ],    
    });      

    const blog = blogData.get({ plain: true });
    //if statement here that matches userid to posts userid
    res.render('edit', { blog, loggedIn: req.session.loggedIn } );
    

  } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});


router.post("/comment/:id", withAuth, async (req, res) => {

  console.log("made it here")

  try {
    const user = await User.findByPk(req.session.user_id);
    const commentData = await Comment.create({      
      content: req.body.content,
      user_id: user.id,
      blog_id: req.body.blogId,
    });
    commentData.setUser(user);
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;