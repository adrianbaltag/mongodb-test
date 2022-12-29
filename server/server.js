const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const fs = require("fs");
const BlogModel = require("./models/Blogs");
const Image = require("./models/Image")
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

// const path = require("path");

//multer-> helps with uploading files
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload",upload.single('file'),function (req,res){


    console.log("REQUEST");
    console.log(req)
  const saveImage =  Image({
    _id: mongoose.Types.ObjectId(),
   
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    }})
  return saveImage.save()
  .then((newImage) => {
        return res.status(201).json
        ({
          success: true, 
          message: 'New image created successfully', 
          Image: newImage
          })
                    }
        )
.catch((error) => {
       return res.status(500).json({success: false, message: 'Server error. Please try again.', error: error.message});
    });

})




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
