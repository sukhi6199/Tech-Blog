const express = require("express");
const router = express.Router();
const {User,Blog, Comments} = require("../../models");


//find all
//localhost:3000/api/comments
router.get("/", (req, res) => {
  Comments.findAll({})
    .then(dbComments => {
      res.json(dbComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//find one
//localhost:3000/api/comments/:id
router.get("/:id", (req, res) => {
  Comments.findByPk(req.params.id,{})
    .then(dbComments => {
      res.json(dbComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create comment
//localhost:3000/api/comments
router.post("/", (req, res) => {
//   if(!req.session.user){
//     return res.status(401).json({msg:"ya gotta login to create a blog post!"})
// }
  Comments.create({
    body:req.body.body,
    UserId:req.session.UserId,
    BlogId: req.body.BlogId
  })
    .then(newComments => {
      res.json(newComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//delete a comment
router.delete("/:id", (req, res) => {
  Comments.destroy({
    where: {
      id: req.params.id
    }
  }).then(delComments => {
    res.json(delComments);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

module.exports = router;
