const mongoose = require("mongoose");
const Schema = mongoose.Schema
const studentSchema = new Schema({
    //...enter fields and datatypes here
})
module.exports = mongoose.model("Student", studentSchema);
