const express = require('express');
const router = express.Router();
const {User,Blog, Comments} = require('../models');

router.get("/",(req,res)=>{
    Blog.findAll({include:[User]}).then(blogs=>{
        const hbsBlogs = blogs.map(blog=>blog.get({plain:true}))
        const loggedIn = req.session.user?true:false
        res.render("home",{blogs:hbsBlogs,loggedIn,username:req.session.user?.username})
    })
})

router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user.id,{
        include:[Blog, Comments]
    }).then(userData=>{
        console.log(userData);
        const hbsData = userData.get({plain:true})
        hbsData.loggedIn = req.session.user?true:false
        res.render("profile",hbsData)
    })
})

//localhost:3000/blog/:id
router.get("/blog/:id", (req, res) => {
    if (!req.session.user) {
      return res.redirect("/home")
    }
    console.log(req.params.id)
    Blog.findByPk(req.params.id,{include: [User, {model: Comments, include: [User]}]})
      .then(dbBlog => {
        console.log("====================")
        const blogData = dbBlog.get({plain:true})
        const loggedIn = req.session.user?true:false
        console.log(blogData);
        res.render("update", {blogs:blogData,loggedIn,username:req.session.user?.username})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

//localhost:3000/comments/:id
router.get("/comments/:id", (req, res) => {
    if (!req.session.user) {
      return res.redirect("/home")
    }
    console.log(req.params.id)
    Blog.findByPk(req.params.id,{include: [User, {model: Comments, include: [User]}]})
      .then(dbBlog => {
        console.log("====================")
        const blogData = dbBlog.get({plain:true})
        const loggedIn = req.session.user?true:false
        console.log(blogData);
        res.render("comment", {blogs:blogData,loggedIn,username:req.session.user?.username})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

module.exports = router;