// require '@babel/polyfill';
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/index');


//Gaining access to .env file
dotenv.config();

//basic set up for a express server
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(routes);

const { connectMongoose } = require("./utils/database/mongoose");
connectMongoose();


app.listen(port, () => {
  console.info(`App running on port ${port}`);
});

