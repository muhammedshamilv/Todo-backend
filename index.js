const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const noteRoute = require('./routes/notes');
const userRoute = require('./routes/auth');

const sequelize = require('./models/index');

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(express.json());
app.use(cors());

app.use('/', noteRoute);
app.use('/', userRoute);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
