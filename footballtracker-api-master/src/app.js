var express = require('express');
var cors = require('cors')
const db = require("./model");
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const seeder = require('../database/seeder')
dotenv.config()



const port = process.env.APP_PORT
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(bodyParser.json())

require('./routes')(app)

db.sequelize.sync();
seeder.addData()



app.listen(port)
console.log(`Server started on port ${port}`)

module.exports = app




