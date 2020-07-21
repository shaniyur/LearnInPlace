const mongoose = require("mongoose");
const Schema = mongoose.Schema
const tutorSchema = new Schema({
    //...enter fields and datatypes here
})
module.exports = mongoose.model("Student", tutorSchema);
