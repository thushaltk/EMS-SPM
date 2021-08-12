const express = require("express");
const mongoose = require("mongoose");

//Initialize express framework
const app = express();

//Lets you to pass json data in request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");
  res.setHeader("Content-Range", "bytes: 0-10/*");

  next();
});

//404 route
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

//For ERROR HANDLING
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured" });
});

//MongoDB connection
mongoose
  .connect(
    "mongodb+srv://thushaltk:thushal1234@cluster0.tivsh.mongodb.net/ems?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Database :)....");
    app.listen(5000, () => {
      console.log("Listening on port 5000....");
    });
  })
  .catch((err) => {
    console.log(err);
  });
