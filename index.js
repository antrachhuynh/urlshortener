const express = require('express');
const connectDb = require('./config/database');
const helmet = require('helmet');
const app = express();


//conect to mongodb

connectDb();

app.use(helmet(express.json({extended: false})))


// Routes

app.use(('/', require('./routes/index')));
app.use(('/api/url', require('./routes/url')));


const PORT = 80;

app.listen(PORT, () => console.log(`Started server on ${PORT}`));
