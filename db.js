const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const mongoURI = "mongodb+srv://couldnotebook:couldnotebook@cluster0.6zwgk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Sucess")
    })
}

module.exports = connectToMongo;