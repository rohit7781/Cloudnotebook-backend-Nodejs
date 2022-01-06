const mongoose = require('mongoose');
require("dotenv").config()
// const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"


const connectToMongo = ()=>{
    mongoose.connect(process.env.mongoURI, ()=>{
        console.log("Sucess")
    })
}

module.exports = connectToMongo;