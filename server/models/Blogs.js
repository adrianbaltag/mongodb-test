const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
//define inputs and types schema should contain
const BlogSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

//create a model out of this schema and export it to be able to use it
const BlogModel = mongoose.model("blogs", BlogSchema);
module.exports = BlogModel;
