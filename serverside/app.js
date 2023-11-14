const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//specify where to find the schema
const Event = require("./models/events");

mongoose
  .connect("mongodb://localhost:27017/IT6203", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error connecting");
  });

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //can connect from any host
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, OPTIONS, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

// CRUD operations
// Read
//find a event based on the id
app.get("/events/:id", (req, res, next) => {
  //call mongoose method findOne (MongoDB db.Events.findOne())
  Event.findOne({ _id: req.params.id })
    //if data is returned, send data as a response
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    //if error, send internal server error
    .catch((err) => {
      console.log("Error: ${err}");
      res.status(500).json(err);
    });
});
app.get("/events", (req, res, next) => {
  //call mongoose method find (MongoDB db.Students.find())
  Event.find()
    //if data is returned, send data as a response
    .then((data) => res.status(200).json(data))
    //if error, send internal server error
    .catch((err) => {
      console.log("Error: ${err}");
      res.status(500).json(err);
    });
});

// Create
app.post("/events", (req, res, next) => {
  // create a new event variable and save request’s fields
  const event = new Event({
    eventTitle: req.body.eventTitle,
    eventDate: req.body.eventDate,
    eventLength: req.body.eventLength,
    eventTime: req.body.eventTime,
  });
  //send the document to the database
  event
    .save()
    //in case of success
    .then(() => {
      console.log("Success");
    })
    //if error
    .catch((err) => {
      console.log("Error:" + err);
    });
});

// Update
app.put("/events/:id", (req, res, next) => {
  console.log("id: " + req.params.id);
  // check that the parameter id is valid
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Event.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          eventTitle: req.body.eventTitle,
          eventDate: req.body.eventDate,
          eventLength: req.body.eventLength,
          eventTime: req.body.eventTime,
        },
      },
      { new: true }
    )
      .then((event) => {
        if (event) {
          //what was updated
          console.log(event);
        } else {
          console.log("no data exist for this id");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("please provide correct id");
  }
});

// Delete
app.delete("/events/:id", (req, res, next) => {
  Event.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json("Deleted!");
  });
});

module.exports = app;
