const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema
const articleSchema = new Schema({
    username: {
        type: String
      }
});

// Create a model based on that Schema
const Mydata = mongoose.model("Mydataa", articleSchema);

// export the model
module.exports = Mydata;
