// basic
require("dotenv").config();

// server
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const start = async () => {
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  };
  
  start();
