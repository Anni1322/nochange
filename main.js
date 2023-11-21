// import 
require ('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
// const mongoose = require("mongoose");
const session = require("express-session");
 


const app = express();
const PORT = process.env.PORT || 4000;

 


//database connectio 
// MongoClient.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS: 30000,});
// const db = MongoClient.connection;
// db.on("error",(error)=>console.log(error));
// db.once("open", ()=> console.log("connected to the database!"));

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Adjust the timeout as needed
});

client.connect()
  .then(() => {
    console.log("connected to the database!")
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });




// milddlewares
app.use(express.urlencoded({ extended: false }));

app.use(session(
    {
        secret: 'my secret key',
        saveUninitialized: false,
        resave: true
    }
));

app.use((req, res, next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static("uploads"));



// set temlate engin
app.set('view engine', 'ejs');

 

// route prefix
app.use("", require("./routes/routes"));

app.listen(PORT,()=>{
    console.log(`server started ${PORT}`);
});