
const mongoose = require('mongoose');

const URI = "mongodb+srv://dbUser:summer2020@cluster0.hropv.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("DB connected");
}

module.exports = connectDB;