const mongoose = require("mongoose");
const mongoDBUrl = "mongodb+srv://mihir:alxMDciePVrXjfkt@cluster0.fdji1.mongodb.net/BlogDB?retryWrites=true&w=majority";

mongoose.connect(mongoDBUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.on('connected', ()=>{

    console.log("Connected to Database successfully!");
});

mongoose.connection.on('error', (error)=>{

    console.log("Error was found: "+error);
});

require("./User");
require("./Post");
require("./Category");