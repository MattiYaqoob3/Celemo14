const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema
const artcleSchema = new Schema({
  userNamee: String,
});

// Create a model based on that Schema
const Mydata = mongoose.model("Mydataa", artcleSchema);

// export the model
module.exports = Mydata;
