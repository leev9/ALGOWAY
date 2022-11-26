//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose= require("mongoose");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Admin-Shaurya:Lindaishere@cluster0.zixkt.mongodb.net/algorootDB",{useNewUrlParser:true});

const postSchema= new mongoose.Schema({
  title:String,
  content:String
});

const Post=mongoose.model("Post",postSchema);
//Post.deleteOne({title: "LISTS(PYTHON)"},function(err){});
const homeStartingContent = "Now Find all CP articles and solutions to famous Programming problems at one place. AlgoRoot articles help you learn the concepts to the core depth of it. Cause we believe knowledge should be accessible to all.";
const aboutContent = "AlgoRoot is a none profit and completely free to use website, which is single handedly created and managed my Shaurya Baghel. The articles written pn the website are my own interpretations of many programming questions and concepts which I learnt while doing compitetive programming myself. Thank You.";
const contactContent = "Shaurya Baghel, Phone- 8435794605, Mail at- baghelshaurya71@gmail.com";


app.get("/",function(req,res){
  Post.find({},function(err,foundPosts){
    if(!err)
    {
      res.render("home",{
        homeContent:homeStartingContent,
        allBlogPostsHome:foundPosts
      });
    }
  });
});
app.get("/about",function(req,res){
  res.render("about",{
    aboutContentHome:aboutContent
  });
});
app.get("/contact",function(req,res){
  res.render("contact",{
    contactContentHome:contactContent
  });
});
app.get("/compose",function(req,res){
  res.render("compose");
});

//for all all Posts
app.get("/posts/:topic",function(req,res){
  Post.find({},function(err,foundPosts){
    if(!err)
    {
      foundPosts.forEach(function(element){
        const comp1=_.lowerCase(element.title);
        const comp2=_.lowerCase(req.params.topic);
        //console.log(comp1,comp2);
        if(comp1===comp2)
        {
          res.render("post",{
            thisPost:element
          });
        }
      });
    }
    else {
    res.send("NO MATCH FOUND");
    }
  });
});



app.post("/compose",function(req,res){
  const newPost= new Post({
    title: req.body.newBlogPostTitle,
    content: req.body.newBlogPost,
  });

  newPost.save();
  res.redirect("/");
});
let port= process.env.PORT;
if(port==null||port=="")
port=3000;
app.listen(port, function() {
  console.log("Server started successfully");
});
