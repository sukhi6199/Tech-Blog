const express = require("express");
const router = express.Router();
const {User,Blog, Comments} = require("../../models");


//find all
router.get("/", (req, res) => {
  Blog.findAll({include:[User, Comments]})
    .then(dbBlogs => {
      res.json(dbBlogs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//find one
router.get("/:id", (req, res) => {
  Blog.findByPk(req.params.id,{include:[User, Comments]})
    .then(dbBlog => {
      res.json(dbBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create Blog
router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"ya gotta login to create a blog post!"})
}
  Blog.create({
    title:req.body.title,
    body:req.body.body,
    UserId:req.session.user.id
  })
    .then(newBlog => {
      res.json(newBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update Blog
router.put("/:id", async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, 
    {
      where: {
      id: req.params.id
    },
    });
  // .then((updatedBlog) => {
  //   res.render("update");
  // })
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

//delete a Blog
router.delete("/:id", (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id
    }
  }).then(delBlog => {
    res.json(delBlog);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

module.exports = router;
