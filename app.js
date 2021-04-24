const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose=require("mongoose");





let posts=[]

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "VIIT College Pune";
const contactContent = "233033-Sanket Kulkari" + 
"\n233045-Parth Kohli 233046-Piyush Patil   233030-Srushti Khandade";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser: true})

const postSchema={
  title:String,
  content:String
}

const Post=mongoose.model("Post",postSchema);

app.get("/",function(req,res){
  Post.find({},function(err,posts){
    res.render("home",{
      startingContent:homeStartingContent,
      posts:posts
    })
  })

})

app.get("/about",function(req,res){
  res.render('about',{aboutCon:aboutContent})
})

app.get("/contact",function(req,res){
  res.render('contact',{contactCon:contactContent})
})

app.get("/compose",function(req,res){
  
  res.render('compose')
})

app.post("/compose",function(req,res){
  const post=new Post({
    title:req.body.postTitle,
    content:req.body.postBody
  })
  post.save(function(err){
    if(!err){
      res.redirect("/")
    }
  });
  //res.redirect("/")
})

app.get("/posts/:postId",function(req,res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

})












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
