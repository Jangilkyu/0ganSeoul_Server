// basic
require("dotenv").config();

// server
const express = require("express");
const app = express();

// db
const connectDB = require("./db/connect");

// City Infod
const fetchCitiesData = require('./utils/fetchCitiesData');

// Batch
const seoulCitiesAPIBatchJob = require('./utils/seoulCitiesAPIBatchJob');
seoulCitiesAPIBatchJob();

// PORT
const { mongoURI } = require("./utils/appHelpers");
const port = process.env.PORT || 3000;

// Router
const seoulCitiesDataRouter = require('./routes/seoulCitiesData');

app.use('/api/v1/seoulCitiesData', seoulCitiesDataRouter);

const start = async () => {
    await connectDB(mongoURI());
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  };
  
  start();
