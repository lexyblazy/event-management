const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { DB } = require("./config/keys");
const routes = require("./routes");

// connect to the database;
mongoose
  .connect(DB)
  .then(() => {
    //eslint-disable-next-line no-console
    console.log("Connection to database was successful");
  })
  .catch(error => {
    //eslint-disable-next-line no-console
    console.log("Could not connect to database", { error });
  });
// some helpful middleware to make our lives easier
app.enable("trust proxy");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", routes);

// if we are in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // express will serve up our static assets such as index.html, main.js and css
  app.use(express.static("client/build"));
  //for any set of routes that are not defined within out app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

//and of course, listen on this port...
app.listen(PORT, () => {
  //eslint-disable-next-line no-console
  console.log("Server is up and running");
});
