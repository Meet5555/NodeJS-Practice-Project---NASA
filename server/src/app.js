const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.routes");
const launchesRouter = require("./routes/launches/launches.routes");

const app = express();

// cors middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// logging middleware
app.use(morgan("combined"));

// express middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));

// app routes
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

// static file served by express
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

module.exports = app;
