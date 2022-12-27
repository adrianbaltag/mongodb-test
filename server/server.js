const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const BlogModel = require("./models/Blogs");
// const path = require("path");

//multer-> helps with uploading files
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/images");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, `blog -$(req.blog.id) -$(Date.now()).${extension}`);
  },
});
//test if upload fileis a img
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(err(alert("please upload an image file")), false);
  }
};

//ceate storage for uploaded imgs(wont be storedin db, in db will be just a string reference to the img itself)
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// const fse = require("fs-extra");
//helps with resizing imgs
// const sharp = require("sharp");

//help with conn the backend with frontend
const cors = require("cors");

//for parsing json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//for conn fe with be
app.use(cors());
//conn to db /replace<password> with ur passsword///  after/ type the name of the db(mongo_test)
mongoose.connect(
  "mongodb+srv://admin:adrian1@cluster0.wwkfbdl.mongodb.net/mongo_test?retryWrites=true&w=majority"
);

//ge all blogs
app.get("/getBlogs", (req, res) => {
  BlogModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// const image = req.file;

app.post("/createBlog", async (req, res) => {
  console.log(req.file);
  console.log(req.body);

  const blog = req.body;
  const newBlog = new BlogModel(blog);
  await newBlog.save();
  console.log(req.body);
  //send back tofrontend newly created blog object
  res.json(blog);
});

app.listen(3001, () => {
  console.log("server run at 3001");
});
