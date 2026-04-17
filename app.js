

import express from 'express';
import authRoute from './routes/authRoute.js'

const app = express();
const PORT=3000

app.use(express.json());
app.use('/', authRoute)



app.listen(PORT, () => {
  console.log ("server running!!!")
});
















/*import express from 'express';
import authRoute from './routes/authRoute.js';
import path from 'path';

const app = express();
const PORT = 3000;

// IMPORTANT: to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// IMPORTANT: serve frontend folder
app.use(express.static('frontend'));

// routes
app.use('/', authRoute);

app.listen(PORT, () => {
    console.log("server running!!!");
});*/
