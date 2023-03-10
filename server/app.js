const express = require('express');
const http = require('http');
const cors = require('cors');
const db = require('./config/connection');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const userRouter=require('./routes/user')


app.use('/api',userRouter)


// server
const server = http.createServer(app);

db.connect((err) => {
    if (err) console.log('Connection Error' + err);
    else console.log('Database Connected to port 27017');
  });

server.listen(3001, () => {
    console.log('Server started on 3001');
  });