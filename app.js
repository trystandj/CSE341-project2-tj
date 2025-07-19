/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const mongodb = require("./data/database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept, Z-key");
  next();
});


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/", require("./routes"));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
});


process.on("uncaughtException", (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


mongodb.connectDatabases()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server and Database are running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to database:", err);
  });
