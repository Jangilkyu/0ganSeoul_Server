// basic
require("dotenv").config();

// server
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db
const connectDB = require("./db/connect");

// Batch
const seoulCitiesAPIBatchJob = require('./utils/seoulCitiesAPIBatchJob');
seoulCitiesAPIBatchJob();

// PORT
const { mongoURI } = require("./utils/appHelpers");
const port = process.env.PORT || 3000;

// Router
const seoulCitiesDataRouter = require('./routes/seoulCitiesData');
const citiesRouter = require('./routes/cities');

app.use('/api/v1/seoulCitiesData', seoulCitiesDataRouter);
app.use('/api/v1/citiesRouter', citiesRouter);

const start = async () => {
    await connectDB(mongoURI());
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  };
  
  start();
